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
