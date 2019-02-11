<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md12>
        <v-layout row wrap>

          <v-flex d-flex >
            <v-layout row wrap>
              <v-flex
                v-for="n in 3"
                :key="n"
                d-flex
                xs12 md4
              >
                <v-layout v-if="n===1">
                  <v-flex >
                    <v-layout row wrap>
                      <v-flex >
                        <BarChart
                          v-if="detailedViewData.firingPressure.values"
                          v-bind:dataChart="detailedViewData.firingPressure"
                          v-bind:counter="counter2" />
                      </v-flex>
                    </v-layout>


                    <v-layout row wrap>
                      <v-flex  >
                        <BarChart
                          v-if="detailedViewData.compressionPressure.values"
                          v-bind:dataChart="detailedViewData.compressionPressure"
                          v-bind:counter="counter2" />
                      </v-flex>
                    </v-layout>
                  </v-flex>

                </v-layout>

                <v-layout v-if="n===2" row wrap  dark >
                  <v-flex>
                    <v-card style="background-color: rgb(42,42,42);">

                      <v-responsive contain>
                        <LineChart
                          v-if="detailedViewData.pressureTrace.sourcesInfo"
                          v-bind:dataChart="detailedViewData.pressureTrace"
                          v-bind:counter="counter2"
                          v-bind:currentItem="currentItem"
                        />
                      </v-responsive>

                    </v-card>
                  </v-flex>
                </v-layout>


                <v-layout v-if="n===3"
                          dark
                >
                  <v-flex >
                    <v-layout row wrap>
                      <v-flex >
                        <v-responsive contain :v-show="dataLoaded">
                          <TimelineChart
                            v-bind:tlData="data['fRailPres']"
                            v-bind:counter="counter" />
                        </v-responsive>
                      </v-flex>
                    </v-layout>


                    <v-layout row wrap>

                      <v-flex xs12 md12  >

                        <v-layout>

                          <v-flex md6>
                            <v-responsive contain :v-show="dataLoaded">
                              <Card
                                v-bind:cardData="data['pmax']"
                                v-bind:counter="counter" />
                            </v-responsive>
                          </v-flex>


                          <v-flex md6>
                            <v-responsive contain :v-show="dataLoaded">
                              <Card
                                v-bind:cardData="data['pcomp']"
                                v-bind:counter="counter" />
                            </v-responsive>
                          </v-flex>

                        </v-layout>
                      </v-flex>

                    </v-layout>

                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md12>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>

              <v-flex xs12 md4>
                <BarChart
                  v-if="detailedViewData.pressureRise.values"
                  v-bind:data-chart="detailedViewData.pressureRise"
                  v-bind:counter="counter2" />
              </v-flex>

              <v-flex xs12 md4>
                <BarChart
                  v-if="detailedViewData.indicatedPressure.values"
                  v-bind:dataChart="detailedViewData.indicatedPressure"
                  v-bind:counter="counter2" />
              </v-flex>

              <v-flex
                v-for="n in 2"
                :key="n"
                d-flex
                xs12 md2
              >
                <span v-if="n===1" >
                  <v-responsive contain >
                    <Card :v-show="dataLoaded"
                      v-bind:cardData="data['tExhC']"
                      v-bind:counter="counter" />
                  </v-responsive>
                </span>
                <v-card v-if="n===2" dark >
                  <Card :v-show="dataLoaded"
                        v-bind:cardData="data['fRailPres']"
                        v-bind:counter="counter" />

                </v-card>
              </v-flex>

            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md12>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex
                d-flex
                xs12 md4
              >
                <BarChart
                  v-if="detailedViewData.exhaustedTemp.values"
                  v-bind:dataChart="detailedViewData.exhaustedTemp"
                  v-bind:counter="counter2" />
              </v-flex>
              <v-flex
                d-flex
                xs12 md8
              >
                <v-responsive contain :v-show="dataLoaded">
                  <TimelineChart
                    v-bind:tlData="data['fRailPres']"
                    v-bind:counter="counter" />
                </v-responsive>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>



  </v-container>
</template>

<script>
  import axios                  from "axios";
  import BarChart               from "./detailedView/BarChart";
  import BarChartTrial          from "./detailedView/BarChartTrial";
  import LineChart              from "./detailedView/LineChart"
  import Card                   from "../Controls/Card"
  import TimelineChart          from "../Controls/TimelineChart"
  // import {getEnginePerformance} from "../../api/getEnginePerformance";

  export default {
    name: "Detailed-View",
    components: {BarChart, LineChart, BarChartTrial, Card, TimelineChart},
    props: {
      detailedViewData: Object,
      counter2: Number,
    },
    data: function () {
      return {
        currentItem: 'detailedView',
        lorem: `Lorem ipsum dolor `,
        dataLoaded: false,
        data: {},
        counter: 31,
        chart: ['pmax', 'pcomp', 'pmaxPcomp'],
        points: {
          "Fuel Rail": {x:36, y:565, color:0, selected:false, events:[]},
          "Injectors": {x:1285,y:741, color:0, selected:false, events:[]},
          "Fuel Pumps": {x:1539,y:312, color:0, selected:false, events:[]}},
      }
    },

    mounted() {
      for (let i=0; i<this.chart.length;i++)
        this.$set( this.data, this.chart[i], {});
      this.$set( this.data, 'fRailPres', {});
      this.$set( this.data, 'tExhC', {});
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
            this.counter = 1;
          }
        }, 50000)
      },
      fetchEventsList: function() {

        axios.get("http://localhost:8092/EDSMapping").then(resp => {

          let objs = ['pmax', 'pcomp', 'pmaxPcomp','fRailPres', 'tExhC'];

          let formats = [1,1,1,1,1];

          for( let i = 0; i < objs.length; i++ )
          {
            this.$set(this.data[objs[i]], 'Title',resp.data.EDS_Parameter_Names[objs[i]].longName);
            this.$set(this.data[objs[i]], 'Unit',resp.data.EDS_Parameter_Names[objs[i]].unit);
            this.$set(this.data[objs[i]],'Format',formats[i]);
          }

        });

        let url  = "http://localhost:8092/EDSTimelineData/" + this.counter;

        axios.get(url).then(response => {
          let len = Object.keys(response.data).length;
          console.log(len);
          let helperMatrix = response.data[Object.keys(response.data)[len - 1]];

          let params = ['Pmax', 'Pcomp', 'PressureRise','FuelPress', 'Texh'];

          let objs = ['pmax', 'pcomp', 'pmaxPcomp','fRailPres', 'tExhC'];

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
    }

  }
</script>

<style scoped>

</style>
