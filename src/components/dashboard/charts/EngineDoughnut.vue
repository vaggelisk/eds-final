<template>
  <div>
    <div v-if='loading'>Loading...</div>
    <v-card-title primary class="title"> Engine KPI </v-card-title>
    <canvas id="engine-dashboard-chart"></canvas>
  </div>
</template>

<script>

    import Chart             from 'chart.js'


    export default {
        name: "EngineDoughnut",
        props: ['childEngineDataLoaded', 'engineKpiData'],
        // components: { DxCircularGauge, DxSize, DxSlider, DxValueIndicator,
        //   DxGeometry,
        //   DxScale, GaugeIndicator},
        data: function() {
            return {
                speedValue: 40,
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

</style>
