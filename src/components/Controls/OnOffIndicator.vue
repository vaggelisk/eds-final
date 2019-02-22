<template>
    <v-card flat style="width : 100%; background-color: rgb(42,42,42); height:250px;">
        <v-card-title style="height:20%;" primary class="title">{{ indicatorData.Title }} </v-card-title>

        <v-card-actions fill-height style="width : 100%; height:80%;">          
            <v-container fluid grid-list-md fill-height>
                <v-layout row>
                    <v-flex d-flex v-for="(item,index) in indicatorData.Running" :key="item">            
                        <v-responsive contain>      
                            <v-layout column fill-height>
                                <v-flex d-flex md8>
                                     <div v-if="item==='ON'" class="numAct"> {{index+1}}</div>                                     
                                     <div v-else class="numInact"> {{index+1}}</div>
                                </v-flex>
                                <v-flex d-flex md4>
                                    <div v-if="item==='ON'" class="lbAct"> {{item}}</div>
                                    <div v-else class="lbInact"> {{item}}</div>
                                </v-flex> 
                            </v-layout>               
                        </v-responsive>  
                    </v-flex> 
                </v-layout>
            </v-container>  
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {
        name: "OnOffIndicator",
        components: {
        },
        props: {
            dataLoaded: Boolean,
            indicatorData: Object
        },
        data: function () {
            return {
                loading: true,
            }
        },
        mounted() {
            this.loading = false;    

        }, 
    }
</script>

<style scoped>
.numAct
{
    font-size: 80px;
    margin: 0;
    position: absolute;
    top: 25%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: white;
}

.numInact
{
    font-size: 80px;
    margin: 0;
    position: absolute;
    top: 25%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: rgb(66,66,66);
}

.lbAct
{
    font-size: 24px;
    margin: 0;
    position: absolute;
    top: 75%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: white;
}

.lbInact
{
    font-size: 24px;
    margin: 0;
    position: absolute;
    top: 75%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: rgb(66,66,66);
}
</style>


