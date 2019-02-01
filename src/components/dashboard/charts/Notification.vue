<template>  
    <v-card style="height: 100%; width : 100%; background-color: rgb(42,42,42);">
      <v-card-title primary class="title">Notification</v-card-title>
      <v-card-actions>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex md1>
              <v-avatar flat v-on:click="buttonClick" id="okButton" >
                <img alt=""> 
              </v-avatar>
            </v-flex>
            <v-flex d-flex md3>
              <div>ALL SYSTEMS NOMINAL</div>
            </v-flex>  
            <v-flex d-flex md1>
              <v-avatar flat v-on:click="buttonClick" id="warnButton" >
                <img alt=""> 
              </v-avatar>
            </v-flex>          
            <v-flex d-flex md3>
              <div>WARNINGS</div>
            </v-flex>
            <v-flex d-flex md1>
              <v-avatar flat v-on:click="buttonClick" id="alButton" >
                <img alt=""> 
              </v-avatar>
            </v-flex>
            <v-flex d-flex md3>
              <div>ALERTS</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-actions>
    </v-card>
</template>

<script>

  export default {
    name: "Notification",
    props: {
        status: Number
    },
    data: function () {
      return {       
        counter:1,
        alertActive:require('../../../assets/diagRed_dark.png'),
        alertInactive:require('../../../assets/al_inactive_dark.png'),
        warnActive:require('../../../assets/diagOrange_dark.png'),
        warnInactive:require('../../../assets/warn_inactive_dark.png'),
        okActive:require('../../../assets/diagGreen_dark.png'),
        okInactive:require('../../../assets/ok_inactive_dark.png')
      }
    },
    mounted() {
      document.getElementById("okButton").childNodes[0].src = this.okActive;
      document.getElementById("warnButton").childNodes[0].src = this.warnInactive;
      document.getElementById("alButton").childNodes[0].src = this.alertInactive;
    }, 
    watch:
    {
      status: function(newStatus)
      {
        if (newStatus == 0)
        {
            document.getElementById("okButton").childNodes[0].src = this.okActive;
            document.getElementById("warnButton").childNodes[0].src = this.warnInactive;
            document.getElementById("alButton").childNodes[0].src = this.alertInactive;
        }
        else 
        {
          document.getElementById("okButton").childNodes[0].src = this.okInactive;

          if (newStatus == 10)
          {
            document.getElementById("warnButton").childNodes[0].src = this.warnActive;
            document.getElementById("alButton").childNodes[0].src = this.alertInactive;
          }
          else
           {
            document.getElementById("warnButton").childNodes[0].src = this.warnInactive;
            document.getElementById("alButton").childNodes[0].src = this.alertActive;
          }
        }
      }
    },
  }


</script>

<style scoped></style>

