<template>
  <v-app dark style="background-color:rgb(26,26,26);">

    <Navigate/>

    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light"> Web Platform </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

        <span class="mr-1">
          <img height="50" src="./assets/logo3.png" alt="" >
        </span>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import Dashboard   from './components/Dashboard'
import Navigate    from './components/Navigate'

export default {
  components: {
    Navigate
  },
  data () {
    return {
      speedValue: 80,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'App'
}
</script>
<style scoped>


</style>
