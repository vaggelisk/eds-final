<template>
    <div class="container">
        kfjhfbjk
        <!--<div class="gauge-bg"></div>-->
        <!--<div class="gauge-middle"></div>-->
        <!--<div class="gauge-overlay" :style="{ transform: rotate }"></div>-->
        <div class="gauge-data">
            <span>{{ percentage }}%</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Gauge",
        props: ['percentage'],
        computed: {
            rotate() {
                const v = this.percentage * 180 / 100;
                return `rotate(${v}deg)`
            }
        }
    }
</script>

<style scoped>
    /*@gauge-width: 100px;*/
    /*@gauge-heigth: @gauge-width / 2;*/
    /*@gauge-bar-width: 20px;*/
    /*@middle-width: @gauge-width - (@gauge-bar-width * 2);*/

    /*@gauge-color: #5df086;*/
    /*@gauge-bg-color: lighten(@gauge-color, 15%);*/

    /*.container {*/
        /*width: @gauge-width;*/
        /*height: @gauge-heigth;*/
        /*position: absolute;*/
        /*top: 0;*/
        /*overflow: hidden;*/
    /*}*/

    /*.gauge-bg {*/
        /*z-index: 1;*/
        /*width: @gauge-width;*/
        /*height: @gauge-heigth;*/
        /*position: absolute;*/
        /*background-color: @gauge-bg-color;*/
        /*border-radius: @middle-width @middle-width 0 0;*/
    /*}*/

    /*.gauge-middle {*/
        /*z-index: 3;*/
        /*position: absolute;*/
        /*background-color: #4d4d4d;*/
        /*width: @middle-width;*/
        /*height: calc(@middle-width / 2);*/
        /*top: @gauge-bar-width;*/
        /*margin-left: @gauge-bar-width;*/
        /*margin-right: auto;*/
        /*border-radius: @middle-width @middle-width 0 0;*/
    /*}*/

    /*.gauge-overlay {*/
        /*z-index: 2;*/
        /*position: absolute;*/
        /*background-color: @gauge-color;*/
        /*width: @gauge-width;*/
        /*height: @gauge-heigth;*/
        /*top: @gauge-heigth;*/
        /*border-radius: 0 0 @gauge-heigth @gauge-heigth;*/
        /*transform-origin: center top;*/
    /*}*/

    .gauge-data {
        z-index: 4;
        color: #5df086;
        position: absolute;
        width: @gauge-width;
        bottom: 0;
        text-align: center;
        font-size: 24px;
    }
</style>