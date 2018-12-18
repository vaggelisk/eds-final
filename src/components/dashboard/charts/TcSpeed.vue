<template>
    <v-responsive>
        <div v-if='loading'>Loading...</div>
        <!--<v-card-title primary class="title"> Firing Pressure </v-card-title>-->
        <v-card-title primary class="title">{{ tcSpeedData.Title }} </v-card-title>
        <v-card-title v-show="isShowing" primary-title style="margin-top: -20px">
            <div style="border-left:5px solid green;height:50px; margin-right:10px; "></div>
            <div>
                <!--<div class="headline">{{ val }}</div>-->
              <div class="headline"><h2>{{tcSpeedData.Value.toFixed(0)}}</h2></div>
                <span class="grey--text">Measured [{{ tcSpeedData.Unit }}] </span>
            </div>
        </v-card-title>

        <v-card-actions>
          <v-container style="margin-left: -21px; margin-top: -20px; margin-bottom: -43px" >
            <v-layout row wrap style="margin-right: -30px;" >
             <v-flex v-show="isShowing" xs4>

                <div class="headline" >{{tcSpeedData.Ref.toFixed(0)}}</div>
                <span class="grey--text"> Reference  </span>
             </v-flex>

              <v-flex v-if="isShowing" xs8 style="margin-top: -20px" >
                <!--<dx-button id="myButton"  @click="isShowing ^= true" :text="text"/>-->
                <canvas id="dot-chart-10" @click="isShowing ^= true"></canvas>
              </v-flex>
              <v-flex v-else xs12 >
                  <canvas  @click="isShowing ^= true" ></canvas>
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
        name: "TcSpeed",
        components: {DxButton,},
        props: {
          childTcSpeedDataLoaded: Boolean,
          tcSpeedData: Object,
          counter: Number,
        },
        data: function () {
            return {
                isShowing: true,
                loading: false,
                // tcSpeedDataC: this.tcSpeedData,
                dotsChartData: {
                    type: 'line',
                    data: {
                      labels: this.tcSpeedData.datapoints.labels,
                      datasets: [{
                        label: 'pressure',
                        data: this.tcSpeedData.datapoints.valMin,
                        pointBackgroundColor: 'black',
                        pointRadius: 0,
                        fill: '+2',
                        showLine: true
                      },{
                        // label: 'pressure',
                        data:  this.tcSpeedData.datapoints.val,
                        pointBackgroundColor: 'white',
                        pointRadius: 1,
                        fill: false,
                        showLine: true
                      },{
                        // label: 'pressure',
                        data:  this.tcSpeedData.datapoints.valMax,
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
                        display:  false,
                      },
                    }
                }
            }
        },

        methods: {
          updateScaleChart(v) {
            if (v==1){
              this.myChart10.options.scales.yAxes[0].display = false;
              this.myChart10.options.scales.xAxes[0].display = false;
            }
            else {
              this.myChart10.options.scales.yAxes[0].display = true;
              this.myChart10.options.scales.xAxes[0].display = true;
              this.myChart10.options.scales.xAxes[0].ticks.maxTicksLimit = 3;
            }
          },
          createChart10(chartId, data) {
            const ctx = document.getElementById(chartId);
            this.myChart10 = new Chart(ctx, data);
          }
        },
        mounted() {
          this.loading = false;
          this.isShowing = true;
          this.$watch('isShowing', function (newVal, ) {
            this.updateScaleChart(newVal);
          });
          this.createChart10('dot-chart-10', this.dotsChartData);

        }
    }
</script>

<style scoped>
  #myButton {
    color: red;
    background-color: blueviolet;
  }

</style>


