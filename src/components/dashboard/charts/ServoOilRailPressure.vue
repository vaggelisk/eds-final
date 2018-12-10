<template>
    <v-responsive>
        <div v-if='loading'>Loading...</div>
        <!--<v-card-title primary class="title"> {{ compressionPressureDataC.Title }} </v-card-title>-->
      <v-card-title primary class="title"> {{this.servoOilRailPressureData.Title}}</v-card-title>

        <v-card-title v-show="isShowing" primary-title>
            <v-divider class="mx-3" vertical></v-divider>
            <div>
              <div class="headline"><h2>{{compressionPressureDataC.Value.toFixed(2)}}</h2></div>
                <span class="grey--text">Measured [{{this.servoOilRailPressureData.Unit}}] </span>
            </div>
        </v-card-title>

        <v-card-actions>
          <v-container style="margin-left: -21px;"  >
            <v-layout row wrap style="margin-right: -30px;" >
             <v-flex v-show="isShowing" xs4>

                <div class="headline" >{{compressionPressureDataC.Ref.toFixed(2)}}</div>
                <span class="grey--text"> Reference  </span>
             </v-flex>

              <v-flex v-if="isShowing" xs8>
                  <canvas id="dot-chart-servo-1" @click="isShowing ^= true" height="180"></canvas>
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

    export default {
        name: "ServoOilRailPressure",
        components: {DxButton,},
        props: {
          childServoOilRailPressureDataLoaded: Boolean,
          servoOilRailPressureData: Object,
        },
        data: function () {
            return {
                isShowing: true,
                loading: false,
                compressionPressureDataC: this.servoOilRailPressureData,
                dotsChartData:
                  {
                    type: 'line',
                    data: {
                      labels: this.servoOilRailPressureData.datapoints.labels,
                      datasets: [{
                        label: 'pressure',
                        data: this.servoOilRailPressureData.datapoints.valMin,
                        pointBackgroundColor: 'black',
                        pointRadius: 1,
                        fill: '+2',
                        showLine: true
                      },{
                        // label: 'pressure',
                        data: this.servoOilRailPressureData.datapoints.val,
                        pointBackgroundColor: 'white',
                        pointRadius: 1,
                        fill: false,
                        showLine: true
                      },{
                        // label: 'pressure',
                        data: this.servoOilRailPressureData.datapoints.valMax,
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
                            // callback: function(value, ) {
                            //   return parseFloat(value).toFixed(2);
                            // },

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
              this.myChart3.options.scales.yAxes[0].display = false;
              this.myChart3.options.scales.xAxes[0].display = false;
            }
            else {
              this.myChart3.options.scales.xAxes[0].display = true;
              this.myChart3.options.scales.yAxes[0].display = true;
              this.myChart3.options.scales.xAxes[0].ticks.maxTicksLimit = 3;
            }
          },
          createChart3(chartId, data) {
            const ctx = document.getElementById(chartId);
            this.myChart3 = new Chart(ctx, data);
          }
        },
        mounted() {
          this.loading = false;
          this.isShowing = true;
          this.$watch('isShowing', function (newVal, ) {
            this.updateScaleChart(newVal);
          });
          this.createChart3('dot-chart-servo-1', this.dotsChartData);

        }
    }
</script>

<style scoped>
  #myButton {
    color: red;
    background-color: blueviolet;
  }

</style>
