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
                v-bind:idName="idName"/>
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
  import axios                    from "axios";
  import Schematic  from "../Controls/Schematic";
  import TimelineChart  from "../Controls/TimelineChart";
  import Card  from "../Controls/Card";

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
          counter: 1,
          dataLoaded : false
        };
      },
    mounted() { 
      
      let objs = ['pUndersideTemp', 'tscav', 'pmaxPcomp','pcomp','pmax'];

      for (let i=0; i<objs.length;i++)
         this.$set( this.data, objs[i], {});
      
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

          let objs = ['pUndersideTemp', 'tscav', 'pmaxPcomp','pcomp','pmax'];

          let formats =  [1,1,1,1,1];

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

          let params = [ 'PistonUnderSideTemp', 'Tscav', 'PressureRise', 'Pcomp','Pmax'];

          let objs = ['pUndersideTemp', 'tscav', 'pmaxPcomp','pcomp','pmax'];

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