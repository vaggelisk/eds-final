<template>  
  <v-container fluid grid-list-md>
    <v-layout row >
      <v-flex d-flex md4>
        <v-responsive contain :v-show="dataLoaded">    
          <Schematic
              v-bind:schematicSource="schematicSource"
              v-bind:points="points"
              v-bind:initWidth="initWidth"
              v-bind:initHeight="initHeight"
              v-bind:idName="idName"
              v-bind:counter="counter"/>     
         </v-responsive>     
      </v-flex>
      <v-flex d-flex md4>
        <v-layout column >
          <v-flex d-flex md3>
            <v-layout row >
              <v-flex d-flex md6>
                <v-responsive contain :v-show="dataLoaded">
                  <Card
                      v-bind:cardData="data['tTurbIn']"
                      v-bind:counter="counter" /> 
                </v-responsive> 
              </v-flex>
              <v-flex d-flex md6>
                <v-responsive contain  :v-show="dataLoaded">
                  <Card  
                      v-bind:cardData="data['tcspeed']"
                      v-bind:counter="counter" /> 
                </v-responsive> 
              </v-flex>
            </v-layout>
          </v-flex> 
          <v-flex d-flex md3>
            <v-layout row >
              <v-flex d-flex md6>
                <v-responsive contain :v-show="dataLoaded">
                  <Card
                      v-bind:cardData="data['pscav']"
                      v-bind:counter="counter" /> 
                </v-responsive> 
              </v-flex>
              <v-flex d-flex md6>
                <v-responsive contain :v-show="dataLoaded">
                  <Card 
                      v-bind:cardData="data['tscav']"
                      v-bind:counter="counter" /> 
                </v-responsive> 
              </v-flex>
            </v-layout>
          </v-flex> 
          <v-flex d-flex md3>
             <v-layout row >
              <v-flex d-flex md6>
                <v-responsive contain :v-show="dataLoaded">
                  <Card 
                      v-bind:cardData="data['backT']"
                      v-bind:counter="counter" /> 
                </v-responsive> 
              </v-flex>
              <v-flex d-flex md6>
                <v-responsive contain :v-show="dataLoaded">
                  <Card 
                      v-bind:cardData="data['flowComp']"
                      v-bind:counter="counter" /> 
                </v-responsive> 
              </v-flex>
            </v-layout>
          </v-flex> 
          <v-flex d-flex md3>
            <v-responsive contain :v-show="dataLoaded">
              <TimelineChart
                    v-bind:tlData="data['pscav']"
                    v-bind:counter="counter" />      
            </v-responsive>
          </v-flex>          
        </v-layout>
      </v-flex>
      <v-flex d-flex md4>        
        <v-layout column >
          <v-flex d-flex md6>
            <v-layout column >
              <v-flex d-flex v-for="name in chart" :key="name">            
                <v-responsive contain :v-show="dataLoaded">            
                  <TimelineChart
                      v-bind:tlData="data[name]"
                      v-bind:counter="counter" />                     
                </v-responsive>  
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex md3>
            <v-layout row >
              <v-flex d-flex md6>
                <v-responsive contain :v-show="dataLoaded">
                  <v-card style="width : 100%; background-color: rgb(42,42,42); height:250px;">
                      <v-card-text>Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos</v-card-text>
                  </v-card> 
                </v-responsive> 
              </v-flex>
              <v-flex d-flex md6>
                <v-responsive contain  :v-show="dataLoaded">
                  <v-card style="width : 100%; background-color: rgb(42,42,42); height:250px;">
                    <v-card-text>Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos</v-card-text>
                  </v-card> 
                </v-responsive> 
              </v-flex>
            </v-layout>
          </v-flex> 
          <v-flex d-flex md3>
            <v-responsive contain :v-show="dataLoaded">  
              <TimelineChart
                    v-bind:tlData="data['tExhC']"
                    v-bind:counter="counter" />      
            </v-responsive>
          </v-flex> 
        </v-layout>
      </v-flex>
    </v-layout>    
  </v-container>

</template>

<script>
  import Schematic  from "../Controls/Schematic";
  import TimelineChart  from "../Controls/TimelineChart";
  import Card  from "../Controls/Card";
  import {globalStore}    from "../../main.js"

  export default {
    name: "ScavengeAir",
    components: {
      Schematic,
      TimelineChart,
      Card
    },
    data: function() {
      return {
        schematicSource: require('../../assets/scavenge-exhaust-schematic-dark.png'),
        points: {
          "Waste Gate": {x:459, y:354, color:0, selected:false, events:[]},
          "Turbine": {x:444, y:640, color:0, selected:false, events:[]},
          "Scavenge Air Cooler": {x:609, y:860, color:0, selected:false, events:[]},
          "Scavenge Ports": {x:187, y:836, color:0, selected:false, events:[]},
          "Air Flaps": {x:414, y:815, color:0, selected:false, events:[]},
          "Compressor": {x:614, y:640, color:0, selected:false, events:[]},
          "Filter": {x:654, y:473, color:0, selected:false, events:[]}},        
        initWidth: 910,
        initHeight: 1134,
        idName: "ScavengeAir",
        data: {},
        chart: ['tTurbIn', 'tcspeed', 'tcTbroilO'],
        dataLoaded: false
      };
    },
    computed: {
      counter: function () { return globalStore.counter; }
    },
    mounted() {  
      
      for (let i=0; i<this.chart.length;i++)
        this.$set( this.data, this.chart[i], {});

      let otherParams = ['pscav', 'tExhC', 'pexh', 'tscav', 'tEff', 'backT', 'flowComp', 'flowOutTurb' ];
      
      for (let i=0; i<otherParams.length;i++)
        this.$set( this.data, otherParams[i], {});

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
        
        console.log("exh Gas "+globalStore.counter);

        let objs = ['tTurbIn', 'tcspeed', 'tcTbroilO', 'pscav', 'tExhC', 'pexh', 'tscav', 'tEff', 'backT', 'flowComp', 'flowOutTurb' ];

        let formats = [1,0,1,2,1,2,1,2,2,2,2];

        for( let i = 0; i < objs.length; i++ )
        {
          this.$set(this.data[objs[i]], 'Title',globalStore.engMap.EDS_Parameter_Names[objs[i]].longName);
          this.$set(this.data[objs[i]], 'Unit',globalStore.engMap.EDS_Parameter_Names[objs[i]].unit);
          this.$set(this.data[objs[i]],'Format',formats[i]);
        }

        let len = Object.keys(globalStore.timelineData).length;
        let helperMatrix = globalStore.timelineData[Object.keys(globalStore.timelineData)[len - 1]];

        let params = ['Tturbin', 'TCspeed', 'tTurboilOut', 'Pscav', 'Texh', 'pexh', 'Tscav', 'tEff', 'backT1', 'flowComp', 'flowOutTurb'];
       
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

            let helper = globalStore.timelineData[Object.keys(globalStore.timelineData)[j]];

            array = helper[params[i]];

            avg = average(array[0]);
            ref = average(array[1]);

            min = array[2];
            max = array[3];

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
        
        var aggrEvents = globalStore.events.aggrEvents;       

        for(var key in this.points)
        { 
          let compEvents = aggrEvents.filter(function (item) {
              return item.subComponent == key;
          });

          if (compEvents.length == 0)
          {
            this.$set(this.points[key],'color',0);
            this.$set(this.points[key], 'events', []);
          }
          else
          {
            let mx = Math.max.apply(Math, compEvents.map(function(item){return item.color;}));
            this.$set(this.points[key],'color',mx);
            this.$set(this.points[key], 'events', compEvents);
          }
        }

        this.dataLoaded = true;
          
        
        }
      },
    }
</script>
<style scoped>

</style>