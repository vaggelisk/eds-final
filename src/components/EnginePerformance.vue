<template>
  <div>
    <v-tabs
      dark
      slider-color="yellow"
    >

      <v-tab
        v-for="n in 3"
        :key="n"
        ripple
      >
        <span v-if="n===1"> Overview </span>
        <span v-if="n===2"> Detailed View </span>
        <span v-if="n===3"> T/C Performance </span>



      </v-tab>

      <v-tab>
        <v-menu
          v-if="more.length"
          bottom
          class="v-tabs__div"
          left
        >
          <a slot="activator" class="v-tabs__item">
            Cylinder Performance
            <v-icon>arrow_drop_down</v-icon>
          </a>

          <v-list class="grey darken-3">
            <v-list-tile
              v-for="item in more"
              :key="item"
              @click="addItem(item)"
            >
              {{ item }}
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-tab>

      <v-tab-item
        v-for="n in 4"
        :key="n"
      >

        <div v-if="n===1" >
          <Overview />
        </div>
        <div v-if="n===2" flat>
          <DetailedView  v-if="detailedViewData.exhaustedTemp.values"
                         v-bind:detailedViewData="detailedViewData"
                         v-bind:counter2="counter" />
        </div>
        <div v-if="n===3" flat>
          <TcPerformance />
        </div>



      </v-tab-item>
    </v-tabs>
  </div>



</template>

<script>


import Overview                from "./enginePerformance/Overview"
import DetailedView            from "./enginePerformance/DetailedView"
import TcPerformance           from "./enginePerformance/TcPerformance"
import CylinderPerformance     from "./enginePerformance/CylinderPerformance"
import {getEnginePerformance}  from "../api/getEnginePerformance";



export default {
  name: "EnginePerformance",
  components: {
    Overview,
    DetailedView,
    TcPerformance,
    CylinderPerformance,
  },
  data () {
    return {
      tab: null,
      detailedViewData: {
        'firingPressure': { 'arrangements': {}, 'values': []},
        'compressionPressure': { 'arrangements': {}, 'values': [] },
        'indicatedPressure': { 'arrangements': {}, 'values': [] },
        'exhaustedTemp': { 'arrangements': {}, 'values': [] },
      },
      items: [
        'overview', 'detailed view',  't/c performance',
      ],
      more: [
        'Cylinder 1', 'Cylinder 2', 'Cylinder 3', 'Cylinder 4', 'Cylinder 5', 'Cylinder 6'
      ],
      counter: 32,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    startInterval: function () {
      this.interval = setInterval(() => {
        if (this.counter < 37) {
          this.getDetailedViewData( this.counter );
          this.counter = this.counter + 1;
        } else {
          clearInterval(this.interval);
        }
      }, 3000)
    },
    getDetailedViewData( counter ) {
      const apiService = new getEnginePerformance( counter );
      apiService.getDataFromHybercube();

      // apiService = new getEnginePerformance( counter );
      apiService.getDataFromTimeline().then((data) => {
        this.$set( this.detailedViewData, 'firingPressure', data.data.Pmax );
        this.$set( this.detailedViewData, 'compressionPressure', data.data.Pcomp );
        this.$set( this.detailedViewData, 'indicatedPressure', data.data.imep );
        this.$set( this.detailedViewData, 'exhaustedTemp', data.data.Texh );
      });
    }
  },
  mounted() {
    this.startInterval();
  }
}

</script>

<style scoped>

</style>
