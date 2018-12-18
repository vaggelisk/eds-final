<template>
  <div>
    <v-tabs
      v-model="active"
      color="flat"
      dark
      slider-color="yellow"
    >
      <v-tab
        v-for="n in 4"
        :key="n"
        ripple
      >
        Item {{ n }}

      </v-tab>
      <v-tab-item
        v-for="n in 4"
        :key="n"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <div style="position: relative; top: 30%; left: 20%;">
      <h1>
      Welcome to Engine Performance
      </h1>
    </div>
  </div>
</template>

<script>
    export default {
        name: "EnginePerformance"
    }
</script>

<style scoped>

</style>
