<template>
  <v-container fluid grid-list-md>
    <v-layout row>
      <v-flex d-flex md8>
        <v-layout column style="height:100%;">
          <v-flex d-flex md8> 
            <v-responsive contain style="height:100%;width:100;" :v-show="dataLoaded">   
              <Schematic 
                v-bind:schematicSource="schematicSource"
                v-bind:points="points"
                v-bind:initWidth="initWidth"
                v-bind:initHeight="initHeight"
                v-bind:idName="idName"/>
            </v-responsive> 
          </v-flex d-flex>
          <v-flex d-flex md4>            
            <v-responsive contain style="height:100%;width:100%;" :v-show="dataLoaded">              
                <TimelineChart 
                    v-bind:tlData="data['soPresDispl']"
                    v-bind:counter="counter" />                     
            </v-responsive>  
          </v-flex d-flex>
        </v-layout>
      </v-flex d-flex>
      <v-flex d-flex md4>    
        <v-layout column style="height:100%;">
          <v-flex d-flex v-for="name in chart" :key="name" md3>            
            <v-responsive contain style="height:100%;width:100%;" :v-show="dataLoaded">      
                <TimelineChart       
                    v-bind:tlData="data[name]"
                    v-bind:counter="counter" />                     
            </v-responsive>  
          </v-flex d-flex>            
          <v-flex d-flex md3> 
            <v-layout row style="height:100%;">
               <v-flex d-flex  md6> 
                 <v-responsive contain style="height:100%;width:100%;" :v-show="dataLoaded">         
                  <v-card style="width : 100%; background-color: rgb(42,42,42); height:250px;">
                      <v-card-text>Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos</v-card-text>
                  </v-card>                
                 </v-responsive> 
               </v-flex d-flex>
               <v-flex d-flex md6>
                 <v-responsive contain style="height:100%;width:100%;" :v-show="dataLoaded">      
                  <v-card style="width : 100%; background-color: rgb(42,42,42); height:250px;">
                      <v-card-text>Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos</v-card-text>
                  </v-card>              
                 </v-responsive> 
               </v-flex d-flex>
            </v-layout>           
          </v-flex d-flex>
        </v-layout>
      </v-flex d-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios                    from "axios";
  import Schematic  from "../Controls/Schematic";   
  import TimelineChart  from "../Controls/TimelineChart";

    export default {
      name: "ServoOil",
      components: {
       Schematic,
       TimelineChart
      },
      data: function() {
        return {
          schematicSource: require('../../assets/servo-oil-schematic-dark.png'),
          points: {
            "Servo Oil Rail": {x:56, y:540, color:0, selected:false, events:[]},
            "VCU": {x:1001, y:252, color:0, selected:false, events:[]},
            "Exhaust Valve": {x:1624, y:295, color:0, selected:false, events:[]},
            "Servo oil pumps": {x:1293, y:900, color:0, selected:false, events:[]}},    
          initWidth: 1820,
          initHeight: 1134,
          idName:"ServoOil",
          data: {},
          counter: 1,
          chart: ['CAngleEVO', 'CAngleEVC', 'valveLift'],
          dataLoaded : false
        };
      },
    mounted() {      
      for (let i=0; i<this.chart.length;i++)
         this.$set( this.data, this.chart[i], {});
         
      this.$set( this.data, 'soPresDispl', {});
      
      this.fetchEventsList();
      this.startInterval();
    },

    methods: {
      startInterval: function () {
        this.interval = setInterval(() => {
          if (this.counter < 60) {
            this.fetchEventsList();
            this.counter = this.counter + 1;
          } else {
            this.counter =1;
            //clearInterval(this.interval);
          }
        }, 5000)
      },
      fetchEventsList: function() {

        axios.get("http://localhost:8092/EDSMapping").then(resp => {

            let objs = ['CAngleEVO', 'CAngleEVC', 'valveLift','soPresDispl'];

            let formats =  [1,1,1,1];

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

        let params = [ 'EVOpercyl', 'EVCpercyl', 'Stroke', 'ServoPress'];

        let objs = ['CAngleEVO', 'CAngleEVC', 'valveLift','soPresDispl'];

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

        this.dataLoaded = true;
        
       
      }
    },
    }
</script>

<style scoped>

</style>