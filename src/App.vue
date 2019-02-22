<template>
  <v-app dark style="background-color:rgb(26,26,26);">

    <Navigate
      v-bind:selected="selectedN"
      v-on:update:selected="selectedN = $event"
      />

    <v-toolbar extended app>

        <v-container >
          <v-layout row   >

            <div :style="'border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px;' "></div>
            <div>
              <span class="grey--text">RPM </span>
              <div class="headline">
                <h3 >71</h3>
              </div>
            </div>


            <div :style="'border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px; margin-left:30px' "></div>
            <div>
              <span class="grey--text">Shaft Power </span>
              <div class="headline">
                <h3 >6722 kW</h3>
              </div>
            </div>
            <div :style="'border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px; margin-left:30px' "></div>
            <div>
              <span class="grey--text">Load </span>
              <div class="headline">
                <h3 >68%</h3>
              </div>
            </div>
            <div :style="'border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px; margin-left:30px' "></div>
            <div>
              <span class="grey--text">Fuel Type </span>
              <div class="headline">
                <h3 >-</h3>
              </div>
            </div>

            <div :style="'border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px; margin-left:30px' "></div>
            <div>
              <span class="grey--text">Engine State </span>
              <div class="headline">
                <h3 >Running</h3>
              </div>
            </div>

            <div :style="'border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px; margin-left:30px' "></div>
            <div>
                <span class="grey--text">Diagnostics </span>
              <div class="headline">
                <h3 >ON</h3>
              </div>
            </div>
            <div :style="'border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px; margin-left:30px' "></div>
            <div>
              <span class="grey--text">Engine KPI </span>
              <div class="headline">
                <h3 >97%</h3>
              </div>
            </div>

            <v-spacer></v-spacer>

            <div>
              <span class="grey--text headline">VESSEL: </span><span class="white--text headline"> MV Stingay</span>
            </div>

            <div :style="'border-left:3px solid rgb(92, 92, 92);height:30px; margin-right:10px; margin-left:30px' "></div>
            <div>
              <span class="grey--text headline">ENGINE: </span><span class="white--text headline"> WX6X62</span>

              <div class="mt-3">
              <span class="mr-1 ml-4 " >
                <img height="50" src="./assets/logo3.png" alt="" >
              </span>
              </div>

            </div>



          </v-layout>
        </v-container>

      <v-toolbar-title slot="extension" class="cyan--text display-1 mt-3">Dashboard</v-toolbar-title>


    </v-toolbar>

    <v-content>
      {{selected}}
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import Navigate    from './components/Navigate'

export default {
  components: {
    Navigate
  },
  beforeCreate() {
     this.selected = 'dashboard';
  },
  data () {
    return {
      lorem: 'jfhgffhjghjjfh',
      // selected: 'dashboard',
    }
  },
  computed: {
    // selected() {
    //   return ;
    // }
  },

  name: 'App'
}
</script>
<style scoped>


</style>
