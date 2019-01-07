<template>
    <v-responsive>
        <div >
          <v-card-title  primary class="title"> {{ scavengeReceiverPressureData.name }}</v-card-title>

          <v-card-title v-show="isShowingRef" primary-title>

            <div :style="'border-left:5px solid ' + scavengeReceiverPressureData.color + ';height:50px; margin-right:10px;' "></div>


            <div>
                <div class="headline">
                  <h2 v-if="scavengeReceiverPressureData.color==='red'" style="color: red">{{ scavengeReceiverPressureData.value}} </h2>
                  <h2 v-else >{{ scavengeReceiverPressureData.value}} </h2>
                </div>
                 <span class="grey--text">Measured [{{ scavengeReceiverPressureData.unit}}] </span>

              </div>
          </v-card-title>

          <v-card-actions>
            <v-container style="margin-left: -21px;"  >
              <v-layout row wrap  style="margin-right: -30px;">
               <v-flex v-show="isShowingRef" xs4>

                  <div class="headline" >{{  scavengeReceiverPressureData.reference }}</div>

                  <span class="grey--text"> Reference  </span>
               </v-flex>


                <v-flex v-if="isShowingRef"  xs8 style="margin-top: -40px">
                    <canvas id="dot-chart-scav-4" @click="isShowingRef ^= true"></canvas>
                </v-flex>
                <v-flex v-else  xs12>
                     <canvas id="dot-chart-scav-4"  @click="isShowingRef ^= true"  ></canvas>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-actions>
        </div>

    </v-responsive>
</template>

<script>
    import DxButton from 'devextreme-vue/button';
    import Chart    from 'chart.js'

    export default {
      name: "ScavengeReceiverPressure",
      components: {DxButton,},
      props: {
        scavengeReceiverPressureData: {
          type: Object,
        },
        counter: Number,
      },
      data: function () {
        return {
          isShowingRef: true,
          loading: true,
        }
      },
      computed: {
        forchartrender: function() {
         return  this.scavengeReceiverPressureData.datapoints.labels;
        },
        dotsChartData: function () {
          return {
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
              }, {
                // label: 'pressure',
                data: this.scavengeReceiverPressureData.datapoints.value,
                pointBackgroundColor: 'white',
                pointRadius: 1,
                fill: false,
                showLine: true
              }, {
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
                      callback: function (value, index, values) {
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
                display: false,
              },
            }
          }
        }
      },
      methods: {
        updateScaleChart(v) {
          if (v==1){
            this.mychart8.options.scales.yAxes[0].display = false;
            this.mychart8.options.scales.xAxes[0].display = false;
          }
          else {
            this.mychart8.options.scales.yAxes[0].display = true;
            this.mychart8.options.scales.xAxes[0].display = true;
            this.mychart8.options.scales.xAxes[0].ticks.maxTicksLimit = 3;
          }
        },
        createChart8(chartId, data) {
          const ctx = document.getElementById(chartId);
          this.mychart8 = new Chart(ctx, data);
        }
      },
      mounted() {
          this.loading = false;
          this.$watch('isShowingRef', function (newVal,) {
            this.updateScaleChart(newVal);
          });
          this.$watch('forchartrender', function () {
            if (this.counter === 33) {
              this.createChart8('dot-chart-scav-4', this.dotsChartData);
            } else {
              this.mychart8.destroy();
              this.isShowingRef = true;
              this.createChart8('dot-chart-scav-4', this.dotsChartData);
            }
          });


      }
    }
</script>

<style scoped>

</style>

