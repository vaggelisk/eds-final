<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md4>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex
                v-for="n in 2"
                :key="n"
                d-flex
                xs12
              >
                <v-card
                    dark
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>



      <v-flex d-flex xs12 sm6 md2>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex
                v-for="n in 4"
                :key="n"
                d-flex
                xs12
              >
                <v-card
                  dark
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex
                v-for="n in 4"
                :key="n"
                d-flex
                xs12
              >
                <v-card
                  dark
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>


      <v-flex d-flex xs12 sm6 md4>
        <v-card color="blue lighten-2" dark>
          <v-card-text>
            {{ lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem  + lorem + lorem }}

          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import {APIService}                from '../../api/getCardData';


  export default {
    name: "Overview",
    data: function () {
        return {
          overviewCardsData: {},
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
          counter: 32,
        }
    },
    methods: {
      startInterval: function () {
        this.interval = setInterval(() => {
          if (this.counter < 40) {
            this.getCardsData( this.counter );
            this.counter = this.counter + 1;
          } else {
            clearInterval(this.interval);
          }
        }, 3000)
      },
      getCardsData( counter ) {
        this.getScavengeReceiverPressure( counter );
      },
      getFiringPressure(){
        const apiService = new APIService("pmax");
        apiService.getCardStaticData().then((data) => {
          console.log(data.data.d.longName);
          this.$set( this.overviewCardsData, 'firingPressure', data.data.d);
          console.log( this.overviewCardsData.firingPressure.unit );
        })
      },
      getScavengeReceiverPressure( c ){
        const apiService = new APIService("pscav");
        this.$set( this.overviewCardsData, 'scavengeReceiverPressure', {});

        apiService.getCardStaticData().then((data) => {
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'unit', data.data.d.unit );
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'name', data.data.d.longName );

        });

        apiService.getCardDynamicData( c ).then((data) => {
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'value', data.data.d.value);
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'color', data.data.d.color);
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'reference', data.data.d.ref);
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'datapoints', data.data.d.datapoints);
        });
      },
    },
    mounted() {
      this.startInterval();
    },



  }
</script>

<style scoped>

</style>
