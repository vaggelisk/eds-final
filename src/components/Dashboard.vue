<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex d-flex xs12 sm6 md4>
                <v-card color="purple" dark >
                    <v-card-title primary class="title"> Notification </v-card-title>
                    <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text>
                </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md4>
                <v-layout row wrap>

                    <v-flex d-flex>
                        <v-card  dark>
                            <v-card-title primary class="title"> Performance Parameters </v-card-title>
                            <v-responsive v-if="childPerformanceDataLoaded" contain >
                                <PerformanceBar v-bind:performanceData="performanceData" />
                            </v-responsive>
                        </v-card>
                    </v-flex>

                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 sm6 md2 child-flex>
                <v-card dark>
                    <v-responsive v-if="childEngineDataLoaded" contain >
                        <EngineDoughnut v-bind:engineKpiData="engineKpiData"  />
                    </v-responsive>
                </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md2>
                <v-card dark>
                    <!-- the above if is for loading data before make the card  -->
                    <!-- otherwise make th card without data                    -->
                        <v-responsive v-if="childCompressionDataLoaded" contain>
                            <CompressionDots v-bind:compressionPressureData="compressionPressureData"   />
                        </v-responsive>

                </v-card>
            </v-flex>
        </v-layout>


        <v-layout row wrap>
            <v-flex d-flex xs12 sm6 md4>
                <v-card dark height="400px">
                    <v-card-title primary class="title"> Subsystems State </v-card-title>
                    <v-responsive contain>
                        <Gauge percentage="33"></Gauge>
                    </v-responsive>
                </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm6 md6 child-flex>
                <v-card dark>
                    <v-card-title primary class="title">Engine State</v-card-title>
                    <v-responsive contain>
                        <CommitChart  />
                    </v-responsive>
                </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md2>
                <v-layout row wrap>
                    <v-flex
                            v-for="n in 2"
                            :key="n"
                            d-flex
                            xs12
                    >
                        <v-card dark>
                            <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>


        <v-layout row wrap>

            <v-flex
                    v-for="n in 6"
                    :key="n"
                    d-flex
                    xs12 sm6 md2
            >
                <v-card
                        color="red lighten-2"
                        dark height="200"
                >
                    <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
            </v-flex>



        </v-layout>
    </v-container>
</template>

<script>
    import axios           from 'axios'
    import CommitChart     from './CommitChart'
    import DoughnutChart   from './dashboard/charts/DoughnutChart'
    import PerformanceBar  from './dashboard/charts/PerformanceBar'
    import EngineDoughnut  from './dashboard/charts/EngineDoughnut'
    import CompressionDots from './dashboard/charts/CompressionDots'
    import Gauge           from './dashboard/charts/Gauge'

    export default {
        name: "Dashboard",
        components: {
            CommitChart,
            DoughnutChart,
            PerformanceBar,
            EngineDoughnut,
            CompressionDots,
            Gauge
        },
        data: function () {
            return {
                childCompressionDataLoaded: false,
                compressionPressureData: {},
                childPerformanceDataLoaded: false,
                performanceData: {},
                childEngineDataLoaded: false,
                engineKpiData : {},
                lorem: `Lorem ipsum dolor l at clita quando. Te sit `,
            }
        },
        mounted() {
            axios
                .get('http://localhost:8092/GetEDSWebData/20')
                .then((response) => {
                    // this.childdata.push(response.data.Card.Value);
                    this.compressionPressureData = response.data.Card;
                    this.childCompressionDataLoaded = true;

                    this.performanceData = response.data.BarChart;
                    this.childPerformanceDataLoaded = true;

                    this.engineKpiData = response.data.EngineKPI;
                    this.childEngineDataLoaded = true;

                    console.log(response.data);
                })
        }
    }
</script>

<style scoped>

</style>
<!--μέσα στα μάτια κοίτα απο το πάτωμα πάντοτε λίγο πριν πέσει θα πέτα,-->
<!--Ο επιμένων νικά, γενικά, αρμονικά, ανοδικα, μόνο ομαδικά-->
<!--φωτιά στα αφεντικά, μας χωρίζουν ταξικά-->
<!--φυλετικά χρωματικά από τα υλικά από τα λεφτά-->
<!--και ο νους εν πτώση θα δεις ισχύς εν τη ένωση-->
<!--θεριά ταπεινά που πεινάν αναζητάν να φαν γνώση-->
<!--όση δύναμη μας κλέβουνε θα βρίσκουμε άλλη τόση,-->
<!--θα σπερνω για να δω το δέντρο να ριζώσει,-->
<!--παιδιά μόνα που πολεμάγαν γνωθη σαυτον μηδέν άγαν-->
<!--όσα εθαβα μπροστά μου έβρισκα και αν δε τα έλυνα με κυνηγάγαν,-->
<!--πολλοί είναι αυτοί που λόγια λέγαν πολλά μα ηταν λίγοι εκείνοι που βοηθαγαν-->
<!--και είχα αδέρφια στα ντέρτια σα βράχια βασταγαν.-->
<!--αναθεμα ανάμεσα σε όλα τα πρόβατα ανάμεικτα-->
<!--λύκοι δε φάνηκαν λίγοι που κράτησαν πολλοί-->
<!--που ταφήσαν πολλοί που μαγγιζαν μείναμε εδώ-->
<!--πέτυχαν μαζί όσοι βαδισαν μαζί σηκώθηκαν όταν γονατισαν όταν πάλεψαν ενωμένοι ταγγιξαν-->
<!--αυτό είμαι εγώ λάσπη και ιδρώτα μεροκάματο και beatια στην υπογα,-->
<!--fer de Lance σε στιγμές Μοναξιάς Είναι η φλόγα, είναι ατόφιο όχι μόδα-->
<!--βιοπαλη όχι κονόμα όσο και Αν δεν τσουλαει θα το σπρώχνω η ζωή μια τρύπια ρόδα-->
<!--Ελλάδα όνειρα στην πηγάδα-->
<!--εμείς ξυπνάμε τον κόσμο όσο κυνηγάτε τα φράγκα-->
<!--οικογένεια όχι ομάδα λόγος που καίει σα δάδα-->
<!--για πάντα, φασίστες και ρουφιάνοι στον Καιάδα..-->

<!--fer de Lance μαζί σου όταν πετάς,
    fer de Lance μαζί σου όταν πονάς,
    fer de Lance βαθιά αληθινά συναισθήματα
    με χρηματα και πλούτη δε μας ακουμπάς (x2)-->

<!--Αλήθειας έργων επιχειρήματα γιναν συνθήματα και η μουσική μας θα δίνει μηνύματα, -->
<!--κι αν λυναμε όλα μας τα προβλήματα ποιος θα γράφε για τον πόνο ε;-->
<!--κι αν επιβιωνω στη ζούγκλα που κάποιοι πουλάνε το χρόνο-->
<!--προσπαθώ να ξυπνήσω το πίσω διαζωμα ματιά που είδαν τον φόνο-->
<!--πάλευα μέρες να ρίξω τον τοίχο που χτισαν οι προκαταληψεις-->
<!--πως τι και σε ποιον να αποδείξεις σκάβω βαθιά για να βρω τις ενδείξεις-->
<!--θέλησα και έκλεισα χρόνια το στόμα σα μπω στην υπογα να μείνω σκυφτός-->
<!--από όλους τους φιλους(σκύλους;) ο πιο ταπεινός ήρεμη δύναμη και εσοπλισμος-->
<!--αλλάζει η ζωή μας το είδα πιάσε το πρόβλημα από τα μαλλιά εικόνων επαναφορα-->
<!--φιλικά και ο ρατσισμός δε χώρα στη δική μου σελίδα-->
<!--όταν απέφυγα την πρώτη παγίδα υποπτευθηκα πως υπάρχω για να σε πληρώνω πατρίδα-->
<!--κοιτάζω μόνο την πυξίδα τώρα-->
<!--στο δαίμονα πριν κάνεις προσευχή πιάσου από την ύστατη στιγμή-->
<!--να απολαύσεις τη διαδρομή μου είναι η φωνή η πνοη και η τιμή μου-->
<!--και η ανθρώπινη ενέργεια που θέλει να αγκαλιάσει τη μουσική μου-->
<!--ήλιος να μπει μέσα στη ψυχή μου πάμε όσο θα τρέφουμε μυαλά παντα-->
<!--κάποιοι θα το εκτιμάνε θα είναι εκεί και μη κοιτάς που πάντα θα πεινάμε καλλιτέχνες-->
<!--δεν υπάρχουν μέσα σε ένα κόσμο που την τέχνη καθε μέρα θα την ξεπουλάμε πολεμιστές-->
<!--όλοι μαζι και πάμε Όσο προσέχουμε τους στίχους μας γύρνα θα το θυμάμαι-->
<!--θα ναι εκεί και αυτοί μαζι μας θα πεινάνε-->
<!--καλλιτέχνες δεν υπάρχουν μέσα σε ένα κόσμο που την τέχνη καθε μέρα θα την ξεπουλάμε πολεμιστές για όσα και για όσους αγαπάμε.-->

<!--fer de Lance μαζί σου όταν πετάς, fer de Lance μαζί σου όταν πονάς, fer de Lance βαθιά αληθινά συναισθήματα με χρηματα και πλούτη δε μας ακουμπάς﻿-->
