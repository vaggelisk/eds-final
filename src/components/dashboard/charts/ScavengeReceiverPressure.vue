<template>
    <v-responsive>
        <div v-if='loading'>Loading...</div>
        <!--<v-card-title primary class="title"> {{ compressionPressureDataC.Title }} </v-card-title>-->
        <v-card-title primary class="title"> {{this.scavengeReceiverPressureData.Title}}</v-card-title>

        <v-card-title v-show="isShowing" primary-title>
          <div style="border-left:5px solid green;height:50px; margin-right:10px; "></div>
          <div>
              <div class="headline"><h2>{{compressionPressureDataC.Value.toFixed(2)}}</h2></div>
                <span class="grey--text">Measured [{{compressionPressureDataC.Unit}}] </span>
            </div>
        </v-card-title>

        <v-card-actions>
          <v-container style="margin-left: -21px;"  >
            <v-layout row wrap  style="margin-right: -30px;">
             <v-flex v-show="isShowing" xs4>

                <div class="headline" >{{compressionPressureDataC.Ref.toFixed(2)}}</div>
                <span class="grey--text"> Reference  </span>
             </v-flex>

              <v-flex v-if="isShowing"  xs8 style="margin-top: -40px">
                  <canvas id="dot-chart-scav-2" @click="isShowing ^= true"></canvas>
              </v-flex>
              <v-flex v-else xs12>
                   <canvas  @click="isShowing ^= true"  ></canvas>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-actions>
    </v-responsive>

</template>

<script>
    import DxButton from 'devextreme-vue/button';
    import Chart    from 'chart.js'
    import compressionDotsData from './compression-dots-data'

    export default {
        name: "ScavengeReceiverPressure",
        components: {DxButton,},
        props: {
          childScavengeReceiverPressureDataLoaded: Boolean,
          scavengeReceiverPressureData: Object
        },
        data: function () {
            return {
                isShowing: true,
                loading: false,
                compressionPressureDataC: this.scavengeReceiverPressureData,
                dotsChartData:
                  {
                    type: 'line',
                    data: {
                      labels: this.scavengeReceiverPressureData.datapoints.labels,
                      datasets: [{
                        label: 'pressure',
                        data: this.scavengeReceiverPressureData.datapoints.valMin,
                        pointBackgroundColor: 'black',
                        pointRadius: 0,
                        fill: '+2',
                        showLine: true
                      },{
                        // label: 'pressure',
                        data: this.scavengeReceiverPressureData.datapoints.val,
                        pointBackgroundColor: 'white',
                        pointRadius: 1,
                        fill: false,
                        showLine: true
                      },{
                        // label: 'pressure',
                        data: this.scavengeReceiverPressureData.datapoints.valMax,
                        pointBackgroundColor: 'black',
                        pointRadius: 0,
                        fill: false,
                        showLine: true,
                      }],
                    },
                  options: {
                    layout: {
                      padding: {
                        left: 0,
                        right: 0,
                      },

                    },
                    scales: {
                      xAxes: [
                        {
                          display: false,
                          ticks: {
                            callback: function(value, index, values) {
                              return parseFloat(value).toFixed(2);
                            },

                            maxTicksLimit: 3,
                          },
                        }
                      ],
                      yAxes: [{
                        display: false,
                        scaleLabel: {
                          display: true,
                          labelString: '[bar]',
                          padding: -2,
                        }
                      }
                      ],
                    },
                    legend: {
                      display:  false ,
                    },
                  }
                }
            }
        },

        methods: {
          updateScaleChart(v) {
            if (v==1){
              this.myChart7.options.scales.yAxes[0].display = false;
              this.myChart7.options.scales.xAxes[0].display = false;
            }
            else {
              this.myChart7.options.scales.yAxes[0].display = true;
              this.myChart7.options.scales.xAxes[0].display = true;
              this.myChart7.options.scales.xAxes[0].ticks.maxTicksLimit = 3;
            }
          },
          createChart7(chartId, data) {
            const ctx = document.getElementById(chartId);
            this.myChart7 = new Chart(ctx, data);
          }
        },
        mounted() {
          this.loading = false;
          this.showing = true;
          this.$watch('isShowing', function (newVal, ) {
            this.updateScaleChart(newVal);
          });
          this.createChart7('dot-chart-scav-2', this.dotsChartData);

        }
    }
</script>

<style scoped>

</style>

