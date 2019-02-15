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
                                    <v-avatar flat id="okImg" >
                                        <img alt=""> 
                                    </v-avatar>
                                </v-responsive>
                            </v-flex>
                            <v-flex d-flex md6>
                                 <v-responsive contain>  
                                    <v-avatar flat id="warnImg" >
                                        <img alt=""> 
                                    </v-avatar>
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

    export default {
        name: "AutomationCard",
        components: {
        },
        props: {
            cardData: Object,
            counter: Number
        },
        data: function () {
            return {
                isShowing: true,
                loading: true, 
                warnActive:require('../../assets/diagOrange_dark.png'),
                warnInactive:require('../../assets/warn_inactive_dark.png'),
                okActive:require('../../assets/diagGreen_dark.png'),
                okInactive:require('../../assets/ok_inactive_dark.png')
            }
        },
        methods: {
        },
        mounted() {
            this.loading = false;
            this.isShowing = true;  
            document.getElementById("okImg").childNodes[0].src = this.okActive;
            document.getElementById("warnImg").childNodes[0].src = this.warnInactive;      

        },
        watch:
        {
            counter: function(c)
            {     
                if (this.cardData.Value<100)
                {
                    document.getElementById("okImg").childNodes[0].src = this.okInactive;
                    document.getElementById("warnImg").childNodes[0].src = this.warnActive;
                }
                else
                {                        
                    document.getElementById("okImg").childNodes[0].src = this.okActive;
                    document.getElementById("warnImg").childNodes[0].src = this.warnInactive;
                }
            } 
        }     
    }
</script>

<style scoped>
</style>


