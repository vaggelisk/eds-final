<template>
  <div>
    <v-tabs dark slider-color="white" v-model="active" >
      <v-tab v-for="title in tabTitles" :key="title" ripple>
        <span >{{title}}</span>
      </v-tab>
      <v-tab-item><ComponentOverview/></v-tab-item>
      <v-tab-item><ServoOil/></v-tab-item>
      <v-tab-item><FuelInjection/></v-tab-item>
      <v-tab-item><ScanevgeAir/></v-tab-item>
      <!-- <v-tab-item><GasAdmission/></v-tab-item> -->
      <v-tab-item><PistonRunning/></v-tab-item>
      <v-tab-item><Automation/></v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import Automation         from "./componentDiagnostics/automation"
  import ComponentOverview  from "./componentDiagnostics/componentOverview"
  import FuelInjection      from "./componentDiagnostics/fuelInjection"
  import GasAdmission       from "./componentDiagnostics/gasAdmission"
  import PistonRunning      from "./componentDiagnostics/pistonRunning"
  import ScanevgeAir        from "./componentDiagnostics/scavengeAir"
  import ServoOil           from "./componentDiagnostics/servoOil"

  export default {
    name: "ComponentDiagnostics",
    components: {
      Automation,
      ComponentOverview,
      FuelInjection,
      GasAdmission,
      PistonRunning,
      ScanevgeAir,
      ServoOil          
    },
    data () {
      return {
        active: null,
        tabTitles: [
          'OVERVIEW', 'SERVO OIL',  'FUEL INJECTION', 'EXHAUST GAS / SCAVENGE AIR',//'GAS ADMISSION', 
          'PISTON RUNNING', 'AUTOMATION & CONTROL'
        ],
        counter: 31
      }
    },
    methods: {
      startInterval: function () {
      this.interval = setInterval(() => {
        if (this.counter < 60) {
          // this.getEvents();
          // this.updateButtons();
          this.counter = this.counter + 1;
        } else {
          this.counter =1;
        }
      }, 5000)
      }
    },
    mounted() {
      this.startInterval();
    }
  }

</script>

<style scoped>

</style>
