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
                          v-if="data['pmax'].values"
                          v-bind:dataChart="data['pmax']"
                          v-bind:counter="counter" />
                      </v-flex>
                    </v-layout>


                    <v-layout row wrap>
                      <v-flex  >
                        <BarChart
                          v-if="data['pcomp'].values"
                          v-bind:dataChart="data['pcomp']"
                          v-bind:counter="counter" />
                      </v-flex>
                    </v-layout>
                  </v-flex>

                </v-layout>

                <v-layout v-if="n===2" row wrap  dark >
                  <v-flex>
                    <v-card style="background-color: rgb(42,42,42);">

                      <v-responsive contain>
                        <LineChart
                          v-if="data.pressureTrace.sourcesInfo"
                          v-bind:dataChart="data.pressureTrace"
                          v-bind:counter="counter"
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
                          <TimelineChart style="height:250px;"
                            v-bind:tlData="data['tcspeed']"
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
                                v-bind:cardData="data['backT']"
                                v-bind:counter="counter" />
                            </v-responsive>
                          </v-flex>


                          <v-flex md6>
                            <v-responsive contain :v-show="dataLoaded">
                              <Card
                                v-bind:cardData="data['ttTurbO']"
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
                   v-if="data['pmaxPcomp'].values"
                  v-bind:dataChart="data['pmaxPcomp']"
                  v-bind:counter="counter" />
              </v-flex>

              <v-flex xs12 md4>
                <BarChart                  
                  v-if="data['imep'].values"
                  v-bind:dataChart="data['imep']"
                  v-bind:counter="counter" />
              </v-flex>

              <v-flex
                v-for="n in 2"
                :key="n"
                d-flex
                xs12 md2
              >
                  <v-responsive v-if="n===1" contain >
                    <Card :v-show="dataLoaded"
                      v-bind:cardData="data['flowComp']"
                      v-bind:counter="counter" />
                  </v-responsive>

                <v-responsive v-if="n===2" contain >
                  <Card :v-show="dataLoaded"
                        v-bind:cardData="data['flowOutTurb']"
                        v-bind:counter="counter" />

                </v-responsive>
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
                  v-if="data['tExhC'].values"
                  v-bind:dataChart="data['tExhC']"
                  v-bind:counter="counter" />
              </v-flex>
              <v-flex
                d-flex
                xs12 md8
              >
                <v-responsive contain :v-show="dataLoaded">
                  <TimelineChart style="height:250px;" v-if="data['pmaxPcomp']"
                    v-bind:tlData="data['pmaxPcomp']"
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
  import BarChart               from "./detailedView/BarChart";
  import BarChartTrial          from "./detailedView/BarChartTrial";
  import LineChart              from "./detailedView/LineChart"
  import Card                   from "../Controls/Card"
  import TimelineChart          from "../Controls/TimelineChart"
  import {globalStore}          from "../../main.js"

  export default {
    name: "Detailed-View",
    components: {BarChart, LineChart, BarChartTrial, Card, TimelineChart},
    data: function () {
      return {
        currentItem: 'detailedView',
        dataLoaded: false,
        data: {},
      }
    },
    computed: {
      counter: function () { return globalStore.counter; }
    },
    mounted() {

      let objs = [ 'pmaxPcomp', 'tcspeed', 'flowComp', 'flowOutTurb','backT','ttTurbO','pmax','pcomp','imep','tExhC' ];

      for (let i=0; i<objs.length;i++)
        this.$set( this.data, objs[i], {});
      
      this.$set(this.data, 'pressureTrace', {});

      let sourceInfo = [];
      for (let i=0; i<globalStore.ehcData.cylCount; i++)
        sourceInfo.push({
          value: 'cyl'+(i+1).toString(),
          name: 'Cylinder ' +(i+1).toString()
        });

      sourceInfo.push({
          value: 'ref',
          name: 'Reference'
      });
      this.$set(this.data.pressureTrace, 'sourcesInfo', sourceInfo);

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
        
        console.log("eng detailed "+globalStore.counter);

        let objs = [ 'pmaxPcomp', 'tcspeed', 'flowComp', 'flowOutTurb','backT','ttTurbO' ];

        let formats = [2,0,2,2,1,1];

        for( let i = 0; i < objs.length; i++ )
        {
          this.$set(this.data[objs[i]], 'Title',globalStore.engMap.EDS_Parameter_Names[objs[i]].longName);
          this.$set(this.data[objs[i]], 'Unit',globalStore.engMap.EDS_Parameter_Names[objs[i]].unit);
          this.$set(this.data[objs[i]], 'Format',formats[i]);
        }

        let len = Object.keys(globalStore.timelineData).length;

        let helperMatrix = globalStore.timelineData[Object.keys(globalStore.timelineData)[len - 1]];

        let params = ['PressureRise','TCspeed', 'flowComp', 'flowOutTurb','backT1','ttTurbO1' ];
        
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

        objs=['pmax','pcomp','imep','tExhC', 'pmaxPcomp'];
        params= ['Pmax','Pcomp','imep','Texh','PressureRise'];

        for (let i=0; i<params.length;i++)
        {
          this.$set(this.data[objs[i]], 'arrangements', {});
          this.$set(this.data[objs[i]].arrangements, 'name', globalStore.engMap.EDS_Parameter_Names[objs[i]].longName);
          this.$set(this.data[objs[i]].arrangements, 'xaxis', globalStore.engMap.EDS_Parameter_Names[objs[i]].elementName);
          this.$set(this.data[objs[i]].arrangements, 'yaxis', '['+globalStore.engMap.EDS_Parameter_Names[objs[i]].unit+']');
                    
          this.$set(this.data[objs[i]], 'values', []);

          let array = helperMatrix[params[i]];

          for (let j=0; j<array[0].length;j++)
          {
            let val = array[0][j], exp = array[1][j];
            
            let diff = ((val - exp) / val) * 100;

            let tag = 0;

            let min = array[2];
            let max = array[3];

            if (params[i] == 'PressureRise')
            {
              min = min * 100;
              max = max * 100;
            }

            if ((diff>max)||(diff<min)) tag = 1;

            this.data[objs[i]].values.push({
              'arg': (j+1).toString(),
              'value':val,
              'tag': tag
            });
          }
        }
        
        this.$set(this.data.pressureTrace, 'sources', []);
        this.$set(this.data.pressureTrace, 'sources2', []);
        this.$set(this.data.pressureTrace, 'sources3', []);

        for (let i=0;i<globalStore.ehcData.crankAngle.length;i++)
        {
          let pt={}, pt3={};

          for (let cyl=1;cyl<=globalStore.ehcData.cylCount;cyl++)
          {
            pt['cyl'+cyl.toString()]=globalStore.ehcData.pressureTrace['Cylinder '+cyl][i];
            pt3['cyl'+cyl.toString()]=globalStore.ehcData.pressureTrace['Cylinder '+cyl][i];

          }
          pt['ref']= globalStore.ehcData.pressureTrace['Expected'][i];
          pt3['ref']= globalStore.ehcData.pressureTrace['Expected'][i];

          pt['x']=globalStore.ehcData.crankAngle[i];
          this.data.pressureTrace.sources.push(pt);     

          pt3['x']=globalStore.ehcData.volume[i];
          this.data.pressureTrace.sources3.push(pt3);
         
        }
        
        for (let j = 0; j < 360; j = j + 0.5 ) {
          let v = {
            x: j
          };
          for (let i=1; i<=globalStore.ehcData.cylCount; i++) {
            if (globalStore.ehcData.crankAnglePerCyl['CA'+i].indexOf(j) !== -1) {
              let q = globalStore.ehcData.crankAnglePerCyl['CA'+i].indexOf(j);
              v['cyl'+i] = globalStore.ehcData.pressureTrace['Cylinder '+i][q];
            }
          }
          this.data.pressureTrace.sources2.push(v);
        }    
        

        this.dataLoaded = true;
      }
    }

  }
</script>

<style scoped>

</style>
