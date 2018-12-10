<template>
  <v-container fluid grid-list-md>



    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-card dark>
          <v-card-title primary class="title"> Notification </v-card-title>
          <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4>
        <v-layout row wrap >
          <v-flex d-flex>
            <v-card  dark >
              <v-card-title primary class="title">
                Performance Parameters
              </v-card-title>
              <v-responsive v-if="childPerformanceParamDataLoaded" contain>
                <PerformanceBar v-bind:performanceParamData="performanceParamData"
                                v-bind:counter="counter"/>
              </v-responsive>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card   height="280px" dark>
          <v-responsive v-if="childEngineDataLoaded" contain>
            <EngineDoughnut v-bind:engineKpiData="engineKpiData"
                            v-bind:counter="counter" />
          </v-responsive>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2>
        <v-card dark>
          <!-- the above if is for loading data before make the card -->
          <!-- otherwise make th card without data -->
          <v-responsive v-if="childCompressionDataLoaded" contain>
            <CompressionDots
              v-bind:compressionPressureData="compressionPressureData"
              v-bind:counter="counter"
            />
          </v-responsive>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md4>
        <v-card dark height="400px">
          <v-responsive contain>
            <SubsystemsState />
          </v-responsive>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md6 child-flex>
        <v-card height="400px" dark>
          <v-responsive contain>
            <EngineState />
          </v-responsive>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childFiringPressureDataLoaded" contain dark>
          <FiringPressure v-bind:firingPressureData="firingPressureData"
                          v-bind:counter="counter" />
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childServoOilRailPressureDataLoaded" contain dark>
          <ServoOilRailPressure
            v-bind:servoOilRailPressureData="servoOilRailPressureData"
          />
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childFuelRailPressureDataLoaded" contain dark>
          <FuelRailPressure
            v-bind:fuelRailPressureData="fuelRailPressureData"
          />
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childTurbineInletTempDataLoaded" contain dark>
          <TurbineInletTemp
            v-bind:turbineInletTempData="turbineInletTempData"
          />
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childScavengeReceiverPressureDataLoaded" contain dark>
          <ScavengeReceiverPressure
            v-bind:scavengeReceiverPressureData="scavengeReceiverPressureData"
          />
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childLinerWallTemperatureDataLoaded" contain dark>
          <LinerWallTemperature
            v-bind:linerWallTemperatureData="linerWallTemperatureData"
          />
        </v-card>
      </v-flex>

       <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childBsfcDataLoaded" contain dark>

          <Bsfc
            v-bind:bsfcData="bsfcData"
            v-bind:counter="counter"
          />
        </v-card>
      </v-flex>



    </v-layout>



  </v-container>
</template>

<script>
import axios from "axios";
import CommitChart from "./CommitChart";
import DoughnutChart from "./dashboard/charts/DoughnutChart";
import PerformanceBar from "./dashboard/charts/PerformanceBar";
import EngineDoughnut from "./dashboard/charts/EngineDoughnut";
import CompressionDots from "./dashboard/charts/CompressionDots";
import Gauge from "./dashboard/charts/Gauge";
import EngineState from "./dashboard/charts/EngineState";
import FiringPressure from "./dashboard/charts/FiringPressure";
import FuelRailPressure from "./dashboard/charts/FuelRailPressure";
import TurbineInletTemp from "./dashboard/charts/TurbineInletTemp";
import ServoOilRailPressure from "./dashboard/charts/ServoOilRailPressure";
import ScavengeReceiverPressure from "./dashboard/charts/ScavengeReceiverPressure";
import LinerWallTemperature from "./dashboard/charts/LinerWallTemperature";
import Bsfc from "./dashboard/charts/Bsfc";
import SubsystemsState from "./dashboard/charts/SubsystemsState";
import LineChart from "./dashboard/charts/LineChart";

export default {
  name: "Dashboard",
  components: {
    CommitChart,
    DoughnutChart,
    PerformanceBar,
    EngineDoughnut,
    CompressionDots,
    Gauge,
    EngineState,
    FiringPressure,
    ServoOilRailPressure,
    FuelRailPressure,
    TurbineInletTemp,
    ScavengeReceiverPressure,
    LinerWallTemperature,
    Bsfc,
    SubsystemsState,
    LineChart,
  },
  data: function() {
    return {
      childCompressionDataLoaded: false,
      compressionPressureData: {},

      childPerformanceParamDataLoaded: false,
      performanceParamData: {},

      childEngineDataLoaded: false,
      engineKpiData: {},

      childFiringPressureDataLoaded: false,
      firingPressureData: {},

      childServoOilRailPressureDataLoaded: false,
      servoOilRailPressureData: {},

      childFuelRailPressureDataLoaded: false,
      fuelRailPressureData: {},

      childTurbineInletTempDataLoaded: false,
      turbineInletTempData: {},

      childScavengeReceiverPressureDataLoaded: false,
      scavengeReceiverPressureData: {},

      childLinerWallTemperatureDataLoaded: false,
      linerWallTemperatureData: {},

      childBsfcDataLoaded: false,
      bsfcData: {},

      lorem: `There is no Notification at the moment`,
      counter: 31,
      timer: '',
      myText: 0,
      avg: null,
      interval: null,
    };
  },
  computed: {
    opts: function() {
      return {responsive: true, maintainAspectRatio: false}
    },
    dataChart: function() {
      return {
        labels: ['January', 'February', 'March', 'April',],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39,]
          }
        ]
      }
    }
  },
  mounted() {
    this.fetchEventsList();
    this.startInterval();
  },
  watch: {
    opts: {
      handler(newVal, oldVal) {
        // triggered when anything is changed within the Object
        // console.log(newVal);
        // console.log(oldVal);
      },
      deep: true
    }
  },
  methods: {
    changeData: function() {
      this.dataChart = [6, 6, 3, 5]
    },

    startInterval: function () {
      this.interval = setInterval(() => {
        if (this.counter < 40) {
          this.fetchEventsList();
          this.counter = this.counter + 1;
        } else {
          clearInterval(this.interval);
        }
      }, 5000)
    },
    fetchEventsList: function() {

      let url  = "http://localhost:8092/EDSTimelineData/" + this.counter;

      axios.get(url).then(response => {
        let len = Object.keys(response.data).length;
        // console.log(len);
        let helperMatrix = response.data[Object.keys(response.data)[len - 1]];
        // console.log(response.data[Object.keys(response.data)[len - 1]]);
        let pmaxArray = helperMatrix.Pmax;
        let pmaxValuesArray = pmaxArray[0];
        let pmaxReferencesArray = pmaxArray[1];
        let sum = 0;
        for( let i = 0; i < pmaxValuesArray.length; i++ ){
          sum +=  pmaxValuesArray[i];
        }
        let avg = (pmaxValuesArray.length > 0) ?  sum/pmaxValuesArray.length : 0;

        let sumRef = 0;
        for( let i = 0; i < pmaxReferencesArray.length; i++ ){
          sumRef +=  pmaxReferencesArray[i];
        }
        let ref = (pmaxReferencesArray.length > 0) ?  sumRef/pmaxReferencesArray.length : 0;

        let min = pmaxArray[2];
        let max = pmaxArray[3];

        this.firingPressureData.Value = avg;
        this.firingPressureData.Ref = ref;

        let data = {"val": [], "valMin": [], "valMax": [], "labels": []};
        for (let j = 0; j < len; j++){

          let helper = response.data[Object.keys(response.data)[j]];
          pmaxArray = helper.Pmax;
          pmaxReferencesArray = pmaxArray[1];

          sum = 0;
          for( let i = 0; i < pmaxValuesArray.length; i++ ){
            sum +=  pmaxValuesArray[i];
          }
          avg = (pmaxValuesArray.length > 0) ?  sum/pmaxValuesArray.length : 0;

          sumRef = 0;
          for( let i = 0; i < pmaxReferencesArray.length; i++ ){
            sumRef +=  pmaxReferencesArray[i];
          }
          ref = (pmaxReferencesArray.length > 0) ?  sumRef/pmaxReferencesArray.length : 0;
          min = pmaxArray[2];
          max = pmaxArray[3];

          let valMin = ref/(1 - min/100);
          let valMax = ref/(1 - max/100);

          data.val.push(avg);
          data.valMin.push(valMin);
          data.valMax.push(valMax);
          let lab = 10.00;
          data.labels.push( (lab + j/100).toFixed(2) );

        }

        data.val = data.val.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMin = data.valMin.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMax = data.valMax.map(function(each_element){
          return Number(each_element.toFixed(2));
        });

        this.$set(this.firingPressureData, 'datapoints',  data);
        this.childFiringPressureDataLoaded = true;

        //Tliner getData

        let tLinerArray = helperMatrix.Tliner;
        let tLinerValuesArray = tLinerArray[0];
        let tLinerReferencesArray = tLinerArray[1];
        sum = 0;
        for( let i = 0; i < pmaxValuesArray.length; i++ ){
          sum +=  tLinerValuesArray[i];
        }
        avg = (tLinerValuesArray.length > 0) ?  sum/tLinerValuesArray.length : 0;

        sumRef = 0;
        for( let i = 0; i < tLinerReferencesArray.length; i++ ){
          sumRef +=  tLinerReferencesArray[i];
        }
        ref = (tLinerReferencesArray.length > 0) ?  sumRef/tLinerReferencesArray.length : 0;

        min = tLinerArray[2];
        max = tLinerArray[3];

        this.$set(this.linerWallTemperatureData, 'Value', avg);
        this.$set(this.linerWallTemperatureData, 'Ref', ref);

        this.childLinerWallTemperatureDataLoaded = true;


        //fuel Rail Pressure getData

        let fuelRailPressArray = helperMatrix.FuelPress;

        avg = (fuelRailPressArray[0][0]) ? fuelRailPressArray[0][0] : 0 ;
        ref = (fuelRailPressArray[1][0]) ? fuelRailPressArray[1][0] : 0 ;
        min = fuelRailPressArray[2];
        max = fuelRailPressArray[3];
        this.$set(this.fuelRailPressureData, 'Value', avg);
        this.$set(this.fuelRailPressureData, 'Ref', ref);

        data = {"val": [], "valMin": [], "valMax": [], "labels": []};
        for (let j = 0; j < len; j++) {

          let helper = response.data[Object.keys(response.data)[j]];
          fuelRailPressArray = helper.FuelPress;
          avg = (fuelRailPressArray[0][0]) ? fuelRailPressArray[0][0]  : 0;
          ref = (fuelRailPressArray[1][0]) ? fuelRailPressArray[1][0]  : 0;

          min = fuelRailPressArray[2];
          max = fuelRailPressArray[3];
          let valMin = ref / (1 - min / 100);
          let valMax = ref / (1 - max / 100);

          data.val.push(avg);
          data.valMin.push(valMin);
          data.valMax.push(valMax);
          if (j < 10) {
            data.labels.push('10.0' + j);
          } else {
            data.labels.push('10.' + j);
          }
        }
        data.val = data.val.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMin = data.valMin.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMax = data.valMax.map(function(each_element){
          return Number(each_element.toFixed(2));
        });

        this.$set(this.fuelRailPressureData, 'datapoints',  data);
        this.childFuelRailPressureDataLoaded = true;



        //pscav getData

        let pScavArray = helperMatrix.pscav;
        avg = (pScavArray[0][0]) ? pScavArray[0][0] : 0 ;
        ref = (pScavArray[1][0]) ? pScavArray[1][0] : 0 ;
        min = pScavArray[2];
        max = pScavArray[3];
        this.$set(this.scavengeReceiverPressureData, 'Value', avg);
        this.$set(this.scavengeReceiverPressureData, 'Ref', ref);

        data = {"val": [], "valMin": [], "valMax": [], "labels": []};
        for (let j = 0; j < len; j++) {

          let helper = response.data[Object.keys(response.data)[j]];
          pScavArray = helper.pscav;
          avg = (pScavArray[0][0]) ? pScavArray[0][0] : 0;
          ref = (pScavArray[1][0]) ? pScavArray[1][0] : 0;

          min = pScavArray[2];
          max = pScavArray[3];
          let valMin = ref / (1 - min / 100);
          let valMax = ref / (1 - max / 100);

          data.val.push(avg);
          data.valMin.push(valMin);
          data.valMax.push(valMax);
          if (j < 10) {
            data.labels.push('10.0' + j);
          } else {
            data.labels.push('10.' + j);
          }

        }
        data.val = data.val.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMin = data.valMin.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMax = data.valMax.map(function(each_element){
          return Number(each_element.toFixed(2));
        });

        this.$set(this.scavengeReceiverPressureData, 'datapoints',  data);
        this.childScavengeReceiverPressureDataLoaded = true;



        //turbineInletTemperature getData

        let tTurbineArray = helperMatrix.Tturbin;
        avg = (tTurbineArray[0][0]) ? tTurbineArray[0][0] : 0 ;
        ref = (tTurbineArray[1][0]) ? tTurbineArray[1][0] : 0 ;
        min = tTurbineArray[2];
        max = tTurbineArray[3];
        this.$set(this.turbineInletTempData, 'Value', avg);
        this.$set(this.turbineInletTempData, 'Ref', ref);

        data = {"val": [], "valMin": [], "valMax": [], "labels": []};
        for (let j = 0; j < len; j++) {

          let helper = response.data[Object.keys(response.data)[j]];
          tTurbineArray = helper.Tturbin;
          avg = (tTurbineArray[0][0]) ? tTurbineArray[0][0] : 0;
          ref = (tTurbineArray[1][0]) ? tTurbineArray[1][0] : 0;

          min = tTurbineArray[2];
          max = tTurbineArray[3];
          let valMin = ref / (1 - min / 100);
          let valMax = ref / (1 - max / 100);

          data.val.push(avg);
          data.valMin.push(valMin);
          data.valMax.push(valMax);
          if (j < 10) {
            data.labels.push('10.0' + j);
          } else {
            data.labels.push('10.' + j);
          }

        }
        data.val = data.val.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMin = data.valMin.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMax = data.valMax.map(function(each_element){
          return Number(each_element.toFixed(2));
        });

        this.$set(this.turbineInletTempData, 'datapoints',  data);
        this.childTurbineInletTempDataLoaded = true;


        //servoPress getData

        let servoPressArray = helperMatrix.ServoPress;
        avg = (servoPressArray[0][0]) ? servoPressArray[0][0] : 0 ;
        ref = (servoPressArray[1][0]) ? servoPressArray[1][0] : 0 ;
        min = servoPressArray[2];
        max = servoPressArray[3];
        this.$set(this.servoOilRailPressureData, 'Value', avg);
        this.$set(this.servoOilRailPressureData, 'Ref', ref);

        data = {"val": [], "valMin": [], "valMax": [], "labels": []};
        for (let j = 0; j < len; j++) {

          let helper = response.data[Object.keys(response.data)[j]];
          servoPressArray = helper.ServoPress;
          avg = (servoPressArray[0][0]) ? servoPressArray[0][0] : 0;
          ref = (servoPressArray[1][0]) ? servoPressArray[1][0] : 0;

          min = servoPressArray[2];
          max = servoPressArray[3];
          let valMin = ref / (1 - min / 100);
          let valMax = ref / (1 - max / 100);

          data.val.push(avg);
          data.valMin.push(valMin);
          data.valMax.push(valMax);
          if (j < 10) {
            data.labels.push('10.0' + j);
          } else {
            data.labels.push('10.' + j);
          }

        }
        data.val = data.val.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMin = data.valMin.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMax = data.valMax.map(function(each_element){
          return Number(each_element.toFixed(2));
        });

        this.$set(this.servoOilRailPressureData, 'datapoints',  data);
        this.childServoOilRailPressureDataLoaded = true;



        //pComp getData

        let pcompArray =  helperMatrix.Pcomp;
        let pcompValuesArray = pcompArray[0];
        let pcompReferencesArray = pcompArray[1];
        sum = 0;
        for( let i = 0; i < pcompValuesArray.length; i++ ){
          sum +=  pcompValuesArray[i];
        }
        avg = (pcompValuesArray.length > 0) ?  sum/pcompValuesArray.length : 0;
        sumRef = 0;
        for( let i = 0; i < pcompReferencesArray.length; i++ ){
          sumRef +=  pcompReferencesArray[i];
        }
        ref = (pcompReferencesArray.length > 0) ?  sumRef/pcompReferencesArray.length : 0;

        min = pcompArray[2];
        max = pcompArray[3];

        this.compressionPressureData.Value = avg;
        this.compressionPressureData.Ref = ref;

        data = {"val": [], "valMin": [], "valMax": [], "labels": []};
        for (let j = 0; j < len; j++){

          let helper = response.data[Object.keys(response.data)[j]];
          pcompArray = helper.Pcomp;
          // pmaxValuesArray = pmaxArray[0];
          pcompReferencesArray = pcompArray[1];

          sum = 0;
          for( let i = 0; i < pcompValuesArray.length; i++ ){
            sum +=  pcompValuesArray[i];
          }
          avg = (pcompValuesArray.length > 0) ?  sum/pcompValuesArray.length : 0;

          sumRef = 0;
          for( let i = 0; i < pcompReferencesArray.length; i++ ){
            sumRef +=  pcompReferencesArray[i];
          }
          ref = (pcompReferencesArray.length > 0) ?  sumRef/pcompReferencesArray.length : 0;
          min = pcompArray[2];
          max = pcompArray[3];

          let valMin = ref/(1 - min/100);
          let valMax = ref/(1 - max/100);

          data.val.push(avg);
          data.valMin.push(valMin);
          data.valMax.push(valMax);
          if (j<10){ data.labels.push( '10.0'+j ); } else { data.labels.push('10.'+j); }

        }
        data.val = data.val.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMin = data.valMin.map(function(each_element){
          return Number(each_element.toFixed(2));
        });
        data.valMax = data.valMax.map(function(each_element){
          return Number(each_element.toFixed(2));
        });


        this.$set(this.compressionPressureData, 'datapoints',  data);
        this.childCompressionDataLoaded = true;




        let data2 = { "val": [], "labels": [] };
        let performanceTcspeedArray = helperMatrix.TCspeed;
        let performanceTturbinArray = helperMatrix.Tturbin;
        let performanceIndipArray = helperMatrix.indiP;
        let performanceIndipValuesArray = performanceIndipArray[0];
        let performanceIndipReferencesArray = performanceIndipArray[1];


        data2.val.push( (this.compressionPressureData.Value - this.compressionPressureData.Ref)*100/this.compressionPressureData.Value);
        data2.labels.push('Pcomp');

        data2.val.push( (this.firingPressureData.Value - this.firingPressureData.Ref)*100/this.firingPressureData.Value);
        data2.labels.push('Pmax');

        data2.val.push( (performanceTcspeedArray[0] - performanceTcspeedArray[1])*100/performanceTcspeedArray[1]);
        data2.labels.push('T/C Speed');

        data2.val.push( (performanceTturbinArray[0] - performanceTturbinArray[1])*100/performanceTturbinArray[1]);
        data2.labels.push('T turb In');

        sum = 0;
        for( let i = 0; i < performanceIndipValuesArray.length; i++ ){
          sum +=  performanceIndipValuesArray[i];
        }
        avg = (performanceIndipValuesArray.length > 0) ?  sum/performanceIndipValuesArray.length : 0;
        sumRef = 0;
        for( let i = 0; i < performanceIndipReferencesArray.length; i++ ){
          sumRef +=  performanceIndipReferencesArray[i];
        }
        ref = (performanceIndipReferencesArray.length > 0) ?  sumRef/performanceIndipReferencesArray.length : 0;


        //ginetai mia mlkia me ta data kai prepei na diaireseis to ref dia 6
        data2.val.push( (ref !== 0) ? (avg - (ref/6))*100/(ref/6)  : 0 );
        data2.labels.push('Ind. Power');

        data2.val = data2.val.map(function(each_element){
          return Number(each_element.toFixed(2));
        });

        this.$set(this.performanceParamData, 'datapoints',  data2);
        this.childPerformanceParamDataLoaded = true;




        let kpiArray =  helperMatrix.KpiPign;
        let kpiValuesArray = kpiArray[0];
        sum = 0;
        for( let i = 0; i < kpiValuesArray.length; i++ ){
          sum +=  kpiValuesArray[i];
        }
        avg = (kpiValuesArray.length > 0) ?  sum/kpiValuesArray.length : 0;


        this.engineKpiData.Value = avg;
        this.childEngineDataLoaded = true;


        // this.compressionPressureData.Value = avg;
        // this.compressionPressureData.Ref = ref;
        // this.childCompressionDataLoaded = true;


      });

      axios.get("http://localhost:8092/EDSMapping").then(resp => {
        this.firingPressureData.Title = resp.data.EDS_Parameter_Names.pmax.longName;
        this.firingPressureData.Unit  = resp.data.EDS_Parameter_Names.pmax.unit;

        this.compressionPressureData.Title = resp.data.EDS_Parameter_Names.pcomp.longName;
        this.compressionPressureData.Unit = resp.data.EDS_Parameter_Names.pcomp.unit;

        this.servoOilRailPressureData.Title = resp.data.EDS_Parameter_Names.soPresDispl.shortName;
        this.servoOilRailPressureData.Unit = resp.data.EDS_Parameter_Names.soPresDispl.unit;

        this.fuelRailPressureData.Title = resp.data.EDS_Parameter_Names.fRailPres.longName;
        this.fuelRailPressureData.Unit = resp.data.EDS_Parameter_Names.fRailPres.unit;

        this.turbineInletTempData.Title = resp.data.EDS_Parameter_Names.tTurbIn.longName;
        this.turbineInletTempData.Unit = resp.data.EDS_Parameter_Names.tTurbIn.unit;


        this.scavengeReceiverPressureData.Title = resp.data.EDS_Parameter_Names.pscav.longName;
        this.scavengeReceiverPressureData.Unit = resp.data.EDS_Parameter_Names.pscav.unit;

        this.linerWallTemperatureData.Title = resp.data.EDS_Parameter_Names.tlinerfore.longName;
        this.linerWallTemperatureData.Unit = resp.data.EDS_Parameter_Names.tlinerfore.unit;


      });


      axios.get("http://localhost:8092/GetEDSWebData/20").then(response => {
        // this.childdata.push(response.data.Card.Value);
        // this.compressionPressureData = response.data.Card;

        // this.engineKpiData = response.data.EngineKPI;


        // this.ServoOilRailPressureData = response.data.Card;

        // this.fuelRailPressureData = response.data.Card;
        // this.childFuelRailPressureDataLoaded = true;

        // this.turbineInletTempData = response.data.Card;
        // this.childTurbineInletTempDataLoaded = true;

        // this.scavengeReceiverPressureData = response.data.Card;
        // this.childScavengeReceiverPressureDataLoaded = true;

        // this.linerWallTemperatureData = response.data.Card;
        // this.childLinerWallTemperatureDataLoaded = true;

        this.bsfcData = response.data.Card;
        this.childBsfcDataLoaded = true;

        // console.log(response.data);
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
};
</script>

<style scoped></style>

<!-- μέσα στα μάτια κοίτα απο το πάτωμα πάντοτε λίγο πριν πέσει θα πέτα, -->
<!-- Ο επιμένων νικά, γενικά, αρμονικά, ανοδικα, μόνο ομαδικά -->
<!-- φωτιά στα αφεντικά, μας χωρίζουν ταξικά -->
<!-- φυλετικά χρωματικά από τα υλικά από τα λεφτά -->
<!-- και ο νους εν πτώση θα δεις ισχύς εν τη ένωση -->
<!-- θεριά ταπεινά που πεινάν αναζητάν να φαν γνώση -->
<!-- όση δύναμη μας κλέβουνε θα βρίσκουμε άλλη τόση, -->
<!-- θα σπερνω για να δω το δέντρο να ριζώσει, -->
<!-- παιδιά μόνα που πολεμάγαν γνωθη σαυτον μηδέν άγαν -->
<!-- όσα εθαβα μπροστά μου έβρισκα και αν δε τα έλυνα με κυνηγάγαν, -->
<!--
  πολλοί είναι αυτοί που λόγια λέγαν πολλά μα ηταν λίγοι εκείνοι που βοηθαγαν
-->
<!-- και είχα αδέρφια στα ντέρτια σα βράχια βασταγαν. -->
<!-- αναθεμα ανάμεσα σε όλα τα πρόβατα ανάμεικτα -->
<!-- λύκοι δε φάνηκαν λίγοι που κράτησαν πολλοί -->
<!-- που ταφήσαν πολλοί που μαγγιζαν μείναμε εδώ -->
<!--
  πέτυχαν μαζί όσοι βαδισαν μαζί σηκώθηκαν όταν γονατισαν όταν πάλεψαν ενωμένοι ταγγιξαν
-->
<!-- αυτό είμαι εγώ λάσπη και ιδρώτα μεροκάματο και beatια στην υπογα, -->
<!-- fer de Lance σε στιγμές Μοναξιάς Είναι η φλόγα, είναι ατόφιο όχι μόδα -->
<!--
  βιοπαλη όχι κονόμα όσο και Αν δεν τσουλαει θα το σπρώχνω η ζωή μια τρύπια ρόδα
-->
<!-- Ελλάδα όνειρα στην πηγάδα -->
<!-- εμείς ξυπνάμε τον κόσμο όσο κυνηγάτε τα φράγκα -->
<!-- οικογένεια όχι ομάδα λόγος που καίει σα δάδα -->
<!-- για πάντα, φασίστες και ρουφιάνοι στον Καιάδα.. -->

<!--
  fer de Lance μαζί σου όταν πετάς,
  fer de Lance μαζί σου όταν πονάς,
  fer de Lance βαθιά αληθινά συναισθήματα
  με χρηματα και πλούτη δε μας ακουμπάς (x2)
-->

<!--
  Αλήθειας έργων επιχειρήματα γιναν συνθήματα και η μουσική μας θα δίνει μηνύματα,
-->
<!-- κι αν λυναμε όλα μας τα προβλήματα ποιος θα γράφε για τον πόνο ε; -->
<!-- κι αν επιβιωνω στη ζούγκλα που κάποιοι πουλάνε το χρόνο -->
<!-- προσπαθώ να ξυπνήσω το πίσω διαζωμα ματιά που είδαν τον φόνο -->
<!-- πάλευα μέρες να ρίξω τον τοίχο που χτισαν οι προκαταληψεις -->
<!-- πως τι και σε ποιον να αποδείξεις σκάβω βαθιά για να βρω τις ενδείξεις -->
<!-- θέλησα και έκλεισα χρόνια το στόμα σα μπω στην υπογα να μείνω σκυφτός -->
<!--
  από όλους τους φιλους(σκύλους;) ο πιο ταπεινός ήρεμη δύναμη και εσοπλισμος
-->
<!--
  αλλάζει η ζωή μας το είδα πιάσε το πρόβλημα από τα μαλλιά εικόνων επαναφορα
-->
<!-- φιλικά και ο ρατσισμός δε χώρα στη δική μου σελίδα -->
<!--
  όταν απέφυγα την πρώτη παγίδα υποπτευθηκα πως υπάρχω για να σε πληρώνω πατρίδα
-->
<!-- κοιτάζω μόνο την πυξίδα τώρα -->
<!-- στο δαίμονα πριν κάνεις προσευχή πιάσου από την ύστατη στιγμή -->
<!-- να απολαύσεις τη διαδρομή μου είναι η φωνή η πνοη και η τιμή μου -->
<!-- και η ανθρώπινη ενέργεια που θέλει να αγκαλιάσει τη μουσική μου -->
<!-- ήλιος να μπει μέσα στη ψυχή μου πάμε όσο θα τρέφουμε μυαλά παντα -->
<!--
  κάποιοι θα το εκτιμάνε θα είναι εκεί και μη κοιτάς που πάντα θα πεινάμε καλλιτέχνες
-->
<!--
  δεν υπάρχουν μέσα σε ένα κόσμο που την τέχνη καθε μέρα θα την ξεπουλάμε πολεμιστές
-->
<!-- όλοι μαζι και πάμε Όσο προσέχουμε τους στίχους μας γύρνα θα το θυμάμαι -->
<!-- θα ναι εκεί και αυτοί μαζι μας θα πεινάνε -->
<!--
  καλλιτέχνες δεν υπάρχουν μέσα σε ένα κόσμο που την τέχνη καθε μέρα θα την ξεπουλάμε
   πολεμιστές για όσα και για όσους αγαπάμε.
-->

<!--
  fer de Lance μαζί σου όταν πετάς,
   fer de Lance μαζί σου όταν πονάς,
    fer de Lance βαθιά αληθινά συναισθήματα
     με χρηματα και πλούτη δε μας ακουμπάς
-->
