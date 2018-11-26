<template>
    <v-responsive>
        <div v-if='loading'>Loading...</div>
        <v-card-title primary class="title"> {{ compressionPressureDataC.Title }} </v-card-title>

        <v-card-title primary-title>
            <v-divider class="mx-3" vertical></v-divider>
            <div>
                <div class="headline">{{compressionPressureDataC.Value.toFixed(2)}}</div>
                <span class="grey--text">Measured [{{compressionPressureData.Unit}}] </span>
            </div>
        </v-card-title>
            <v-container >
              <v-layout row wrap>
               <v-flex xs4>

                  <div class="headline" >{{compressionPressureDataC.Ref.toFixed(2)}}</div>
                  <span class="grey--text"> Reference  </span>
               </v-flex>

                <v-flex xs8>
                  <dx-button id="myButton" :text='text'/>
                </v-flex>

              </v-layout>
            </v-container>

    </v-responsive>

</template>

<script>
    import DxButton from 'devextreme-vue/button';
    // import Chart             from 'chart.js'

    export default {
        name: "CompressionDots",
        components: {DxButton,},
        props: ['childCompressionDataLoaded', 'compressionPressureData'],
        data: function () {
            return {
                text: "hey mate",
                loading: true,
                compressionPressureDataC: this.compressionPressureData,
                dotsChartData: {
                    type: 'doughnut',
                    data: {
                        labels: ['State',],
                        datasets: [
                            {
                                label: 'Compression Pressure',
                                backgroundColor: ['green',],
                                data: [40,],
                            }
                        ]
                    }
                }
            }
        },

            mounted() {
                this.loading = false;



                // this.createChart('doughnut-chart', this.doughnutChartData);

        }
    }
</script>

<style scoped>
  #myButton {
    color: red;
    background-color: blueviolet;
  }

</style>
