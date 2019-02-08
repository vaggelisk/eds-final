<template>
    <v-card style="height: 250px; width : 100%; background-color: rgb(42,42,42);">
    <!-- <div v-if="loading">Loading...</div> -->
    <!--
      <v-card-title primary class="title"> {{ compressionPressureDataC.Title }} </v-card-title>
    -->
    <!-- <v-card-title primary class="title" style="height:20%;"> -->
      <v-select v-model="select" :items="items" flat  primary class="title" style="height:20%; padding:16px; margin:0px; "></v-select>
    <!-- </v-card-title> -->

    <v-card-title v-if="select === 'BSFC'" primary-title style="height:40%;">
      <!-- <v-divider class="mx-3" vertical></v-divider> -->
      <div style="border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px;"></div>
      <div>
        <div class="headline"><h2>-</h2></div>
        <span class="grey--text">Measured [gr/kWh] </span>
      </div>
    </v-card-title>

    <v-card-actions v-if="select === 'BSFC'" style="height:40%;">
      <v-container>
        <v-layout row wrap>
          <v-flex xs4>
            <div class="headline">
              {{ compressionPressureDataC.Ref.toFixed(2) }}
            </div>
            <span class="grey--text"> Reference </span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>

    <v-card-title v-if="select === 'Indicated Power'" primary-title style="height:40%;">
            <div style="border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px;"></div>
      <div>
        <div class="headline">
          <h2>{{ indiPowerData.Value.toFixed(0) }}</h2>
        </div>
        <span class="grey--text">Measured [kW] </span>
      </div>
    </v-card-title>

    <v-card-actions v-if="select === 'Indicated Power'" style="height:40%;">
      <v-container>
        <v-layout row wrap>
          <v-flex xs4>
            <div class="headline">{{ indiPowerData.Ref.toFixed(0) }}</div>
            <span class="grey--text"> Reference </span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>

    <v-card-title
      v-if="select === 'Indicated Main Effective Pressure'"
      primary-title style="height:40%;"
    >
            <div style="border-left:5px solid rgb(92, 92, 92);height:50px; margin-right:10px;"></div>
      <div>
        <div class="headline">
          <h2>{{ imepData.Value.toFixed(2) }}</h2>
        </div>
        <span class="grey--text">Measured [kW] </span>
      </div>
    </v-card-title>

    <v-card-actions v-if="select === 'Indicated Main Effective Pressure'" style="height:40%;">
      <v-container>
        <v-layout row wrap>
          <v-flex xs4>
            <div class="headline" v-if="imepData.Ref === -1000">-</div>
            <div class="headline" v-else>{{ imepData.Ref.toFixed(2) }}</div>
            <span class="grey--text"> Reference </span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import DxButton from "devextreme-vue/button";
import Chart from "chart.js";
import compressionDotsData from "./compression-dots-data";

export default {
  name: "Bsfc",
  components: { DxButton },
  props: {
    childBsfcDataLoaded: Boolean,
    bsfcData: Object,
    indiPowerData: Object,
    imepData: Object
  },
  data: function() {
    return {
      isShowing: true,
      select: "BSFC",
      items: ["BSFC", "Indicated Power", "Indicated Main Effective Pressure"],
      loading: false,
      compressionPressureDataC: this.bsfcData,
      dotsChartData: {
        type: "line",
        data: {
          labels: ["10:00", "10:10", "10:20", "10:30", "10:40"],
          datasets: [
            {
              label: "pressure",
              data: [3, 4, 1, 5, 6],
              pointBackgroundColor: "black",
              pointRadius: 1,
              fill: "+2",
              showLine: true
            },
            {
              // label: 'pressure',
              data: [5, 6, 1, 7, 8],
              pointBackgroundColor: "white",
              pointRadius: 1,
              fill: false,
              showLine: true
            },
            {
              // label: 'pressure',
              data: [7, 8, 1, 9, 10],
              pointBackgroundColor: "black",
              pointRadius: 1,
              fill: false,
              showLine: true
            }
          ]
        },
        options: {
          legend: {
            display: false
          }
        }
      }
    };
  },

  methods: {},
  mounted() {
    this.loading = false;
  }
};
</script>

<style scoped>
</style>
