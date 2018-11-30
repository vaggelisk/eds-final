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
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card dark>
              <v-card-title primary class="title">
                Performance Parameters
              </v-card-title>
              <v-responsive v-if="childPerformanceDataLoaded" contain>
                <PerformanceBar v-bind:performanceData="performanceData" />
              </v-responsive>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card dark>
          <v-responsive v-if="childEngineDataLoaded" contain>
            <EngineDoughnut v-bind:engineKpiData="engineKpiData" />
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
        <v-card dark>
          <v-responsive contain>
            <EngineState />
          </v-responsive>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childFiringPressureDataLoaded" contain dark>
          <FiringPressure v-bind:firingPressureData="firingPressureData" />
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childServoOilRailPressureDataLoaded" contain dark>
          <ServoOilRailPressure
            v-bind:ServoOilRailPressureData="ServoOilRailPressureData"
          />
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-card v-if="childFuelRailPressureDataLoaded" contain dark>
          <FuelRailPressure
            v-bind:FuelRailPressureData="FuelRailPressureData"
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
  },
  data: function() {
    return {
      childCompressionDataLoaded: false,
      compressionPressureData: {},

      childPerformanceDataLoaded: false,
      performanceData: {},

      childEngineDataLoaded: false,
      engineKpiData: {},

      childFiringPressureDataLoaded: false,
      firingPressureData: {},

      childServoOilRailPressureDataLoaded: false,
      ServoOilRailPressureData: {},

      childFuelRailPressureDataLoaded: false,
      FuelRailPressureData: {},

      childTurbineInletTempDataLoaded: false,
      turbineInletTempData: {},

      childScavengeReceiverPressureDataLoaded: false,
      scavengeReceiverPressureData: {},

      childLinerWallTemperatureDataLoaded: false,
      linerWallTemperatureData: {},

      childBsfcDataLoaded: false,
      bsfcData: {},

      lorem: `Lorem ipsum dolor l at clita quando. Te sit `
    };
  },
  mounted() {

    axios.get("http://localhost:8092/EDSTimelineData/10").then(response => {
      let len = Object.keys(response.data).length;
      console.log(len);
      let helper = response.data[Object.keys(response.data)[len - 1]];
      // console.log(response.data[Object.keys(response.data)[len - 1]]);
      let pmaxArray = helper.Pmax;
      let pmaxValuesArray = pmaxArray[0];
      let pmaxReferencesArray = pmaxArray[1];
      // console.log(pmaxValuesArray);
      let sum = 0;
      for( let i = 0; i < pmaxValuesArray.length; i++ ){
        sum +=  pmaxValuesArray[i];
      }
      let avg = (pmaxValuesArray.length > 0) ?  sum/pmaxValuesArray.length : 0;
      console.log(avg);

      let sumRef = 0;
      for( let i = 0; i < pmaxReferencesArray.length; i++ ){
        sumRef +=  pmaxReferencesArray[i];
      }
      let ref = (pmaxReferencesArray.length > 0) ?  sumRef/pmaxReferencesArray.length : 0;

      let min = pmaxArray[2];
      let max = pmaxArray[3];

      // console.log(pmaxValuesArray);
      this.firingPressureData.Value = avg;
      this.firingPressureData.Ref = ref;

      let data = {"val": [], "valMin": [], "valMax": [], "labels": []};
      for (let j = 0; j < len; j++){
      // for (let j = 0; j < len; j++){

        helper = response.data[Object.keys(response.data)[j]];
        pmaxArray = helper.Pmax;
        // pmaxValuesArray = pmaxArray[0];
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
        data.labels.push(j.toString());


      }

      this.firingPressureData.dataPoints = data;

      // console.log(data);

      this.childFiringPressureDataLoaded = true;

    });

    axios.get("http://localhost:8092/EDSMapping").then(resp => {
      this.firingPressureData.Title = resp.data.EDS_Parameter_Names.pmax.longName;
      this.firingPressureData.Unit  = resp.data.EDS_Parameter_Names.pmax.unit;
      // this.childFiringPressureDataLoaded = true;

      // console.log(this.firingPressureData.Title);
    });


    axios.get("http://localhost:8092/GetEDSWebData/20").then(response => {
      // this.childdata.push(response.data.Card.Value);
      this.compressionPressureData = response.data.Card;
      this.childCompressionDataLoaded = true;

      this.performanceData = response.data.BarChart;
      this.childPerformanceDataLoaded = true;

      this.engineKpiData = response.data.EngineKPI;
      this.childEngineDataLoaded = true;

      this.ServoOilRailPressureData = response.data.Card;
      this.childServoOilRailPressureDataLoaded = true;

      this.FuelRailPressureData = response.data.Card;
      this.childFuelRailPressureDataLoaded = true;

      this.turbineInletTempData = response.data.Card;
      this.childTurbineInletTempDataLoaded = true;

      this.scavengeReceiverPressureData = response.data.Card;
      this.childScavengeReceiverPressureDataLoaded = true;

      this.linerWallTemperatureData = response.data.Card;
      this.childLinerWallTemperatureDataLoaded = true;

      this.bsfcData = response.data.Card;
      this.childBsfcDataLoaded = true;

      // console.log(response.data);
    });
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
  καλλιτέχνες δεν υπάρχουν μέσα σε ένα κόσμο που την τέχνη καθε μέρα θα την ξεπουλάμε πολεμιστές για όσα και για όσους αγαπάμε.
-->

<!--
  fer de Lance μαζί σου όταν πετάς, fer de Lance μαζί σου όταν πονάς, fer de Lance βαθιά αληθινά συναισθήματα με χρηματα και πλούτη δε μας ακουμπάς
-->
