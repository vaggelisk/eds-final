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
                <v-card v-if="n===1"
                    dark
                >
                  <v-responsive>
                    <LoadDiagram />
                  </v-responsive>
                </v-card>
                <v-card v-if="n===2"
                    dark
                >
                  <v-responsive contain >
                    <EnergyBalanceReference />
                  </v-responsive>
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
                <v-card v-if="n===1"
                        dark
                >
                  <!--<v-responsive  contain >-->
                  <v-responsive  contain >
                    <ScavengeReceiverPressure v-if="overviewCardsData.scavengeReceiverPressure"
                      v-bind:scavengeReceiverPressureData="overviewCardsData.scavengeReceiverPressure"
                      v-bind:counter="counter"
                    />
                  </v-responsive>
                </v-card>
                <v-card v-if="n===2"
                        dark
                >
                  <v-responsive  contain >
                    <!--<BrakeMeanEffectivePressure v-if="overviewCardsData.brakeMeanEffectivePressure"-->
                                              <!--v-bind:brakeMeanEffectivePressureData="overviewCardsData.brakeMeanEffectivePressure"-->
                                              <!--v-bind:counter="counter"-->
                    <!--/>-->
                  </v-responsive>
                </v-card>
                <v-card v-if="n===3"
                        dark
                >
                  <v-responsive  contain >
                    <IndicatedPower   v-if="overviewCardsData.indicatedPower"
                                      v-bind:indicatedPowerData="overviewCardsData.indicatedPower"
                                      v-bind:counter="counter" />
                  </v-responsive>
                </v-card>
                <v-card v-if="n===4"
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
                <v-card v-if="n===1"
                  dark
                >
                  <v-responsive  contain >
                    <ExhaustReceiverPressure v-if="overviewCardsData.exhaustReceiverPressure"
                                             v-bind:exhaustReceiverPressureData="overviewCardsData.exhaustReceiverPressure"
                                             v-bind:counter="counter"
                    />
                  </v-responsive>
                </v-card>
                <v-card v-if="n===2"
                  dark
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
                <v-card v-if="n===3"
                  dark
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
                <v-card v-if="n===4"
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
        <v-card  dark>
          <v-card-text>
            <v-responsive contain>
              <OverviewPaneDiagrams />
            </v-responsive>


          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import {APIService}                from '../../api/getCardData';
  import ScavengeReceiverPressure    from "../enginePerformance/overview/ScavengeReceiverPressure";
  import ExhaustReceiverPressure     from "../enginePerformance/overview/ExhaustReceiverPressure";
  import BrakeMeanEffectivePressure  from "../enginePerformance/overview/BrakeMeanEffectivePressure";
  import IndicatedPower              from "../enginePerformance/overview/IndicatedPower";
  import EnergyBalanceReference      from "./overview/EnergyBalanceReference";
  import OverviewPaneDiagrams        from "./overview/OverviewPaneDiagrams";
  import LoadDiagram                 from "./overview/LoadDiagram";


  export default {
    name: "Overview",
    components: {
      LoadDiagram,
      OverviewPaneDiagrams,
      EnergyBalanceReference,
      ScavengeReceiverPressure,
      ExhaustReceiverPressure,
      BrakeMeanEffectivePressure,
      IndicatedPower
    },
    data: function () {
        return {
          overviewCardsData: {},
          childScavengeReceiverPressureDataLoaded: false,
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
          counter: 32,
        }
    },
    methods: {
      startInterval: function () {
        this.interval = setInterval(() => {
          if (this.counter < 36) {
            this.getCardsData( this.counter );
            this.counter = this.counter + 1;
          } else {
            clearInterval(this.interval);
          }
        }, 3000)
      },
      getCardsData( counter ) {
        this.getScavengeReceiverPressure( counter );
        this.getExhaustReceiverPressure( counter );
        this.getBrakeMeanEffectivePressure( counter );
        this.getIndicatedPower( counter );

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
        this.$set( this.overviewCardsData.scavengeReceiverPressure, 'datapoints', {});

        apiService.getCardStaticData().then((data) => {
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'unit', data.data.d.unit );
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'name', data.data.d.longName );

        });

        apiService.getCardDynamicData( c ).then((data) => {
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'value', data.data.d.value);
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'color', data.data.d.color);
          this.$set( this.overviewCardsData.scavengeReceiverPressure, 'reference', data.data.d.reference);
          this.$set( this.overviewCardsData.scavengeReceiverPressure.datapoints, 'value', data.data.d.datapoints.value);
          this.$set( this.overviewCardsData.scavengeReceiverPressure.datapoints, 'labels', data.data.d.datapoints.labels);
          this.$set( this.overviewCardsData.scavengeReceiverPressure.datapoints, 'valMin', data.data.d.datapoints.valMin);
          this.$set( this.overviewCardsData.scavengeReceiverPressure.datapoints, 'valMax', data.data.d.datapoints.valMax);
        });
      },
      getExhaustReceiverPressure( c ){
        const apiService = new APIService("pexh");
        this.$set( this.overviewCardsData, 'exhaustReceiverPressure', {});
        this.$set( this.overviewCardsData.exhaustReceiverPressure, 'datapoints', {});

        apiService.getCardStaticData().then((data) => {
          this.$set( this.overviewCardsData.exhaustReceiverPressure, 'unit', data.data.d.unit );
          this.$set( this.overviewCardsData.exhaustReceiverPressure, 'name', data.data.d.longName );

        });

        apiService.getCardDynamicData( c ).then((data) => {
          this.$set( this.overviewCardsData.exhaustReceiverPressure, 'value', data.data.d.value);
          this.$set( this.overviewCardsData.exhaustReceiverPressure, 'color', data.data.d.color);
          this.$set( this.overviewCardsData.exhaustReceiverPressure, 'reference', data.data.d.reference);
          this.$set( this.overviewCardsData.exhaustReceiverPressure.datapoints, 'value', data.data.d.datapoints.value);
          this.$set( this.overviewCardsData.exhaustReceiverPressure.datapoints, 'labels', data.data.d.datapoints.labels);
          this.$set( this.overviewCardsData.exhaustReceiverPressure.datapoints, 'valMin', data.data.d.datapoints.valMin);
          this.$set( this.overviewCardsData.exhaustReceiverPressure.datapoints, 'valMax', data.data.d.datapoints.valMax);
        });
      },
      getBrakeMeanEffectivePressure( c ){
        const apiService = new APIService("bmep");
        this.$set( this.overviewCardsData, 'brakeMeanEffectivePressure', {});
        this.$set( this.overviewCardsData.brakeMeanEffectivePressure, 'datapoints', {});

        apiService.getCardStaticData().then((data) => {
          this.$set( this.overviewCardsData.brakeMeanEffectivePressure, 'unit', data.data.d.unit );
          this.$set( this.overviewCardsData.brakeMeanEffectivePressure, 'name', data.data.d.longName );

        });

        apiService.getCardDynamicData( c ).then((data) => {
          this.$set( this.overviewCardsData.brakeMeanEffectivePressure, 'value', data.data.d.value);
          this.$set( this.overviewCardsData.brakeMeanEffectivePressure, 'color', data.data.d.color);
          this.$set( this.overviewCardsData.brakeMeanEffectivePressure, 'reference', data.data.d.reference);
          this.$set( this.overviewCardsData.brakeMeanEffectivePressure.datapoints, 'value', data.data.d.datapoints.value);
          this.$set( this.overviewCardsData.brakeMeanEffectivePressure.datapoints, 'labels', data.data.d.datapoints.labels);
          this.$set( this.overviewCardsData.brakeMeanEffectivePressure.datapoints, 'valMin', data.data.d.datapoints.valMin);
          this.$set( this.overviewCardsData.brakeMeanEffectivePressure.datapoints, 'valMax', data.data.d.datapoints.valMax);
        });
      },
      getIndicatedPower( c ){
          const apiService = new APIService("indiP");
          this.$set( this.overviewCardsData, 'indicatedPower', {});
          this.$set( this.overviewCardsData.indicatedPower, 'datapoints', {});

          apiService.getCardStaticData().then((data) => {
            this.$set( this.overviewCardsData.indicatedPower, 'unit', data.data.d.unit );
            this.$set( this.overviewCardsData.indicatedPower, 'name', data.data.d.longName );

          });

          apiService.getCardDynamicData( c ).then((data) => {
            this.$set( this.overviewCardsData.indicatedPower, 'value', data.data.d.value);
            this.$set( this.overviewCardsData.indicatedPower, 'color', data.data.d.color);
            this.$set( this.overviewCardsData.indicatedPower, 'reference', data.data.d.reference);
            this.$set( this.overviewCardsData.indicatedPower.datapoints, 'value', data.data.d.datapoints.value);
            this.$set( this.overviewCardsData.indicatedPower.datapoints, 'labels', data.data.d.datapoints.labels);
            this.$set( this.overviewCardsData.indicatedPower.datapoints, 'valMin', data.data.d.datapoints.valMin);
            this.$set( this.overviewCardsData.indicatedPower.datapoints, 'valMax', data.data.d.datapoints.valMax);
          });
      },
    },
    mounted() {
      this.startInterval();
      // this.childScavengeReceiverPressureDataLoaded = true;

    },



  }
</script>

<style scoped>

</style>
