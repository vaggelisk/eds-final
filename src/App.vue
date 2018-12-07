<template>
  <v-app dark>

    <Navigate/>

    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light"> Platform </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

        <span class="mr-1">
          <img height="50" src="./assets/logo3.png" alt="" >
        </span>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>


    <v-footer :fixed="fixed" app>
      <span> &copy; 2018 Propulsion Analytics</span>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld  from './components/HelloWorld'
import Dashboard   from './components/Dashboard'
import Navigate    from './components/Navigate'
import CommitChart from './components/CommitChart'

export default {
  components: {


    HelloWorld,
    Dashboard,
    Navigate,
    CommitChart
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
