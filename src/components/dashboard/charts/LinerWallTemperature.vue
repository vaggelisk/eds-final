<template>
    <v-responsive>
        <div v-if='loading'>Loading...</div>
        <v-card-title primary class="title"> Liner Wall Temperature </v-card-title>

        <v-card-title v-show="isShowing" primary-title>
          <div style="border-left:5px solid green;height:50px; margin-right:10px; "></div>
          <div>
              <div class="headline"><h2>{{compressionPressureDataC.Value.toFixed(2)}}</h2></div>
                <span class="grey--text">Measured [{{ linerWallTemperatureData.Unit }}] </span>
            </div>
        </v-card-title>

    </v-responsive>
</template>

<script>
    import DxButton from 'devextreme-vue/button';
    import Chart    from 'chart.js'
    import compressionDotsData from './compression-dots-data'

    export default {
        name: "TurbineInletTemp",
        components: {DxButton,},
        props: { childLinerWallTemperatureDataLoaded: Boolean, linerWallTemperatureData: Object},
        data: function () {
            return {
                isShowing: true,
                text: "Enlarge",
                loading: false,
                compressionPressureDataC: this.linerWallTemperatureData,
                dotsChartData:
                  {
                    type: 'line',
                    data: {
                      labels: [ '10:00', '10:10', '10:20', '10:30', '10:40'],
                      datasets: [{
                        label: 'pressure',
                        data: [3, 4, 1, 5, 6],
                        pointBackgroundColor: 'black',
                        pointRadius: 1,
                        fill: '+2',
                        showLine: true
                      },{
                        // label: 'pressure',
                        data: [5, 6, 1, 7, 8],
                        pointBackgroundColor: 'white',
                        pointRadius: 1,
                        fill: false,
                        showLine: true
                      },{
                        // label: 'pressure',
                        data: [7, 8, 1, 9, 10],
                        pointBackgroundColor: 'black',
                        pointRadius: 1,
                        fill: false,
                        showLine: true,
                      }],
                    },
                  options: {
                    legend: {
                      display:  false ,
                    },
                  }
                }
            }
        },
        methods: {
          createChart2(chartId, data) {
            const ctx = document.getElementById(chartId);
            const myChart2 = new Chart(ctx, data);
          }
        },
        mounted() {
          this.loading = false;
          this.createChart2('dot-chart-liner-1', this.dotsChartData);

        }
    }
</script>

<style scoped>
  #myButton {
    color: red;
    background-color: blueviolet;
  }

</style>
