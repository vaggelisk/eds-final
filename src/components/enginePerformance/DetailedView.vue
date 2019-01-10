<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md12>
        <v-layout row wrap>

          <v-flex d-flex >
            <v-layout row wrap>
              <v-flex
                v-for="n in 3"
                :key="n"
                d-flex
                xs12 md4
              >
                <v-layout v-if="n===1"
                  dark
                >
                  <v-flex >
                    <v-layout row wrap>
                      <v-flex >
                        <v-card>

                          <v-responsive contain>
                            <BarChart
                              v-if="detailedViewData.firingPressure.values"
                              v-bind:dataChart="detailedViewData.firingPressure"
                              v-bind:counter="counter2" />
                          </v-responsive>


                        </v-card>
                      </v-flex>
                    </v-layout>


                    <v-layout row wrap>
                      <v-flex  >
                      <v-card >

                        <v-responsive contain>
                          <BarChart
                            v-if="detailedViewData.compressionPressure.values"
                            v-bind:dataChart="detailedViewData.compressionPressure"
                            v-bind:counter="counter2" />
                        </v-responsive>

                      </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                </v-layout>

                <v-layout v-if="n===2" row wrap  dark >
                  <v-flex>
                    <v-card>

                      <v-responsive contain>
                        <LineChart />
                      </v-responsive>

                    </v-card>
                  </v-flex>
                </v-layout>


                <v-layout v-if="n===3"
                          dark
                >
                  <v-flex >
                    <v-layout row wrap>
                      <v-flex >
                        <v-card>
                          <v-card-text>{{ lorem  + lorem }} </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>


                    <v-layout row wrap>

                      <v-flex  d-flex xs12 sm6 md12 >

                        <v-layout row wrap >
                          <v-flex d-flex >
                            <v-card >
                              <v-card-text>{{ lorem  }} </v-card-text>
                            </v-card>
                          </v-flex>
                        </v-layout>

                        <v-layout row wrap >
                          <v-flex d-flex xs12 sm6 md12 >
                          <v-card >
                            <v-card-text>{{ lorem  }} </v-card-text>
                          </v-card>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                    </v-layout>
                  </v-flex>

                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md12>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>

              <v-flex xs12 md4>

                <v-card dark >
                  <v-responsive contain>
                    <BarChartTrial />
                  </v-responsive>
                </v-card>

              </v-flex>

              <v-flex xs12 md4>

                <v-card dark >
                  <v-responsive contain>
                    <BarChart
                      v-if="detailedViewData.indicatedPressure.values"
                      v-bind:dataChart="detailedViewData.indicatedPressure"
                      v-bind:counter="counter2" />
                  </v-responsive>
                </v-card>


              </v-flex>

              <v-flex
                v-for="n in 2"
                :key="n"
                d-flex
                xs12 md2
              >
                <v-card dark >

                  <v-card-text>{{ lorem  }}</v-card-text>

                </v-card>
              </v-flex>

            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md12>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex
                d-flex
                xs12 md4
              >
                <v-card dark>
                  <v-responsive contain>
                    <BarChart
                      v-if="detailedViewData.exhaustedTemp.values"
                      v-bind:dataChart="detailedViewData.exhaustedTemp"
                      v-bind:counter="counter2" />
                  </v-responsive>
                </v-card>
              </v-flex>
             <v-flex
                d-flex
                xs12 md8
              >
                <v-card
                  dark
                >
                  <v-card-text>{{ lorem + lorem + lorem }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>



  </v-container>
</template>

<script>
    import BarChart               from "./detailedView/BarChart";
    import BarChartTrial          from "./detailedView/BarChartTrial";
    import LineChart              from "./detailedView/LineChart"
    import {getEnginePerformance} from "../../api/getEnginePerformance";

    export default {
      name: "Detailed-View",
      components: {BarChart, LineChart, BarChartTrial},
      props: {
        detailedViewData: Object,
        counter2: Number,
      },
      data: function () {
        return {
          // detailedViewData: {
          //   'firingPressure': { 'arrangements': {}, 'values': []},
          //   'compressionPressure': { 'arrangements': {}, 'values': [] },
          //   'indicatedPressure': { 'arrangements': {}, 'values': [] },
          //   'exhaustedTemp': { 'arrangements': {}, 'values': [] },
          // },
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
          // counter2: 32,
        }
      },

      mounted() {
      }
    }
</script>

<style scoped>

</style>
