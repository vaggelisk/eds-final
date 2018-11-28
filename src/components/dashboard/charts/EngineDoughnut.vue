<template>
  <div>
    <div v-if='loading'>Loading...</div>
    <v-card-title primary class="title"> Engine KPI </v-card-title>

    <v-card-actions >
      <v-layout>
        <v-flex xs6>

          <!--<div class="speed-value">-->
            <!--<span><h4>{{ speedValue }}% </h4></span>-->
          <!--</div>-->
          <dx-circular-gauge :value="speedValue">
            <dx-size :width="220"/>
            <dx-title :text="textTitle"
                      verticalAlignment="bottom"
                      ></dx-title>

            <dx-value-indicator
              type="rangeBar"
            />
            <dx-geometry
              :start-angle="250"
              :end-angle="290"
            />
            <dx-scale
              :start-value="0"
              :end-value="100"
              :tick-interval="100"
            />
            <dx-range-container >
              <dx-range :start-value="0"  :end-value="speedValue" color="green"></dx-range>
              <!--<dx-range :start-value="speedValue" :end-value="100" color="white"></dx-range>-->

            </dx-range-container>
          </dx-circular-gauge>
        </v-flex>
      </v-layout>

    </v-card-actions>
  </div>
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
 DxTitle
} from "devextreme-vue/circular-gauge"

import GaugeIndicator from "./GaugeIndicator"


export default {
    name: "EngineDoughnut",
    props: ['childEngineDataLoaded', 'engineKpiData'],
    components: {
      DxCircularGauge,

      DxSize,
      DxValueIndicator,
      DxGeometry,
      DxScale,
      DxRangeContainer,
      DxRange,
      DxTitle,

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
      console.log("dfkgjjjkdjkghdjkghj");
      console.log(this.engineKpiDataC.Value);
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
        }
      };
      this.createChart2('engine-dashboard-chart', this.doughnutChartData);

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
    top: 45%;
    line-height: 100px;
  }

  .speed-value > span {
    position: relative;
    font-size: 50px;
    font-weight: lighter;
    color: #fff7d7;
  }

</style>

