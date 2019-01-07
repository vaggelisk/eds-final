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
                            <FiringPressure />
                          </v-responsive>


                        </v-card>
                      </v-flex>
                    </v-layout>


                    <v-layout row wrap>
                      <v-flex  >
                      <v-card >
                        <v-card-text>{{ lorem  + lorem  }} </v-card-text>
                      </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                </v-layout>

                <v-layout v-if="n===2" row wrap
                  dark
                >
                  <v-flex>
                    <v-card>
                      <v-card-text>{{ lorem + lorem + lorem + lorem + lorem }} </v-card-text>
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
              <v-flex
                v-for="n in 4"
                :key="n"
                d-flex
                xs12 md3
              >
                <v-card
                  dark
                >
                  <v-card-text>{{ lorem   }}</v-card-text>
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
                <v-card
                  dark
                >
                  <v-card-text>{{ lorem + lorem + lorem }}</v-card-text>
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
    import FiringPressure from "./detailedView/FiringPressure";
    export default {
      name: "Detailed-View",
      components: {FiringPressure},
      data: function () {
        return {
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
        }
      }
    }
</script>

<style scoped>

</style>
