<template>
    <v-responsive>
      <v-card-title primary class="title"> Subsystems State </v-card-title>

      <v-container >
        <v-layout row wrap>
          <v-flex  xs6>

            <v-btn block color="secondary" dark> Servo Oil </v-btn>

          </v-flex>

          <v-flex xs6>
            <v-btn block color="secondary" dark> Fuel Injection</v-btn>
          </v-flex>

        </v-layout>

        <v-layout row wrap>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Scavenge Air</v-btn>
          </v-flex>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Exhaust Gas </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex  xs12>
            <v-btn block color="secondary" dark> Piston Running </v-btn>
          </v-flex>

        </v-layout>

        <v-layout row wrap>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Bearings </v-btn>
          </v-flex>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Automation & Control</v-btn>
          </v-flex>
        </v-layout>

      </v-container>

    </v-responsive>
</template>

<script>
    export default {
        name: "SubsystemsState"
    }
</script>

<style scoped>

</style>
