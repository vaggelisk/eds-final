<template>
    <v-responsive>
        <div v-if='loading'>Loading...</div>
        <!--<v-card-title primary class="title"> Firing Pressure </v-card-title>-->
        <v-card-title primary class="title"> {{ firingPressureDataC.Title }} </v-card-title>

        <v-card-title v-show="isShowing" primary-title>
            <v-divider class="mx-3" vertical></v-divider>
            <div>
                <div class="headline">{{firingPressureDataC.Value.toFixed(1)}}</div>
                <span class="grey--text">Measured [{{firingPressureDataC.Unit}}] </span>
            </div>
        </v-card-title>

        <v-card-actions>
          <v-container >
            <v-layout row wrap>
             <v-flex v-show="isShowing" xs4>

                <div class="headline" >{{firingPressureDataC.Ref.toFixed(1)}}</div>
                <span class="grey--text"> Reference  </span>
             </v-flex>

              <v-flex v-if="isShowing" xs8>
                <!--<dx-button id="myButton"  @click="isShowing ^= true" :text="text"/>-->
                <canvas id="dot-chart-1" @click="isShowing ^= true"></canvas>
                <div>{{isShowing}}</div>
              </v-flex>
              <v-flex v-else xs12>
                <!--<dx-button id="myButton"  @click="isShowing ^= true" :text="text"/>-->
                  <canvas  @click="isShowing ^= true" ></canvas>
                  <div>{{isShowing}}</div>
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
        name: "FiringPressure",
        components: {DxButton,},
        props: ['childFiringPressureDataLoaded', 'firingPressureData'],
        data: function () {
            return {
                isShowing: true,
                loading: false,
                firingPressureDataC: this.firingPressureData,

                dotsChartData: {
                    type: 'line',
                    data: {
                      labels: this.firingPressureData.dataPoints.labels,
                      datasets: [{
                        label: 'pressure',
                        data: this.firingPressureData.dataPoints.valMin,
                        pointBackgroundColor: 'black',
                        pointRadius: 1,
                        fill: '+2',
                        showLine: true
                      },{
                        // label: 'pressure',
                        data:  this.firingPressureData.dataPoints.val,
                        pointBackgroundColor: 'black',
                        pointRadius: 1,
                        fill: false,
                        showLine: true
                      },{
                        // label: 'pressure',
                        data:  this.firingPressureData.dataPoints.valMax,
                        pointBackgroundColor: 'black',
                        pointRadius: 1,
                        fill: false,
                        showLine: true,
                      }],
                    },
                    options: {
                      // axes: {
                      //  display: false,
                      // },
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              max: 5,
                              // ,callback: function(val) {
                              //   if(val == 0 || val == 5) {
                              //     return null;
                              //   }
                              //   return Number.isInteger(val) ? val : null;
                              // }
                            }
                          }
                        ],
                        yAxes: [{
                          display: false,
                        }],
                      },
                      legend: {
                        display:  false,
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
          this.isShowing = true;
          console.log(this.firingPressureDataC.dataPoints);
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


