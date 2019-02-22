<template>
  <div>
    <v-tabs
      dark
      slider-color="cyan"
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

            <div v-if="troubleshootingData.currentFaults.length===0" class="display-2 mt-5 ml-5">
               There is no current fault for the moment
            </div>
            <div v-else>
            <CurrentFaults
                v-bind:current-faults="troubleshootingData.currentFaults" />
          </div>
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
  import {globalStore}    from "../main.js"

  export default {
    name: "Troubleshooting",
    components: {CurrentFaults},
    data() {
      return {
        troubleshootingData: {},
      }
    },
    computed: {
      counter: function () { return globalStore.counter; }
    },
    mounted() {
      this.setData();
    },
    watch:
    {
      counter : function(newCounter)
      {
        this.setData();
      }
    },
    methods: {
      setData: function() {
        console.log("troubleshooting  "+globalStore.counter);

        this.$set(this.troubleshootingData,'currentFaults', globalStore.events.aggrEvents);

      }

    },
  }
</script>

<style scoped>

</style>
