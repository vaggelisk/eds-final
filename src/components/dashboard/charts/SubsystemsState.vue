<template>
    <v-responsive>
      <v-card-title primary class="title"> Subsystems State </v-card-title>

      <v-container >
        <v-layout row wrap>
          <v-flex  xs6>

            <v-btn block color="secondary" dark> Servo Oil </v-btn>
              <hr :style="'height:8px; border:none; color:' + colorServoOil + '; background-color:' + colorServoOil +'; width:' + colorsSubsystemServoOil[0]*100 + '%;'" />

          </v-flex>

          <v-flex xs6>
            <v-btn block color="secondary" dark> Fuel Injection</v-btn>
            <!--<v-divider style="height:20px;color:white;"></v-divider>-->
            <!--<hr style="size:100px; color:green" />-->
            <hr :style="'height:8px; border:none; color:' + colorFuelInjection + '; background-color:' + colorFuelInjection +'; width:' + colorsSubsystemFuelInjection[0]*100+ '%;' " />
          </v-flex>

        </v-layout>

        <v-layout row wrap>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Scavenge Air </v-btn>
            <hr :style="'height:8px; border:none; color:' + colorScavengeAir + '; background-color:' + colorScavengeAir +'; width:' + colorsSubsystemScavengeAir[0]*100+ '%;' " />

          </v-flex>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Exhaust Gas </v-btn>
            <hr :style="'height:8px; border:none; color:' + colorExhaustGas + '; background-color:' + colorExhaustGas +'; width:' + colorsSubsystemExhaustGas[0]*100+ '%;' " />

          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex  xs12>
            <v-btn block color="secondary" dark> Piston Running </v-btn>
            <hr :style="'height:8px; border:none; color:' + colorPistonRunning + '; background-color:' + colorPistonRunning +'; width:' + colorsSubsystemPistonRunning[0]*100+ '%;' " />

          </v-flex>

        </v-layout>

        <v-layout row wrap>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Bearings </v-btn>
            <hr style="height:8px;border:none;color:green;background-color:green;" />

          </v-flex>
          <v-flex  xs6>
            <v-btn block color="secondary" dark> Automation & Control</v-btn>
            <hr :style="'height:8px; border:none; color:' + colorAutomationControl + '; background-color:' + colorAutomationControl +'; width:' + colorsSubsystemAutomationControl[0]*100+ '%;' " />

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
      props: {
        colorsSubsystemServoOil: Array,
        colorsSubsystemFuelInjection: Array,
        colorsSubsystemScavengeAir: Array,
        colorsSubsystemExhaustGas: Array,
        colorsSubsystemPistonRunning: Array,
        colorsSubsystemAutomationControl: Array,
      },
      data() {
        return {
          colorServoOil: "",
          colorFuelInjection: "",
          colorScavengeAir: "",
          colorExhaustGas: "",
          colorPistonRunning: "",
          colorAutomationControl: "",
        }
      },

      mounted () {
        if (this.colorsSubsystemServoOil[1]===0){
          this.colorServoOil = "green" ;
        } else if (this.colorsSubsystemServoOil[1]===10 ){
          this.colorServoOil = "orange" ;
        } else {
          this.colorServoOil = "red" ;
        }
        if (this.colorsSubsystemFuelInjection[1]===0){
          this.colorFuelInjection = "green" ;
        } else if (this.colorsSubsystemFuelInjection[1]===10 ){
          this.colorFuelInjection = "orange" ;
        } else {
          this.colorFuelInjection = "red" ;
        }
        if (this.colorsSubsystemScavengeAir[1]===0){
          this.colorScavengeAir = "green" ;
        } else if (this.colorsSubsystemScavengeAir[1]===10 ){
          this.colorScavengeAir = "orange" ;
        } else {
          this.colorScavengeAir = "red" ;
        }
        if (this.colorsSubsystemExhaustGas[1]===0){
          this.colorExhaustGas = "green" ;
        } else if (this.colorsSubsystemExhaustGas[1]===10 ){
          this.colorExhaustGas = "orange" ;
        } else {
          this.colorExhaustGas = "red" ;
        }
        if (this.colorsSubsystemPistonRunning[1]===0){
          this.colorPistonRunning = "green" ;
        } else if (this.colorsSubsystemPistonRunning[1]===10 ){
          this.colorPistonRunning = "orange" ;
        } else {
          this.colorPistonRunning = "red" ;
        }
        if (this.colorsSubsystemAutomationControl[1]===0){
          this.colorAutomationControl = "green" ;
        } else if (this.colorsSubsystemAutomationControl[1]===10 ){
          this.colorAutomationControl = "orange" ;
        } else {
          this.colorAutomationControl = "red" ;
        }
        this.$watch('colorsSubsystemServoOil', function(newVal) {
          if (newVal[1]===0){
            this.colorServoOil = "green" ;
          } else if (newVal[1]===10 ){
            this.colorServoOil = "orange" ;
          } else {
            this.colorServoOil = "red" ;
          }
        }, {deep:true});
        this.$watch('colorsSubsystemFuelInjection', function(newVal) {
          if (newVal[1]===0){
            this.colorFuelInjection = "green" ;
          } else if (newVal[1]===10 ){
            this.colorFuelInjection = "orange" ;
          } else {
            this.colorFuelInjection = "red" ;
          }
        }, {deep:true});
        this.$watch('colorsSubsystemScavengeAir', function(newVal) {
            if (newVal[1]===0){
              this.colorScavengeAir = "green" ;
            } else if (newVal[1]===10 ){
              this.colorScavengeAir = "orange" ;
            } else {
              this.colorScavengeAir = "red" ;
            }
          }, {deep:true});
        this.$watch('colorsSubsystemExhaustGas', function(newVal) {
            if (newVal[1]===0){
              this.colorExhaustGas = "green" ;
            } else if (newVal[1]===10 ){
              this.colorExhaustGas = "orange" ;
            } else {
              this.colorExhaustGas = "red" ;
            }
          }, {deep:true});
        this.$watch('colorsSubsystemPistonRunning', function(newVal) {
          if (newVal[1]===0){
            this.colorPistonRunning = "green" ;
          } else if (newVal[1]===10 ){
            this.colorPistonRunning = "orange" ;
          } else {
            this.colorPistonRunning = "red" ;
          }
        }, {deep:true});
        this.$watch('colorsSubsystemPistonRunning', function(newVal) {
          if (newVal[1]===0){
            this.colorAutomationControl = "green" ;
          } else if (newVal[1]===10 ){
            this.colorAutomationControl = "orange" ;
          } else {
            this.colorAutomationControl = "red" ;
          }
        }, {deep:true});
      }
    }
</script>

<style scoped>

</style>
