<template>
    <v-card flat style="width : 100%; background-color: rgb(42,42,42);">
        <v-card-title style="height:20%;" primary class="title">{{cardData.Title}}</v-card-title>
        <v-card-actions  style="height:80%;">
            <v-container fluid grid-list-md style="width:100%; height:100%; margin: 0px; padding:5px;">
                <v-layout column>
                    <v-flex d-flex md1>
                        <div v-if="cardData.Color===20" :style="'border-top:5px solid rgb(205, 57, 64); height:20px;margin-right :'+(100-cardData.Value).toFixed(0)+'%;' "/>
                        <div v-if="cardData.Color===10" :style="'border-top:5px solid rgb(255, 184, 29); height:20px;margin-right :'+(100-cardData.Value).toFixed(0)+'%;' "/>
                        <div v-if="cardData.Color===0" :style="'border-top:5px solid rgb(60, 171, 48); height:20px;margin-right :'+(100-cardData.Value).toFixed(0)+'%;' "/>
                    </v-flex>
                    <v-flex d-flex md11>
                        <v-layout row>
                            <v-flex d-flex md6>
                                <v-responsive contain>
                                    <CardWoTitle
                                        v-bind:cardData="cardData.Card1"
                                        v-bind:counter="counter" />
                                </v-responsive>
                            </v-flex>
                            <v-flex d-flex md6>
                                 <v-responsive contain>
                                    <CardWoTitle
                                        v-bind:cardData="cardData.Card2"
                                        v-bind:counter="counter" />
                                </v-responsive>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DxChart, {
        DxArgumentAxis,
        DxSeries,
        DxPoint,
        DxValueAxis,
        DxAnimation,
        DxLegend,
        DxCommonAxisSettings,
        DxGrid,
        DxBorder,
        DxVisualRange,
        DxTickInterval,
        DxWholeRange
    } from 'devextreme-vue/chart';
    import CardWoTitle from './CardWoTitle'

    export default {
        name: "ComponentCard",
        components: {
            DxChart,
            DxArgumentAxis,
            DxSeries,
            DxPoint,
            DxValueAxis,
            DxAnimation,
            DxLegend,
            DxCommonAxisSettings,
            DxGrid,
            DxBorder,
            DxVisualRange,
            DxTickInterval,
            DxWholeRange,
            CardWoTitle
        },
        props: {
            // dataLoaded: Boolean,
            cardData: Object,
            counter: Number
        },
        data: function () {
            return {
                height:'40%',
                isShowing: true,
                loading: true,
                chartRefName: "chart"
            }
        },
        methods: {
            updateChart() {
                this.isShowing = !this.isShowing;
                if (this.isShowing) this.height='40%';
                else this.height='80%';
                setTimeout(() => {
                    this.$refs[this.chartRefName].instance.render();
                });
            }
        },
        mounted() {
            this.loading = false;
            this.isShowing = true;

        },
    }
</script>

<style scoped>
</style>


