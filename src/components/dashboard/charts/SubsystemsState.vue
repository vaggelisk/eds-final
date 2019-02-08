<template>    
    <v-card style="height: 100%; width : 100%; background-color: rgb(42,42,42);">
      <v-card-title  style="height: 10%; width : 100%;" primary class="title"> Subsystems State </v-card-title>

      <v-card-actions style="height: 90%; width : 100%;">
         <v-container fluid grid-list-md style="height: 100%; width : 100%;">
          <v-layout column  style="height: 100%; width : 100%;">
            <v-flex d-flex md4>
              <v-layout row >
                <v-flex md6>
                  <v-layout column  style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Servo Oil </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorServoOil + '; background-color:' + colorServoOil +'; width:' + colorsSubsystemServoOil[0]*100 + '%;'" />
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex md6>
                  <v-layout column  style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Fuel Injection </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorFuelInjection + '; background-color:' + colorFuelInjection +'; width:' + colorsSubsystemFuelInjection[0]*100+ '%;' " />
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex d-flex md4>
              <v-layout row >
                <v-flex md6>
                  <v-layout column  style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Scavenge Air </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorScavengeAir + '; background-color:' + colorScavengeAir +'; width:' + colorsSubsystemScavengeAir[0]*100+ '%;' " />
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex md6>
                  <v-layout column  style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Exhaust Gas </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorExhaustGas + '; background-color:' + colorExhaustGas +'; width:' + colorsSubsystemExhaustGas[0]*100+ '%;' " />
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex d-flex md4>
              <v-layout row >
                <v-flex md6>
                  <v-layout column  style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Piston Running </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorPistonRunning + '; background-color:' + colorPistonRunning +'; width:' + colorsSubsystemPistonRunning[0]*100+ '%;' " />
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex md6>
                  <v-layout column  style="height: 100%; width : 100%;">
                    <v-flex md10>
                      <v-btn flat class="subSysBtn" @mouseover="hoverButton" @mouseout="leaveButton"> Automation & Control </v-btn>
                    </v-flex>
                    <v-flex md2>
                      <div :style="'height:4px; border:none; color:' + colorAutomationControl + '; background-color:' + colorAutomationControl +'; width:' + colorsSubsystemAutomationControl[0]*100+ '%;' " />                  
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>  
        </v-container>
      
      </v-card-actions>

     

    </v-card>
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
          this.colorServoOil = "rgb(60, 171, 48)" ;
        } else if (this.colorsSubsystemServoOil[1]===10 ){
          this.colorServoOil = "rgb(255, 184, 29)" ;
        } else {
          this.colorServoOil = "rgb(205, 57, 64)" ;
        }
        if (this.colorsSubsystemFuelInjection[1]===0){
          this.colorFuelInjection = "rgb(60, 171, 48)" ;
        } else if (this.colorsSubsystemFuelInjection[1]===10 ){
          this.colorFuelInjection = "rgb(255, 184, 29)" ;
        } else {
          this.colorFuelInjection = "rgb(205, 57, 64)" ;
        }
        if (this.colorsSubsystemScavengeAir[1]===0){
          this.colorScavengeAir = "rgb(60, 171, 48)" ;
        } else if (this.colorsSubsystemScavengeAir[1]===10 ){
          this.colorScavengeAir = "rgb(255, 184, 29)" ;
        } else {
          this.colorScavengeAir = "rgb(205, 57, 64)" ;
        }
        if (this.colorsSubsystemExhaustGas[1]===0){
          this.colorExhaustGas = "rgb(60, 171, 48)" ;
        } else if (this.colorsSubsystemExhaustGas[1]===10 ){
          this.colorExhaustGas = "rgb(255, 184, 29)" ;
        } else {
          this.colorExhaustGas = "rgb(205, 57, 64)" ;
        }
        if (this.colorsSubsystemPistonRunning[1]===0){
          this.colorPistonRunning = "rgb(60, 171, 48)" ;
        } else if (this.colorsSubsystemPistonRunning[1]===10 ){
          this.colorPistonRunning = "rgb(255, 184, 29)" ;
        } else {
          this.colorPistonRunning = "rgb(205, 57, 64)" ;
        }
        if (this.colorsSubsystemAutomationControl[1]===0){
          this.colorAutomationControl = "rgb(60, 171, 48)" ;
        } else if (this.colorsSubsystemAutomationControl[1]===10 ){
          this.colorAutomationControl = "rgb(255, 184, 29)" ;
        } else {
          this.colorAutomationControl = "rgb(205, 57, 64)" ;
        }
        this.$watch('colorsSubsystemServoOil', function(newVal) {
          if (newVal[1]===0){
            this.colorServoOil = "rgb(60, 171, 48)" ;
          } else if (newVal[1]===10 ){
            this.colorServoOil = "rgb(255, 184, 29)" ;
          } else {
            this.colorServoOil = "rgb(205, 57, 64)" ;
          }
        }, {deep:true});
        this.$watch('colorsSubsystemFuelInjection', function(newVal) {
          if (newVal[1]===0){
            this.colorFuelInjection = "rgb(60, 171, 48)" ;
          } else if (newVal[1]===10 ){
            this.colorFuelInjection = "rgb(255, 184, 29)" ;
          } else {
            this.colorFuelInjection = "rgb(205, 57, 64)" ;
          }
        }, {deep:true});
        this.$watch('colorsSubsystemScavengeAir', function(newVal) {
            if (newVal[1]===0){
              this.colorScavengeAir = "rgb(60, 171, 48)" ;
            } else if (newVal[1]===10 ){
              this.colorScavengeAir = "rgb(255, 184, 29)" ;
            } else {
              this.colorScavengeAir = "rgb(205, 57, 64)" ;
            }
          }, {deep:true});
        this.$watch('colorsSubsystemExhaustGas', function(newVal) {
            if (newVal[1]===0){
              this.colorExhaustGas = "rgb(60, 171, 48)" ;
            } else if (newVal[1]===10 ){
              this.colorExhaustGas = "rgb(255, 184, 29)" ;
            } else {
              this.colorExhaustGas = "rgb(205, 57, 64)" ;
            }
          }, {deep:true});
        this.$watch('colorsSubsystemPistonRunning', function(newVal) {
          if (newVal[1]===0){
            this.colorPistonRunning = "rgb(60, 171, 48)" ;
          } else if (newVal[1]===10 ){
            this.colorPistonRunning = "rgb(255, 184, 29)" ;
          } else {
            this.colorPistonRunning = "rgb(205, 57, 64)" ;
          }
        }, {deep:true});
        this.$watch('colorsSubsystemPistonRunning', function(newVal) {
          if (newVal[1]===0){
            this.colorAutomationControl = "rgb(60, 171, 48)" ;
          } else if (newVal[1]===10 ){
            this.colorAutomationControl = "rgb(255, 184, 29)" ;
          } else {
            this.colorAutomationControl = "rgb(205, 57, 64)" ;
          }
        }, {deep:true});
      },
      methods:
      {
        hoverButton(event)
        {
          event.srcElement.classList.add("subSysBtnHover");
        }, 
        leaveButton(event)
        {
          event.srcElement.classList.remove("subSysBtnHover");
        }
      }
    }
</script>

<style scoped>
.subSysBtn
{
  height:100%;
  width:100%;
  text-transform: none !important;  
  font-size: 25px;  
  font-style: normal;  
}
.subSysBtnHover
{
   background-color:rgb(0,0,0); 
}
</style>
