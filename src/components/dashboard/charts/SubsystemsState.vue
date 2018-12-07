<template>
    <v-responsive>
      <v-card-title primary class="title"> Subsystems State </v-card-title>

      <v-container >
        <v-layout row wrap>
          <v-flex  xs6>

            <v-btn block color="secondary" dark> Servo Oil </v-btn>
            <hr style="height:8px;border:none;color:green;background-color:green;" />

          </v-flex>

          <v-flex xs6>
            <v-btn block color="secondary" dark> Fuel Injection</v-btn>
            <!--<v-divider style="height:20px;color:white;"></v-divider>-->
            <!--<hr style="size:100px; color:green" />-->
            <hr style="height:8px;border:none;color:green;background-color:green;" />
          </v-flex>

        </v-layout>

        <v-layout row wrap>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Scavenge Air</v-btn>
            <hr style="height:8px;border:none;color:green;background-color:green;" />

          </v-flex>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Exhaust Gas </v-btn>
            <hr style="height:8px;border:none;color:green;background-color:green;" />

          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex  xs12>
            <v-btn block color="secondary" dark> Piston Running </v-btn>
            <hr style="height:8px;border:none;color:green;background-color:green;" />

          </v-flex>

        </v-layout>

        <v-layout row wrap>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Bearings </v-btn>
            <hr style="height:8px;border:none;color:green;background-color:green;" />

          </v-flex>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Automation & Control</v-btn>
            <hr style="height:8px;border:none;color:green;background-color:green;" />

          </v-flex>
        </v-layout>

      </v-container>

    </v-responsive>
</template>

<script>
    import DxButton from "devextreme-vue/button";

    export default {
      name: "SubsystemsState",
      components: {
        DxButton
      },
      foo: function(e) {
        // ...
      }
    }
</script>

<style scoped>

</style>
