<template>
  <v-container fluid grid-list-md style="padding:10px;">
    <v-layout row >
      <v-flex d-flex xs12 sm6 md4>
          <v-responsive contain>
            <Notification v-bind:status="status" />
          </v-responsive>
      </v-flex>
      <v-flex d-flex xs12 sm6 md4>
        <v-layout row  >
          <v-flex d-flex>
              <v-responsive contain>
                <PerformanceBar v-bind:performanceParamData="performanceParamData"/>
              </v-responsive>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2>
          <v-responsive contain>
            <v-card style="width:100%;height:100%; background-color: rgb(42,42,42); height:250px;">
              <v-card-title primary class="title" style="width:100%;height:10%;"> Engine KPI </v-card-title>
              <v-card-actions  style="width:100%;height:90%;" >
                <CircGauge v-bind:value="colorsObj.Engine[0]*100"
                          v-bind:labelText="colorsObj.Engine[2]"
                          v-bind:color="colorsObj.Engine[1]"
                           />
              </v-card-actions>
            </v-card>
          </v-responsive>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
          <v-responsive  style="height: 100%; width : 100%" contain >
            <Card  v-if="compressionPressureData"
                   v-bind:cardData="compressionPressureData"
                   v-bind:counter="counter" />
          </v-responsive>
      </v-flex>

    </v-layout>

    <v-layout row >

      <v-flex d-flex md4>
          <v-responsive v-if="childSubsystemDataLoaded" contain>
            <SubsystemsState
                    v-bind:colorsSubsystemServoOil="colorsObj.ServoOil"
                    v-bind:colorsSubsystemFuelInjection="colorsObj.FuelInjection"
                    v-bind:colorsSubsystemScavengeAir="colorsObj.ScavengeAir"
                    v-bind:colorsSubsystemExhaustGas="colorsObj.ExhaustGas "
                    v-bind:colorsSubsystemPistonRunning="colorsObj.PistonRunning"
                    v-bind:colorsSubsystemAutomationControl="colorsObj.AutomationControl"
                    v-bind:colorsSubsystemGasAdmission="colorsObj.GasAdmission"
            />

          </v-responsive>
      </v-flex>

      <v-flex d-flex md6>
          <v-responsive v-if="childEngineStateDataLoaded" contain>
            <EngineState v-bind:colorsEngineState="colorsObj.Cylinder"
                         v-bind:colorsSubsystemTurbine="colorsObj.Turbine"
                         v-bind:colorsSubsystemCompressor="colorsObj.Compressor"
                         v-bind:colorsSubsystemAirCooler="colorsObj.AirCooler"
                         v-bind:colorsSubsystemAirFilter="colorsObj.AirFilter"
                         v-bind:counter="counter" />
          </v-responsive>
      </v-flex>


      <v-flex d-flex xs12 sm6 md2>
        <v-layout column >
          <v-flex d-flex>
              <v-responsive  contain >
              <Card  v-if="firingPressureData"
                      v-bind:cardData="firingPressureData"
                    v-bind:counter="counter" />
              </v-responsive>
          </v-flex>

          <v-flex d-flex>
              <v-responsive  contain >
                <Card  v-if="tcSpeedData"
                        v-bind:cardData="tcSpeedData"
                        v-bind:counter="counter" />
              </v-responsive>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row >

      <v-flex d-flex xs12 sm6 md2>
          <v-responsive  contain >
            <Card  v-if="servoOilRailPressureData"
                   v-bind:cardData="servoOilRailPressureData"
                   v-bind:counter="counter" />
          </v-responsive>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
          <v-responsive  contain >
            <Card  v-if="fuelRailPressureData"
                  v-bind:cardData="fuelRailPressureData"
                  v-bind:counter="counter" />
          </v-responsive>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-responsive  contain >
            <Card  v-if="turbineInletTempData"
            v-bind:cardData="turbineInletTempData"
            v-bind:counter="counter" />
          </v-responsive>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-responsive  contain >
            <Card  v-if="scavengeReceiverPressureData"
                  v-bind:cardData="scavengeReceiverPressureData"
                  v-bind:counter="counter" />
          </v-responsive>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-responsive contain>
           <LinerWallTemperature
                  v-bind:linerWallTemperatureData="linerWallTemperatureData"
          />
        </v-responsive>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-responsive contain>
           <Bsfc
                  v-bind:bsfcData="bsfcData"
                  v-bind:indiPowerData="indiPowerData"
                  v-bind:imepData="imepData"

          />
        </v-responsive>
      </v-flex>
    </v-layout>

  </v-container>
</template>
<script>
  import DoughnutChart            from "./dashboard/charts/DoughnutChart";
  import PerformanceBar           from "./dashboard/charts/PerformanceBar";
  import EngineDoughnut           from "./dashboard/charts/EngineDoughnut";
  import CompressionDots          from "./dashboard/charts/CompressionDots";
  import Gauge                    from "./dashboard/charts/Gauge";
  import EngineState              from "./dashboard/charts/EngineState";
  import LinerWallTemperature     from "./dashboard/charts/LinerWallTemperature";
  import Bsfc                     from "./dashboard/charts/Bsfc";
  import SubsystemsState          from "./dashboard/charts/SubsystemsState";
  import LineChart                from "./dashboard/charts/LineChart";
  import Notification             from "./dashboard/charts/Notification";
  import Card                     from "./Controls/Card";
  import CircGauge                from "./Controls/CircGauge";
  import {globalStore}            from "../main.js"


  export default {
    name: "Dashboard",
    components: {
      Notification,
      Card,
      DoughnutChart,
      PerformanceBar,
      EngineDoughnut,
      CompressionDots,
      Gauge,
      EngineState,
      LinerWallTemperature,
      Bsfc,
      SubsystemsState,
      LineChart,
      CircGauge
    },  
    data: function() {
    return {
      childNotificationDataLoaded: true,
      notificationData: {},

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

      childSubsystemDataLoaded: false,

      childTcSpeedDataLoaded: false,
      tcSpeedData: {},

      childBsfcDataLoaded: false,
      bsfcData: {},
      indiPowerData: {},
      imepData: {},

      colorsObj: {},

      interval: null,
      status:0,

    };
  },
  computed: {
    opts: function() {
      return {responsive: true, maintainAspectRatio: false}
    },
    counter: function () { return globalStore.counter; }
  },
  methods: {
    setData: function() {
      console.log("dashboard "+globalStore.counter);

      let params = ['pmax', 'pcomp', 'soPresDispl', 'fRailPres', 'tTurbIn', 'pscav','tlinerfore', 'tcspeed'];

      let objs = [ 'firingPressureData','compressionPressureData','servoOilRailPressureData','fuelRailPressureData','turbineInletTempData','scavengeReceiverPressureData',
            'linerWallTemperatureData','tcSpeedData'];

      let formats = [1,1,1,1,1,2,1,0];

      for( let i = 0; i < params.length; i++ )
      {
        this.$set(this[objs[i]], 'Title',globalStore.engMap.EDS_Parameter_Names[params[i]].longName);
        this.$set(this[objs[i]], 'Unit', globalStore.engMap.EDS_Parameter_Names[params[i]].unit);
        this.$set(this[objs[i]],'Format',formats[i]);
      }

      let len = Object.keys(globalStore.timelineData).length;
      let helperMatrix = globalStore.timelineData[Object.keys(globalStore.timelineData)[len - 1]];

      params = ['Pmax', 'TCspeed' ,'Tliner', 'pscav','FuelPress', 'Tturbin',  'ServoPress', 'Pcomp'];

      objs = [ 'firingPressureData','tcSpeedData','linerWallTemperatureData', 'scavengeReceiverPressureData','fuelRailPressureData',
        'turbineInletTempData','servoOilRailPressureData','compressionPressureData'];

      let loaded =  ['childFiringPressureDataLoaded','childTcSpeedDataLoaded',  'childLinerWallTemperatureDataLoaded', 'childScavengeReceiverPressureDataLoaded','childFuelRailPressureDataLoaded',    'childTurbineInletTempDataLoaded','childServoOilRailPressureDataLoaded','childCompressionDataLoaded'];

      for (let i=0; i<params.length;i++)
      {
        let array = helperMatrix[params[i]];

        let average = (array) => array.reduce((a, b) => a + b) / array.length;

        let avg = average(array[0]);
        let ref = average(array[1]);

        this.$set(this[objs[i]],'Value',avg);
        this.$set(this[objs[i]],'Ref',ref);

        let min = array[2];
        let max = array[3];

        let temp = ( (avg -  ref)/avg) * 100;

        let clr =  ((temp > min) && (temp < max))? "green" : "red";

        this.$set(this[objs[i]], 'Color', clr);

        let data = [];
        for (let j = 0; j < len; j++){

          let helper = globalStore.timelineData[Object.keys(globalStore.timelineData)[j]];

          array = helper[params[i]];

          avg = average(array[0]);
          ref = average(array[1]);

          min = array[2];
          max = array[3];

          let valMin = ref/(1 - min/100);
          let valMax = ref/(1 - max/100);

          clr =  ((avg > valMin) && (avg < valMax))? "green" : "red";

          let point = {};

          point.date = new Date(Object.keys(globalStore.timelineData)[j]);
          point.val = avg;
          point.valMin = valMin;
          point.valMax = valMax;
          point.color = clr;

          data.push(point);

        }

        this.$set(this[objs[i]],'datapoints', data);
        this[loaded[i]] = true;
      }

      // bsfc and more getData
      let bsfcArray = helperMatrix.bsfc;
      // avg = (bsfcArray[0][0]) ? bsfcArray[0][0] : 0 ;
      let avg =  0 ;
      let ref = (bsfcArray[1][0]) ? bsfcArray[1][0] : 0 ;
      let min = bsfcArray[2];
      let max = bsfcArray[3];
      this.$set(this.bsfcData, 'Value', avg);
      this.$set(this.bsfcData, 'Ref', ref);


      let indipArray = helperMatrix.indiP;
      avg = (indipArray[0][0]) ? indipArray[0][0]*6 : 0 ;
      ref = (indipArray[1][0]) ? indipArray[1][0] : 0 ;
      min = indipArray[2];
      max = indipArray[3];
      this.$set(this.indiPowerData, 'Value', avg);
      this.$set(this.indiPowerData, 'Ref', ref);

      let imepArray = helperMatrix.imep;
      let imepValuesArray = imepArray[0];
      let imepReferencesArray = imepArray[1];
      let sum = 0;
      for( let i = 0; i < imepValuesArray.length; i++ ){
        sum +=  imepValuesArray[i];
      }
      avg = (imepValuesArray.length > 0) ?  sum/imepValuesArray.length : 0;

      let sumRef = 0;
      for( let i = 0; i < imepReferencesArray.length; i++ ){
        sumRef +=  imepReferencesArray[i];
      }
      ref = (imepReferencesArray.length > 0) ?  sumRef/imepReferencesArray.length : 0;

      min = imepArray[2];
      max = imepArray[3];
      this.$set(this.imepData, 'Value', avg);
      this.$set(this.imepData, 'Ref', ref);

      this.childBsfcDataLoaded = true;

      params = ['Pcomp', 'Pmax', 'TCspeed' , 'indiP', 'Tturbin'];
      let labels = ['Pcomp','Pmax','T/C Speed','Ind. Power','T turb In'];

      let data = [];

      for (let i=0; i<params.length;i++)
      {
        let point = {};

        let array = helperMatrix[params[i]];

        let average = (array) => array.reduce((a, b) => a + b) / array.length;

        let avg = average(array[0]);
        let ref = average(array[1]);

        if (params[i]=="indiP") avg = avg*6;

        let min = array[2];
        let max = array[3];

        let temp = ( (avg -  ref)/avg) * 100;

        let clr =  ((temp > min) && (temp < max))? "green" : "red";

        point.label = labels[i];
        point.val = temp;
        point.color = clr;

        data.push(point);
      }
      this.performanceParamData = data;

      this.$set( this.colorsObj, globalStore.events.kpi );

      this.$set( this.colorsObj,  'Engine',            globalStore.events.kpi.Engine);
      if ( globalStore.events.kpi.Engine[0]>=1) this.colorsObj['Engine'].push((globalStore.events.kpi.Engine[0]*100).toFixed(0)+' %');
      else this.colorsObj['Engine'].push((globalStore.events.kpi.Engine[0]*100).toFixed(1)+' %');

      this.$set( this.colorsObj,  'Cylinder',          globalStore.events.kpi.Cylinder);
      this.$set( this.colorsObj,  'Turbine',           globalStore.events.kpi.Turbine[0]);
      this.$set( this.colorsObj,  'Compressor',        globalStore.events.kpi['Compressor'][0]);
      this.$set( this.colorsObj,  'AirCooler',         globalStore.events.kpi['AirCooler'][0]);
      this.$set( this.colorsObj,  'AirFilter',         globalStore.events.kpi['AirFilter'][0]);
      this.$set( this.colorsObj,  'ServoOil',          globalStore.events.kpi['Servo Oil']);
      this.$set( this.colorsObj,  'FuelInjection',     globalStore.events.kpi['Fuel Injection']);
      this.$set( this.colorsObj,  'ScavengeAir',       globalStore.events.kpi['Scavenge Air']);
      this.$set( this.colorsObj,  'ExhaustGas',        globalStore.events.kpi['Exhaust Gas']);
      this.$set( this.colorsObj,  'GasAdmission',      globalStore.events.kpi['Gas Admission']);
      this.$set( this.colorsObj,  'PistonRunning',     globalStore.events.kpi['Piston Running']);
      this.$set( this.colorsObj,  'AutomationControl', globalStore.events.kpi['Automation & Control']);

      this.childEngineStateDataLoaded = true;
      this.childSubsystemDataLoaded = true;

      var aggrEvents = globalStore.events.aggrEvents;

      if (aggrEvents.length == 0)
      {
          this.status = 0;
      }
      else
      {
        let mx = Math.max.apply(Math, aggrEvents.map(function(item){return item.color;}));

        this.status =mx;
      }    

    }
  },
  mounted(){
    this.setData();
  },
  watch:
  {
    counter : function(newCounter)
    {
      this.setData();
    }
  }
};
</script>

<style scoped>


</style>
