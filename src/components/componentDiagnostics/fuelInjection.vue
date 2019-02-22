
<template>
  <v-container fluid grid-list-md>
    <v-layout row>
      <v-flex d-flex md8>
        <v-layout column>
          <v-flex d-flex md8>
            <v-responsive contain :v-show="dataLoaded">              
              <Schematic style="height:772px;"
                v-bind:schematicSource="schematicSource"
                v-bind:points="points"
                v-bind:initWidth="initWidth"
                v-bind:initHeight="initHeight"
                v-bind:idName="idName"
                v-bind:counter="counter"/>
            </v-responsive> 
          </v-flex>
          <v-flex d-flex md4>
            <v-responsive contain  :v-show="dataLoaded">              
              <TimelineChart style="height:250px;"
                v-bind:tlData="data['fRailPres']"
                v-bind:counter="counter" />                      
            </v-responsive>  
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md4>    
        <v-layout column>  
           <v-flex d-flex v-for="name in chart" :key="name" md2>            
            <v-responsive contain :v-show="dataLoaded">             
              <TimelineChart  style="height:166px;"
                v-bind:tlData="data[name]"
                v-bind:counter="counter" />                      
            </v-responsive>  
          </v-flex>    
          <v-flex d-flex md3> 
            <v-layout row>
               <v-flex d-flex md6> 
                  <v-responsive contain :v-show="dataLoaded">  
                    <Card
                        v-bind:cardData="data['fRailPres']"
                        v-bind:counter="counter" /> 
                  </v-responsive> 
               </v-flex>
               <v-flex d-flex md6> 
                  <v-responsive contain :v-show="dataLoaded">  
                    <Card 
                        v-bind:cardData="data['tExhC']"
                        v-bind:counter="counter" /> 
                  </v-responsive> 
               </v-flex>
            </v-layout>           
          </v-flex>
          <v-flex d-flex md3> 
            <v-layout row>
               <v-flex d-flex md6> 
                  <v-responsive contain :v-show="dataLoaded">  
                    <BarChart style="height:250px;"
                      v-bind:dataChart="data.soi"/>
                  </v-responsive> 
               </v-flex>
               <v-flex d-flex md6> 
                  <BarChart style="height:250px;" :v-show="dataLoaded" 
                    v-bind:dataChart="data['EC_Inj_DurationCyl']"
                    v-bind:counter="counter"/>
               </v-flex>
            </v-layout>           
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
  import BarChart from "../enginePerformance/detailedView/BarChart";  
  import {globalStore}    from "../../main.js"

  export default {
    name: "FuelInjection",
    components: {
      Schematic,
      TimelineChart,
      Card, 
      BarChart
    },
    data: function() {
      return {
        schematicSource: require('../../assets/fuel-injection-schematic-dark.png'),
        points: {
          "Fuel Rail": {x:36, y:565, color:0, selected:false, events:[]},
          "Injectors": {x:1285,y:741, color:0, selected:false, events:[]},
          "Fuel Pumps": {x:1539,y:312, color:0, selected:false, events:[]}},        
        initWidth: 1820,
        initHeight: 1134,
        idName: "FuelInjection",
        data: {},
        chart: ['pmax', 'pcomp', 'pmaxPcomp'],
        dataLoaded: false
      };
    },
    computed: {
      counter: function () { return globalStore.counter; }
    },
    mounted() {

      let objs = ['pmax', 'pcomp', 'pmaxPcomp','fRailPres', 'tExhC', 'soi','EC_Inj_DurationCyl'];

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
        
        console.log("fuel inj "+globalStore.counter);

        let objs = ['pmax', 'pcomp', 'pmaxPcomp','fRailPres', 'tExhC', 'soi','EC_Inj_DurationCyl'];

        let formats = [1,1,1,1,1,2,2];

        for( let i = 0; i < objs.length; i++ )
        {
          this.$set(this.data[objs[i]], 'Title',globalStore.engMap.EDS_Parameter_Names[objs[i]].longName);
          this.$set(this.data[objs[i]], 'Unit',globalStore.engMap.EDS_Parameter_Names[objs[i]].unit);
          this.$set(this.data[objs[i]],'Format',formats[i]);
        }

        let len = Object.keys(globalStore.timelineData).length;
        let helperMatrix = globalStore.timelineData[Object.keys(globalStore.timelineData)[len - 1]];

        let params = ['Pmax', 'Pcomp', 'PressureRise','FuelPress', 'Texh'];

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

        this.$set(this.data['soi'], 'arrangements',{});
        this.$set(this.data['soi'].arrangements, 'name', this.data['soi'].Title);            

        this.$set(this.data['soi'].arrangements, 'xaxis', 'Cylinders');
        this.$set(this.data['soi'].arrangements, 'yaxis', '['+ this.data['soi'].Unit+']');            

        let values=[];

        for (let i=0;i< globalStore.fiData.injStart.length;i++)
        {
            let point = {};

            point.arg =  (i+1).toString();
            point.value =  globalStore.fiData.injStart[i];
            point.tag = 2;

            values.push(point);
        }
        
        this.$set(this.data['soi'], 'values', values);

        this.$set(this.data['EC_Inj_DurationCyl'], 'arrangements',{});
        this.$set(this.data['EC_Inj_DurationCyl'].arrangements, 'name', this.data['EC_Inj_DurationCyl'].Title);
        

        this.$set(this.data['EC_Inj_DurationCyl'].arrangements, 'xaxis', 'Cylinders');
        this.$set(this.data['EC_Inj_DurationCyl'].arrangements, 'yaxis', '['+ this.data['EC_Inj_DurationCyl'].Unit+']');
        
        values=[];

        for (let i=0;i<globalStore.fiData.injDur.length;i++)
        {
          let point = {};

          point.arg =  (i+1).toString();
          point.value = globalStore.fiData.injDur[i];
          point.tag = 2;

          values.push(point);
        }
        
        this.$set(this.data['EC_Inj_DurationCyl'], 'values', values);

        this.dataLoaded = true;
          
        
        }
      },
    }
</script>

<style scoped>

</style>