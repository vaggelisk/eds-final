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
            <AutomationCard  v-if="name=='AutomationControl'" style="height:100%;"
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

  import TimelineChart    from "../Controls/TimelineChart";
  import ComponentCard    from "../Controls/ComponentCard";  
  import AutomationCard   from "../Controls/AutomationCard";  
  import {globalStore}    from "../../main.js"
  
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
        chart: ['soPresDispl', 'fRailPres', 'pscav', 'tTurbIn'],
        firstColumn: ['ServoOil', 'ScavengeAir','PistonRunning'] ,
        secColumn: ['FuelInjection', 'ExhaustGas','AutomationControl'],
        dataLoaded : false
      };
    },
    computed: {
      counter: function () { return globalStore.counter; }
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

      this.setData();               
    },
    watch:
    {
      counter : function(newCounter)
      {
        this.setData();
      }
    },
     methods: {
      setData: function() {

        console.log("comp overview "+globalStore.counter);

        let objs = ['soPresDispl', 'CAngleEVC', 'fRailPres', 'pmax', 'pscav', 'tscav','tTurbIn', 'tcspeed',  'pmaxPcomp','tlinerfore'];

        let formats =  [1,1,1,1,2,1,1,0,1,1];

        for( let i = 0; i < objs.length; i++ )
        {
          this.$set(this.data[objs[i]], 'Title',globalStore.engMap.EDS_Parameter_Names[objs[i]].longName);
          this.$set(this.data[objs[i]], 'Unit', globalStore.engMap.EDS_Parameter_Names[objs[i]].unit);
          this.$set(this.data[objs[i]], 'Format',formats[i]);
        }
        
        let len = Object.keys(globalStore.timelineData).length;
        let helperMatrix = globalStore.timelineData[Object.keys(globalStore.timelineData)[len - 1]];

        let params = [ 'ServoPress', 'EVCpercyl','FuelPress','Pmax','Pscav','Tscav','TCspeed','Tturbin', 'PressureRise','Tliner'];

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

            let helper = globalStore.timelineData[Object.keys(globalStore.timelineData)[j]];

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

            point.date = new Date(Object.keys(globalStore.timelineData)[j]);
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

        let subSystems = ['ServoOil', 'FuelInjection', 'ScavengeAir','ExhaustGas',  'PistonRunning', 'AutomationControl'];
        let tags = ['Servo Oil','Fuel Injection','Scavenge Air','Exhaust Gas','Piston Running','Automation & Control'];

        for (let i=0; i<subSystems.length;i++)
        {
          this.$set(this.data[subSystems[i]], 'Value',  globalStore.events.kpi[tags[i]][0]*100);            
          this.$set(this.data[subSystems[i]], 'Color',  globalStore.events.kpi[tags[i]][1]);
          if (i<subSystems.length-1)
          {
            this.$set(this.data[subSystems[i]], 'Card1', this.data[this.data[subSystems[i]]['Tag1']]);    
            this.$set(this.data[subSystems[i]], 'Card2', this.data[this.data[subSystems[i]]['Tag2']]);  
          }
        } 

        this.dataLoaded = true;          
        
      }
    },
  }
</script>

<style scoped>

</style>