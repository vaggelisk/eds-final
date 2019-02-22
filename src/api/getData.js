import axios         from 'axios';
import {globalStore}            from "../main.js"

const API_URL = 'http://localhost:8092';
const mockUp = true;

export class getData {

    constructor( ){
        if (mockUp) this.counter = 31;
        else this.counter = 1;

        this.interval =0;        

        this.getMapping();

        this.getDataFromEvents();

        this.getTimelineData();

        
        this.getHyperCubeData();

        this.getServoOilData();
            
        this.getFuelInjData();
        
        this.getExhGasData();

        this.getPistonRunData();

        if (mockUp) this.startIntervalMockUp();
        else this.startInterval();
    }


    getDataFromEvents() {
        
        let url  = API_URL+"/EDSEvents/" + this.counter;

        axios.get(url).then(response => {           
            
            globalStore.events = response.data; });
    }

    getTimelineData() {

        let url  = API_URL+"/EDSTimelineData/" + this.counter;

        axios.get(url).then(response => {
            
            globalStore.timelineData = response.data; });
    }

    getServoOilData() {

        let url  = API_URL;
        
        if (mockUp) url+="/ServoOilData/"
        else url+="/EDSCDgSOResults/";
        
        url+=this.counter;

        axios.get(url).then(response => {
            
            globalStore.soData = response.data; });
    }

    getFuelInjData() {

        let url  = API_URL;
        
        if (mockUp) url+="/FuelInjData/"
        else url+="/EDSCDgFIResults/";
        
        url+=this.counter;

        axios.get(url).then(response => {
            
            globalStore.fiData = response.data; });
    }

    getHyperCubeData() {

        let url  = API_URL;
        
        if (mockUp) url+="/HyperCubeData/"
        else url+="/EHCResults/";
        
        url+= this.counter;

        axios.get(url).then(response => {
            
            globalStore.ehcData = response.data; });
    }

    getExhGasData()
    {    
        let url  = API_URL;
        
        if (mockUp) url+="/ExhaustGasData/"
        else url+="/EDSCDgEGResults/";
        
        url+= this.counter;

        axios.get(url).then(response => {
            
            globalStore.egData = response.data; });    
    }
    getPistonRunData()
    {
        let url  = API_URL;
        
        if (mockUp) url+="/PistonRunData/"
        else url+="/EDSCDgPRResults/";
        
        url+=this.counter;

        axios.get(url).then(response => {
            
            globalStore.prData = response.data; });

    }

    getMapping()
    {
        if (mockUp)
        {
            axios.get(API_URL+"/EDSMapping").then(response => 
            {
                globalStore.engMap = response.data; });            
        }
        else
        {            
            axios.get(API_URL+"/EDSWxsData/"+this.counter).then(response => 
                {
                    globalStore.engMap = response.data; });           
        }   
    }

    startInterval() {
        this.interval = setInterval(() => {

            this.getLatestIndex();
            
            this.getMapping();

            this.getDataFromEvents();
            
            this.getTimelineData();
            
            this.getFuelInjData();

            this.getHyperCubeData();

            console.log("getData "+ this.counter);
            
            globalStore.counter = this.counter;
          
        }, 60000)
    }

    startIntervalMockUp() {
        this.interval = setInterval(() => {
          if (this.counter < 60) {

            this.getDataFromEvents();
            
            this.getTimelineData();                   
            
            this.getHyperCubeData();

            this.getServoOilData();
            
            this.getFuelInjData();

            this.getExhGasData();
           
            this.getPistonRunData();

            console.log("getData "+ this.counter);
            
            this.counter = this.counter + 1;

            globalStore.counter = this.counter;

          } else {
            this.counter =31;
          }
        }, 5000)
    }

    getLatestIndex()
    {
        axios.get(API_URL+"/EDSLatestIndex").then(response => 
        {
            this.counter = response.data; }); 
    }


}
