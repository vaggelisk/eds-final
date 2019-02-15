<template>
  <v-tabs
    dark
    slider-color="yellow"
  >

    <v-tab
      v-for="n in 2"
      :key="n"
      ripple
    >
      <span v-if="n===1" > Spare Parts / Maint. Tasks </span>
      <span v-if="n===2" > Spare Parts Catalogue </span>
    </v-tab>

    <v-tab-item
      v-for="n in 2"
      :key="n"
    >

        <span v-if="n===1" >
          <spare-parts-maint-tasks />
          <!--<span  v-if="troubleshootingData.currentFaults">-->
            <!--<CurrentFaults-->
              <!--v-bind:current-faults="troubleshootingData.currentFaults" />-->
            <!--</span>-->
        </span>
      <span v-if="n===2" flat>
          <spare-parts-catalogue />
        </span>
    </v-tab-item>


  </v-tabs>
</template>

<script>
    import SparePartsCatalogue from "./spareParts/SparePartsCatalogue";
    import SparePartsMaintTasks from "./spareParts/SparePartsMaintTasks";

    export default {
      name: "SpareParts",
      components: {SparePartsMaintTasks, SparePartsCatalogue}
    }
</script>

<style scoped>

</style>
