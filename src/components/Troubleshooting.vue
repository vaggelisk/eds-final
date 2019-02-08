<template>
  <div>
    <v-tabs
      dark
      slider-color="yellow"
    >

      <v-tab
        v-for="n in 2"
        :key="n"
        ripple
      >
        <span v-if="n===1" > Current Faults </span>
        <span v-if="n===2" > Past Faults </span>
      </v-tab>

      <v-tab-item
        v-for="n in 2"
        :key="n"
      >

        <span v-if="n===1" >
          <span  v-if="troubleshootingData.currentFaults">
            <CurrentFaults
                v-bind:current-faults="troubleshootingData.currentFaults" />
            </span>
        </span>
        <span v-if="n===2" flat>

        </span>
      </v-tab-item>


    </v-tabs>
  </div>
</template>

<script>
    import CurrentFaults        from "./troubleshooting/CurrentFaults";
    import {getTroubleshooting} from "../api/getTroubleshooting";

    export default {
      name: "Troubleshooting",
      components: {CurrentFaults},
      data() {
        return {
          troubleshootingData: {},
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
          counter: 3,
        }
      },
      methods: {
        startInterval: function () {
          this.interval = setInterval(() => {
            if (this.counter < 60) {
              this.getTroubleshootingData( this.counter );
              this.counter = this.counter + 1;
            } else {
              clearInterval(this.interval);
            }
          }, 3000)
        },
        getTroubleshootingData( counter ) {
          const apiService = new getTroubleshooting( counter );
          apiService.getDataFromEvents().then((data) => {
            this.$set( this.troubleshootingData, 'currentFaults',  data.data.currentFaults);
          });
        }
      },
      mounted() {
        this.getTroubleshootingData(3);
        this.startInterval();
      },
    }
</script>

<style scoped>

</style>
