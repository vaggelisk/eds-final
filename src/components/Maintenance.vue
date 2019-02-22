<template>
  <v-container fluid grid-list-md>
    <v-layout row >
      <v-flex>
        <PlannedMaintenanceTasks />
      </v-flex>
    </v-layout>


  </v-container>
</template>

<script>

import PlannedMaintenanceTasks from "./maintenance/PlannedMaintenanceTasks";


export default {
  name: "Maintenance",
  components: {  PlannedMaintenanceTasks },
}
</script>

<style scoped>

</style>
