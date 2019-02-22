<template>
  <v-container fluid grid-list-md>
    <v-layout column >
      <v-flex d-flex md9>
        <v-layout row >
          <v-flex d-flex md6>
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
          <v-flex d-flex md2>
            <v-layout column >
              <v-flex d-flex md4>
                <v-card style="width : 100%; background-color: rgb(42,42,42); height:250px;">
                    <v-card-text>Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos</v-card-text>
                </v-card>     
              </v-flex>
              <v-flex d-flex md4>
                <v-card style="width : 100%; background-color: rgb(42,42,42); height:250px;">
                    <v-card-text>Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos</v-card-text>
                </v-card> 
              </v-flex>
              <v-flex d-flex md4>
                <v-responsive contain :v-show="dataLoaded">  
                  <Card
                      v-bind:cardData="data['pmax']"
                      v-bind:counter="counter" /> 
                </v-responsive> 
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex md4>
            <v-layout column >
              <v-flex d-flex md8>
                <v-card dark/>
              </v-flex>
              <v-flex d-flex md4>
                <v-layout row >
                  <v-flex d-flex md6>
                    <v-card dark/>
                  </v-flex>
                  <v-flex d-flex md6>
                    <v-card dark/>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md3>    
        <v-layout row >
          <v-flex d-flex md8>
            <v-card dark/>
          </v-flex>
          <v-flex d-flex md2>                
            <v-card dark/>  
          </v-flex>
          <v-flex d-flex md2>                  
            <v-card dark/>
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
    name: "PistonRunning",
    components: {
      Schematic,
      TimelineChart,
      Card
    },
    data: function() {
      return {
        schematicSource: require('../../assets/piston-schematic-dark.png'),
        points: {
          "Piston Rings": {x:1053, y:528, color:0, selected:false, events:[]},
          "Cylinder Liner": {x:693, y:298, color:0, selected:false, events:[]}},        
        initWidth: 1820,
        initHeight: 1134,
        idName: "PistonRunning",
        data: {},
        dataLoaded : false
      };
    },
    computed: {
      counter: function () { return globalStore.counter; }
    },
    mounted() {       
      let objs = ['pUndersideTemp', 'tscav', 'pmaxPcomp','pcomp','pmax'];

      for (let i=0; i<objs.length;i++)
         this.$set( this.data, objs[i], {});

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
        
        console.log("piston Run "+globalStore.counter);

        let objs = ['pUndersideTemp', 'tscav', 'pmaxPcomp','pcomp','pmax'];

        let formats =  [1,1,1,1,1];

        for( let i = 0; i < objs.length; i++ )
        {
          this.$set(this.data[objs[i]], 'Title',globalStore.engMap.EDS_Parameter_Names[objs[i]].longName);
          this.$set(this.data[objs[i]], 'Unit',globalStore.engMap.EDS_Parameter_Names[objs[i]].unit);
          this.$set(this.data[objs[i]], 'Format',formats[i]);
        }

        let len = Object.keys(globalStore.timelineData).length;
        
        let helperMatrix = globalStore.timelineData[Object.keys(globalStore.timelineData)[len - 1]];

        let params = [ 'PistonUnderSideTemp', 'Tscav', 'PressureRise', 'Pcomp','Pmax'];

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