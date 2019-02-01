<template>
  <v-card style="width:100%;height:100%; background-color: rgb(42,42,42);">
    <!-- <div v-if='loading'>Loading...</div> -->
    <v-card-title primary class="title"> Engine KPI </v-card-title>
    <v-card-actions fill-height >
      <!-- <v-layout>
        <v-flex xs12> -->
            
          <dx-circular-gauge style="position:relative; left:15%; width:100%;height:100%;" :value="engineKpiData.Value">
            <div class="speed-value"  >
            <span><h5 style="color:white;width:100%;height:100%;">{{ engineKpiData.Value.toFixed(1) }}% </h5></span>
          </div>
            <dx-size  :width="180"/>            

            <dx-value-indicator
              spindleGapSize=0
              type="disable"
              color="transparent"
            />
            <dx-geometry
              :start-angle="270"
              :end-angle="270"
            />
            <dx-scale
              :start-value="0"
              :end-value="100"
              :tick-interval="100" >
              <dx-label :visible="false" />
              <dx-tick :visible="false" />
            </dx-scale>
            <dx-range-container :width="10" background-color="rgb(67,67,67)">
              <dx-range :start-value="0"  :end-value="engineKpiData.Value" color="rgb(60, 171, 48)"></dx-range>
            </dx-range-container>
          </dx-circular-gauge>
        <!-- </v-flex>
      </v-layout> -->

    </v-card-actions>
  </v-card>
</template>

<script>
import Chart             from 'chart.js'
import { DxCircularGauge,
 DxSize,
 DxValueIndicator,
 DxGeometry,
 DxScale,
 DxRangeContainer,
 DxRange,
 DxTitle,
 DxLabel,
 DxTick
} from "devextreme-vue/circular-gauge"

import GaugeIndicator from "./GaugeIndicator"


export default {
    name: "EngineDoughnut",
    props: {
      childEngineDataLoaded: Boolean,
      engineKpiData: Object,
      counter: Number,
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
      DxTick,

      GaugeIndicator,
    },

    data: function() {
        return {
            speedValue: 91,
            textTitle: "",

            loading: true,
            engineKpiDataC: this.engineKpiData,
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
                },
                options: {
                  maintainAspectRatio: false,
                }

            }
        }
    },
    methods: {
        createChart2(chartId, chartData) {
            const ctx = document.getElementById(chartId);
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
              data: [this.engineKpiDataC.Value , 100 - this.engineKpiDataC.Value],
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
        }

      };

    }

}
</script>

<style scoped>

  .speed-value {
    position: absolute;
    /*border: 2px solid #f05b41;*/
    /*border-radius: 50%;*/
    /*width: 220px;*/
    height: 110px;
    left: 28%;
    top: 25%;
    line-height: 100px;
  }

  .speed-value > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }

</style>

