<template>
  <v-container fluid grid-list-md>
    <v-layout row>
      <v-flex d-flex md4>
        <v-layout column>
          <v-flex  v-for="name in firstColumn" :key="name" md4>        
            <ComponentCard
              v-bind:cardData="data[name]"
              v-bind:counter="counter" />          
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md4>
        <v-layout column>
          <v-flex  v-for="name in secColumn" :key="name" md4>        
            <ComponentCard v-if="name!='AutomationControl'"
              v-bind:cardData="data[name]"
               v-bind:counter="counter" />    
            <AutomationCard  v-if="name=='AutomationControl'"
              v-bind:cardData="data[name]"
               v-bind:counter="counter" />       
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md4>
        <v-layout column style="height:100%;">
          <v-flex d-flex v-for="name in chart" :key="name" md3>            
            <v-responsive contain :v-show="dataLoaded">                    
                <TimelineChart style="height:250px;"    
                    v-bind:tlData="data[name]"
                    v-bind:counter="counter" />                     
            </v-responsive>  
          </v-flex>            
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  import axios                    from "axios"; 
  import TimelineChart  from "../Controls/TimelineChart";
  import ComponentCard  from "../Controls/ComponentCard";  
  import AutomationCard  from "../Controls/AutomationCard";
  
  export default {
    name: "ComponentOverview",
    components: {
      TimelineChart,
      ComponentCard,
      AutomationCard
    },
    data: function() {
      return {
        data: {},
        counter: 31,
        chart: ['soPresDispl', 'fRailPres', 'pscav', 'tTurbIn'],
        firstColumn: ['ServoOil', 'ScavengeAir','PistonRunning'] ,
        secColumn: ['FuelInjection', 'ExhaustGas','AutomationControl'],
        dataLoaded : false
      };
    },
    mounted() {

      let params = ['soPresDispl', 'CAngleEVC', 'fRailPres', 'pmax', 'pscav', 'tscav','tTurbIn', 'tcspeed', 'pmaxPcomp','tlinerfore'];

      for (let i=0; i<params.length;i++)
         this.$set( this.data, params[i], {});

      let subSystems = ['ServoOil', 'FuelInjection', 'ScavengeAir','ExhaustGas', 'PistonRunning', 'AutomationControl'];
      
      let names = ['Servo Oil','Fuel Injection','Scavenge Air','Exhaust Gas','Piston Running','Automation & Control'];

      for (let i=0; i<subSystems.length;i++)
      {
        this.$set( this.data, subSystems[i], {});
        this.$set(this.data[subSystems[i]], 'Title', names[i]);
        if (i<subSystems.length-1)
        {
          this.$set(this.data[subSystems[i]], 'Tag1', params[2*i+0]);    
          this.$set(this.data[subSystems[i]], 'Tag2',params[2*i+1]);
          this.$set(this.data[subSystems[i]], 'Card1',{});    
          this.$set(this.data[subSystems[i]], 'Card2',{}); 
        }     
      }
               
      this.getData();
      this.startInterval();
    },
     methods: {
      startInterval: function () {
        this.interval = setInterval(() => {
          if (this.counter < 60) {
            this.getData();
            this.counter = this.counter + 1;
          } else {
            this.counter =1;
          }
        }, 5000)
      },
      getData: function() {

        axios.get("http://localhost:8092/EDSMapping").then(resp => {

          let objs = ['soPresDispl', 'CAngleEVC', 'fRailPres', 'pmax', 'pscav', 'tscav','tTurbIn', 'tcspeed',  'pmaxPcomp','tlinerfore'];

          let formats =  [1,1,1,1,2,1,1,0,1,1];

            for( let i = 0; i < objs.length; i++ )
            {
              this.$set(this.data[objs[i]], 'Title',resp.data.EDS_Parameter_Names[objs[i]].longName);
              this.$set(this.data[objs[i]], 'Unit',resp.data.EDS_Parameter_Names[objs[i]].unit);
              this.$set(this.data[objs[i]], 'Format',formats[i]);
            }

        });

        let url  = "http://localhost:8092/EDSTimelineData/" + this.counter;

        axios.get(url).then(response => {
          let len = Object.keys(response.data).length;
          // console.log(len);
          let helperMatrix = response.data[Object.keys(response.data)[len - 1]];

          let params = [ 'ServoPress', 'EVCpercyl','FuelPress','Pmax','Pscav','Tscav','TCspeed','Tturbin', 'PressureRise','Tliner'];

          let objs = ['soPresDispl', 'CAngleEVC', 'fRailPres', 'pmax', 'pscav', 'tscav','tcspeed', 'tTurbIn', 'pmaxPcomp','tlinerfore'];

          for (let i=0; i<params.length;i++)
          {
            let array = helperMatrix[params[i]]; 

            let average = (array) => array.reduce((a, b) => a + b) / array.length;

            let avg = average(array[0]);
            let ref = average(array[1]);

            this.$set(this.data[objs[i]],'Value',avg);
            this.$set(this.data[objs[i]],'Ref',ref);

            let min = array[2];
            let max = array[3];

            if (params[i] == 'PressureRise')
            {
                min = min * 100;
                max = max * 100;
            }

            let temp = ( (avg -  ref)/avg) * 100;

            let clr =  ((temp > min) && (temp < max))? "green" : "red";

            if ((avg==-1000)||(ref==-1000)) this.$set(this.data[objs[i]], 'Color', 'gray');
            else this.$set(this.data[objs[i]], 'Color', clr);

            let data = [];
            for (let j = 0; j < len; j++){

              let helper = response.data[Object.keys(response.data)[j]];

              array = helper[params[i]];

              avg = average(array[0]);
              ref = average(array[1]);

              min = array[2];
              max = array[3];

              if (params[i] == 'PressureRise')
              {
                min = min * 100;
                max = max * 100;
              }

              let valMin = ref/(1 - min/100);
              let valMax = ref/(1 - max/100);

              clr =  ((avg > valMin) && (avg < valMax))? "green" : "red";

              let point = {};

              point.date = new Date(Object.keys(response.data)[j]);
              point.val = avg;
              point.valMin = valMin;
              point.valMax = valMax;
              point.color = clr;

              data.push(point);
            }

            var anyMinus1000 = data.some(function (item) {
            return  item.val == -1000;
            });

            if (anyMinus1000) this.$set(this.data[objs[i]],'datapoints',[]);
            else this.$set(this.data[objs[i]],'datapoints', data);
          }

        });  

        url  = "http://localhost:8092/EDSEvents/" + this.counter;

        axios.get(url).then(response => {

          let len2 = Object.keys(response.data).length;
          let helperMatrix2 = response.data;

          let subSystems = ['ServoOil', 'FuelInjection', 'ScavengeAir','ExhaustGas',  'PistonRunning', 'AutomationControl'];
          let tags = ['Servo Oil','Fuel Injection','Scavenge Air','Exhaust Gas','Piston Running','Automation & Control'];

          for (let i=0; i<subSystems.length;i++)
          {
            this.$set(this.data[subSystems[i]], 'Value',  helperMatrix2.kpi[tags[i]][0]*100);            
            this.$set(this.data[subSystems[i]], 'Color',  helperMatrix2.kpi[tags[i]][1]);
            if (i<subSystems.length-1)
            {
              this.$set(this.data[subSystems[i]], 'Card1', this.data[this.data[subSystems[i]]['Tag1']]);    
              this.$set(this.data[subSystems[i]], 'Card2', this.data[this.data[subSystems[i]]['Tag2']]);  
            }
          }       

        });

        this.dataLoaded = true;          
        
      }
    },
  }
</script>

<style scoped>

</style>