<template>
    <v-responsive>
        <div v-if='loading'>Loading...</div>
        <!--<v-card-title primary class="title"> Firing Pressure </v-card-title>-->
        <v-card-title primary class="title">{{ firingPressureData.Title }} </v-card-title>
        <v-card-title v-show="isShowing" primary-title>
            <v-divider class="mx-3" vertical></v-divider>
            <div>
                <!--<div class="headline">{{ val }}</div>-->
              <div class="headline"><h2>{{firingPressureData.Value.toFixed(2)}}</h2></div>
                <span class="grey--text">Measured [{{ firingPressureData.Unit }}] </span>
            </div>
        </v-card-title>

        <v-card-actions>
          <v-container style="margin-left: -21px;" >
            <v-layout row wrap style="margin-right: -30px;" >
             <v-flex v-show="isShowing" xs4>

                <div class="headline" >{{firingPressureData.Ref.toFixed(2)}}</div>
                <span class="grey--text"> Reference  </span>
             </v-flex>

              <v-flex v-if="isShowing" xs8>
                <!--<dx-button id="myButton"  @click="isShowing ^= true" :text="text"/>-->
                <canvas id="dot-chart-1" @click="isShowing ^= true"></canvas>
              </v-flex>
              <v-flex v-else xs12 >
                  <canvas  @click="isShowing ^= true" ></canvas>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-actions>
        <div style="color:transparent">{{counter}}</div>
    </v-responsive>
</template>

<script>
    import DxButton from 'devextreme-vue/button';
    import Chart    from 'chart.js'
    import compressionDotsData from './compression-dots-data'

    export default {
        name: "FiringPressure",
        components: {DxButton,},
        props: {
          childFiringPressureDataLoaded: Boolean,
          firingPressureData: Object,
          counter: Number,
        },
        data: function () {
            return {
                isShowing: true,
                loading: false,
                // firingPressureDataC: this.firingPressureData,
                dotsChartData: {
                    type: 'line',
                    data: {
                      labels: this.firingPressureData.datapoints.labels,
                      datasets: [{
                        label: 'pressure',
                        data: this.firingPressureData.datapoints.valMin,
                        pointBackgroundColor: 'black',
                        pointRadius: 1,
                        fill: '+2',
                        showLine: true
                      },{
                        // label: 'pressure',
                        data:  this.firingPressureData.datapoints.val,
                        pointBackgroundColor: 'white',
                        pointRadius: 1,
                        fill: false,
                        showLine: true
                      },{
                        // label: 'pressure',
                        data:  this.firingPressureData.datapoints.valMax,
                        pointBackgroundColor: 'black',
                        pointRadius: 1,
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
              this.myChart2.options.scales.yAxes[0].display = false;
              this.myChart2.options.scales.xAxes[0].display = false;
            }
            else {
              this.myChart2.options.scales.yAxes[0].display = true;
              this.myChart2.options.scales.xAxes[0].display = true;
              this.myChart2.options.scales.xAxes[0].ticks.maxTicksLimit = 3;
            }
          },
          createChart2(chartId, data) {
            const ctx = document.getElementById(chartId);
            this.myChart2 = new Chart(ctx, data);
          }
        },
        mounted() {
          this.loading = false;
          this.isShowing = true;
          this.$watch('isShowing', function (newVal, ) {
            this.updateScaleChart(newVal);
          });
          this.createChart2('dot-chart-1', this.dotsChartData);

        }
    }
</script>

<style scoped>
  #myButton {
    color: red;
    background-color: blueviolet;
  }

</style>


