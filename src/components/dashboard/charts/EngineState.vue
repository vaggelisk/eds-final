<template>
  <span>
    <div v-if='loading'>Loading...</div>
    <v-card-title primary class="title"> Engine State </v-card-title>
    <v-card-title class="subtitle"> Cylinders </v-card-title>

    <v-container
      contain
      grid-list-sm
    >

      <v-layout row wrap >

        <v-flex xs-12 >


          <!--<div class="speed-value">-->
            <!--<span><h4>{{ speedValue }}% </h4></span>-->
          <!--</div>-->
          <v-layout style="position: relative; top: -25%" >

            <v-flex xs2>
              <div class="speed-value-1" >
                <span><h4> 1 </h4></span>
              </div>
              <dx-circular-gauge :value="speedValue">
                <dx-size :width="120" />

                <dx-value-indicator
                   spindleGapSize=0
                  type="disable"
                  color="transparent"
                />
                <dx-geometry
                  :start-angle="270"
                  :end-angle="271"
                />
                <dx-scale
                  :start-value="0"
                  :end-value="100"
                  :tick-interval="100">
                                  <dx-label :visible=false></dx-label>
                </dx-scale>
                <dx-range-container >
                  <dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>
                  <!--<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>-->

                </dx-range-container>
              </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-2" >
                <span><h4> 2 </h4></span>
              </div>
            <dx-circular-gauge  :value="speedValue">
              <dx-size :width="120" />

              <dx-value-indicator
                 spindleGapSize=0
                type="disable"
                color="transparent"
              />
              <dx-geometry
                :start-angle="270"
                :end-angle="271"
              />
              <dx-scale
                :start-value="0"
                :end-value="100"
                :tick-interval="100">
                                <dx-label :visible=false></dx-label>
              </dx-scale>
              <dx-range-container >
                <dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>
                <!--<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>-->

              </dx-range-container>
            </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-3" >
                <span><h4> 3 </h4></span>
              </div>
            <dx-circular-gauge :value="speedValue">
              <dx-size :width="120" />

              <dx-value-indicator
                spindleGapSize=0
                type="disable"
                color="transparent"
              />
              <dx-geometry
                :start-angle="270"
                :end-angle="271"
              />
              <dx-scale
                :start-value="0"
                :end-value="100"
                :tick-interval="100" >
                                <dx-label :visible=false></dx-label>
              </dx-scale>
              <dx-range-container >
                <dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>
                <!--<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>-->

              </dx-range-container>
            </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-4" >
                <span><h4> 4 </h4></span>
              </div>
            <dx-circular-gauge :value="speedValue">
              <dx-size :width="120" />

              <dx-value-indicator
                 spindleGapSize=0
                type="disable"
                color="transparent">
                                <dx-label :visible=false></dx-label>
              </dx-value-indicator>
              <dx-geometry
                :start-angle="270"
                :end-angle="271"
              />
              <dx-scale
                :start-value="0"
                :end-value="100"
                :tick-interval="100">
                <dx-label :visible=false></dx-label>

              </dx-scale>

              <dx-range-container >
                <dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>
                <!--<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>-->

              </dx-range-container>
            </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-5" >
                <span><h4> 5 </h4></span>
              </div>
            <dx-circular-gauge :value="speedValue">
              <dx-size :width="120" />

              <dx-value-indicator
                spindleGapSize=0
                type="disable"
                color="transparent"
              />
              <dx-geometry
                :start-angle="270"
                :end-angle="271"
              />
              <dx-scale
                :start-value="0"
                :end-value="100"
                :tick-interval="100">
                <dx-label :visible=false></dx-label>
              </dx-scale>
              <dx-range-container >
                <dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>
                <!--<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>-->

              </dx-range-container>
            </dx-circular-gauge>
            </v-flex>

            <v-flex xs2>
              <div class="speed-value-6" >
                <span><h4> 6 </h4></span>
              </div>
              <dx-circular-gauge :value="speedValue">
                <dx-size :width="120" />

                <dx-value-indicator
                   spindleGapSize=0
                  type="disable"
                  color="transparent"
                />
                <dx-geometry
                  :start-angle="270"
                  :end-angle="271"
                />
                <dx-scale
                  :start-value="0"
                  :end-value="100"
                  :tick-interval="100">
                  <dx-label :visible=false></dx-label>
                </dx-scale>
              <dx-range-container >
                  <dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>
                  <!--<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>-->

                </dx-range-container>
              </dx-circular-gauge>
            </v-flex>

          </v-layout>

        </v-flex>
      </v-layout>

      <v-layout row wrap align-center  >

        <v-flex xs12 text-xs-center s>
          <v-layout class="buttons"  >
          <!--<v-card-actions  style="position: relative; top: -25%" >-->
              <v-btn large flat color="white">Turbines</v-btn>
                        <hr style="height:8px;border:none;color:green;background-color:green;" />

              <v-btn large flat color="white">Compressors</v-btn>
                        <hr style="height:8px;border:none;color:green;background-color:green;" />

              <v-btn large flat color="white">Air Coolers</v-btn>
                        <hr style="height:8px;border:none;color:green;background-color:green;" />

              <v-btn large flat color="white">Air Filters</v-btn>
          <!--</v-card-actions>-->
          </v-layout>
        </v-flex>


      </v-layout>

    </v-container>

  </span>
</template>

<script>
import Chart             from 'chart.js'
import DxCircularGauge, {
 DxSize,
 DxValueIndicator,
 DxGeometry,
 DxScale,
 DxRangeContainer,
 DxRange,
 DxTitle,
 DxLabel
} from "devextreme-vue/circular-gauge"

import GaugeIndicator from "./GaugeIndicator"


export default {
    name: "EngineDoughnut",
    props:{
      propA:  ['childEngineDataLoaded','engineKpiData'],
      propB: Number,
    },
    components: {
      DxCircularGauge,

      DxSize,
      DxValueIndicator,
      DxGeometry,
      DxScale,
      DxRangeContainer,
      DxRange,
      DxTitle,
      DxLabel,

      GaugeIndicator,
    },

    data: function() {
        return {
            speedValue: 91,
            textTitle: "",

            loading: true,
            // engineKpiDataC: this.engineKpiData,
            doughnutChartData: {
                type: 'doughnut',
                data: {
                    labels: ['State',],
                    datasets: [
                        {
                            label: 'Compression Pressure',
                            backgroundColor: ['green',],
                            data: [40, ],
                        }
                    ]
                }
            }
        }
    },
    methods: {
        customizeText(arg) {
          return arg.valueText + "%";
        },
        createChart2(chartId, chartData) {
            const ctx = document.getElementById(chartId);
          // ctx.height(100);

          const myChart2 = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
            });
        }
    },
    mounted () {
      this.textTitle = this.speedValue.toString() + "%";
      this.loading = false;

      this.doughnutChartData = {
        type: 'doughnut',
        data: {
          labels: [this.engineKpiDataC.Value.toString(),],
          datasets: [
            {
              label: 'Engine Pressure',
              backgroundColor: ['green', 'black'],
              // data: [this.engineKpiDataC.Value , 100 - this.engineKpiDataC.Value],
            }
          ]
        }
      };
      // this.createChart2('engine-dashboard-chart', this.doughnutChartData);

    }

}
</script>

<style scoped>

  .speed-value-1 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 6%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-1 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .speed-value-2 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 23%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-2 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .speed-value-3 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 39%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-3 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
   .speed-value-4 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 56%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-4 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .speed-value-5 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 72%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-5 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .speed-value-6 {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 90px;
    left: 89%;
    top: 32%;
    line-height: 100px;
  }

  .speed-value-6 > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }
  .buttons {
    position: relative;
    bottom: 130px !important;
  }

</style>

