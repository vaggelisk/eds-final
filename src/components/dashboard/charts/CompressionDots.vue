<template>
    <v-responsive>
        <div v-if='loading'>Loading...</div>
        <v-card-title primary class="title"> {{ compressionPressureDataC.Title }} </v-card-title>

        <v-card-title v-show="isShowing" primary-title>
            <v-divider class="mx-3" vertical></v-divider>
            <div>
                <div class="headline">{{compressionPressureDataC.Value.toFixed(2)}}</div>
                <span class="grey--text">Measured [{{compressionPressureData.Unit}}] </span>
            </div>
        </v-card-title>

        <v-card-actions>
          <v-container >
            <v-layout row wrap>
             <v-flex v-show="isShowing" xs4>

                <div class="headline" >{{compressionPressureDataC.Ref.toFixed(2)}}</div>
                <span class="grey--text"> Reference  </span>
             </v-flex>

              <v-flex v-if="isShowing" xs8>
                <!--<dx-button id="myButton"  @click="isShowing ^= true" :text="text"/>-->
                <canvas id="dot-chart" @click="isShowing ^= true"></canvas>
              </v-flex>
              <v-flex v-else xs12>
                <!--<dx-button id="myButton"  @click="isShowing ^= true" :text="text"/>-->
                <canvas id="dot-chart" @click="isShowing ^= true" height="180" ></canvas>
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
        name: "CompressionDots",
        components: {DxButton,},
        props: ['childCompressionDataLoaded', 'compressionPressureData'],
        data: function () {
            return {
                isShowing: true,
                text: "Enlarge",
                loading: false,
                compressionPressureDataC: this.compressionPressureData,
                // dotsChartData : {type: null, datasets: Array, options: null},
                dotsChartData:
                  {
                    type: 'line',
                  data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
                      pointBackgroundColor: 'black',
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
        // computed: {
           // this.dotsChartData = Object.create(compressionDotsData),
           // this.dotsChartData.type = compressionDotsData.type;
           // this.dotsChartData.labels = compressionDotsData.labels;
           // this.dotsChartData.datasets = compressionDotsData.datasets;
           // this.dotsChartData.datasets[1] = compressionDotsData.datasets[1];
           // this.dotsChartData.datasets[2] = compressionDotsData.datasets[2];
        // },
        methods: {
          createChart2(chartId, data) {
            const ctx = document.getElementById(chartId);
            const myChart2 = new Chart(ctx, data);
          }
        },
        mounted() {
          this.loading = false;
          console.log(compressionDotsData.labels);
          this.createChart2('dot-chart', this.dotsChartData);

        }
    }
</script>

<style scoped>
  #myButton {
    color: red;
    background-color: blueviolet;
  }

</style>
