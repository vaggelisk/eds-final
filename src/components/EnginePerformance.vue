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
        <span v-if="n===1" @click="currentItem='Cylinder Performance'"> Overview </span>
        <span v-if="n===2" @click="currentItem='Cylinder Performance'"> Detailed View </span>
        <span v-if="n===3" @click="currentItem='Cylinder Performance'"> T/C Performance </span>



      </v-tab>

      <v-tab >
        <v-menu
          v-if="more.length"
          bottom
          class="v-tabs__div"
          left
        >
          <a slot="activator" class="v-tabs__item" >
            {{currentItem}}
            <v-icon>arrow_drop_down</v-icon>
          </a>

          <v-list dark >
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
        v-for="n in 3"
        :key="n"
      >

        <div v-if="n===1" >
          <Overview />
        </div>
        <div v-if="n===2" flat>
          <DetailedView />
        </div>

        <div v-if="n===3" flat>
          <TcPerformance />
        </div>
      </v-tab-item>

      <v-tab-item
        v-for="m in more"
        :key="m"    >

        <h3>{{currentItem}}</h3>
            <CylinderPerformance v-if="currentItem!=='Cylinder Performance'"
                v-bind:detailedViewData="detailedViewData"
                v-bind:counter2="counter"
                v-bind:currentItem="currentItem"
            />


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
        currentItem: 'Cylinder Performance',
        tab: null,
        detailedViewData: {
          'firingPressure':      { 'arrangements': {}, 'values': []},
          'compressionPressure': { 'arrangements': {}, 'values': [] },
          'indicatedPressure':   { 'arrangements': {}, 'values': [] },
          'exhaustedTemp':       { 'arrangements': {}, 'values': [] },
          'pressureRise':        { 'arrangements': {}, 'values': [] },
          'pressureTrace':       {
            'sourcesInfo' : [], 'sources': [], 'sources2': [], 'sources3': [],
          },
        },
        items: [
          'overview', 'detailed view',  't/c performance',
        ],
        more: [
          'Cylinder 1', 'Cylinder 2', 'Cylinder 3', 'Cylinder 4', 'Cylinder 5', 'Cylinder 6',
        ],
      }
    },
    methods: {
      addItem (item) {
        this.$nextTick(() => { this.currentItem =  item })
      }
    }
  }

</script>

<style scoped>

</style>
