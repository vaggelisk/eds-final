<template>
    <v-card style="height: 100%; width : 100%; background-color: rgb(42,42,42);max-height:250px;">
        <v-card-title style="height:20%;" primary class="title">{{ tlData.Title }} </v-card-title>

        <v-card-actions fill-height  style="width : 100%; height:80%;">
             <!-- <v-container fluid>
                <v-layout row wrap  style="width:100%; height:100%" >
                    <v-flex d-flex> -->   
                        <v-responsive style="width : 100%; height:100%;" contain>     
                            <dx-chart  id="chart"
                                        style="width : 100%; height:100%;"
                                        :dataSource="tlData.datapoints" 
                                        :customize-point="customizePoint" >
                                <dx-animation :enabled="false"/>
                                <dx-legend :visible="false"/>
                                <dx-value-axis>
                                    <dx-grid color="rgb(67,67,67)"/>
                                </dx-value-axis>
                                <dx-argument-axis> 
                                    <dx-tick-interval miliseconds="60000"/> 
                                    <!-- <dx-visual-range :start-value="minValue" :end-value="maxValue"/>     -->
                                </dx-argument-axis>
                                <dx-series
                                        color="rgb(92, 92, 92)"
                                        type="rangeArea"
                                        argument-field="date"
                                        range-value1-field="valMin"
                                        range-value2-field="valMax"
                                        name="Range">
                                        <dx-border color="rgb(26,26,26)"
                                                    visible="true"
                                                    width="1"/>
                                </dx-series>
                                <dx-series
                                        type="scatter"
                                        argument-field="date"
                                        value-field="val"
                                        name="Values">
                                    <dx-point size="4"/>
                                </dx-series>
                            </dx-chart>
                        </v-responsive>
                   <!--  </v-flex>
                </v-layout>
            </v-container> -->
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
        DxTickInterval,
        DxBorder
    } from 'devextreme-vue/chart';

    export default {
        name: "TimelineChart",
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
            DxTickInterval,
            DxBorder
        },
        props: {
            dataLoaded: Boolean,
            tlData: Object,
            counter: Number,
        },
        data: function () {
            return {
                isShowing: true,
                loading: true
            }
        },
        methods: {
            updateChart() {
                this.isShowing = !this.isShowing;
                const test = document.getElementById(this._self._uid);
                test.__vue__._render;
            },           
            customizePoint(arg) {
                if (arg.series.type == "scatter")
                {
                    if (arg.data.color == "red") return { color : 'rgb(205, 57, 64)'};
                    else return { color: 'rgb(60, 171, 48)'};
                }
            }, 
            onResize(event)
            {
                this.chart._render();
            }
        },
        mounted() {
            this.chart._render();

            //window.addEventListener('resize', this.onResize);

            this.loading = false;
            this.isShowing = true;
            //document.getElementById('chart').setAttribute('id',this._self._uid);            

        }
    }
</script>

<style scoped>
</style>


