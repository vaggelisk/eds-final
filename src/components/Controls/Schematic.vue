<template>
  <div id="schemDiv" style="width:100%,height:100%;"> 
    <div class="image-box">
      <img class="schem" alt=""> 
      <v-avatar v-for="point in points" :key="point.Key" class="schem-btn" flat v-on:click="buttonClick" >
        <img alt=""> 
      </v-avatar>
    </div>
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card id="popUp">
          <v-card-title></v-card-title>
          <v-card-text>
            <v-btn class="dialog-btn" v-for="ev in currEvents" :key="ev" flat href="/troubleshooting">{{ev.subComponent}} {{ev.index}}<br>{{ev.fault}}</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn class="close-btn"flat v-on:click="hideDialog">Close</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

  import axios from "axios";

  export default {
    name: "Schematic",
    components: {
    },
    props: {
        schematicSource: String,
        points: Object,        
        initWidth: Number,
        initHeight: Number,
        idName: String,
    }, 
    data: function() {
      return {        
        counter:1,
        red:require('../../assets/diagRed_dark.png'),
        redSel:require('../../assets/diagRedSel_dark.png'),
        orange:require('../../assets/diagOrange_dark.png'),
        orangeSel:require('../../assets/diagOrangeSel_dark.png'),
        green:require('../../assets/diagGreen_dark.png'),
        greenSel:require('../../assets/diagGreenSel_dark.png'),
        showDialog:false,
        currEvents:[]
      };
    },
    mounted() {
      window.addEventListener('resize', this.onResize);
      
      document.getElementById("schemDiv").id = this.idName;
      
      document.getElementById("popUp").id = this.idName+"popUp";

      document.getElementById(this.idName).getElementsByClassName("schem")[0].src = this.schematicSource;

      var elList = document.getElementById(this.idName).getElementsByClassName("schem-btn");

      var height = document.getElementById(this.idName).getElementsByClassName("image-box")[0].clientHeight;
      var width = document.getElementById(this.idName).getElementsByClassName("image-box")[0].clientWidth;    

      for(let i=0;i< elList.length;i++)
      {
        let key = Object.keys(this.points)[i]

        elList[i].style.top = ((this.points[key].y*height)/this.initHeight)+"px";
        elList[i].style.left = ((this.points[key].x*width)/this.initWidth)+"px";
        elList[i].id = key;

        elList[i].childNodes[0].src = this.green;
      }

      this.getEvents();
      this.startInterval();
    }, 
    
    methods: {
    startInterval: function () {
      this.interval = setInterval(() => {
        if (this.counter < 60) {
          this.getEvents();
          this.updateButtons();
          this.counter = this.counter + 1;
        } else {
          this.counter =1;
        }
      }, 5000)
    },
    onResize(event)
    {     
      var height = document.getElementById(this.idName).getElementsByClassName("image-box")[0].clientHeight;
      var width = document.getElementById(this.idName).getElementsByClassName("image-box")[0].clientWidth;

      for(var key in this.points)
      {
        let btn = document.getElementById(key);
        btn.style.top = ((this.points[key].y*height)/this.initHeight)+"px";
        btn.style.left = ((this.points[key].x*width)/this.initWidth)+"px";
      }
    }, 
    getEvents: function()
    {
     let url  = "http://localhost:8092/EDSEvents/" + this.counter;

      axios.get(url).then(response => {

        let helperMatrix = response.data;

        var aggrEvents = helperMatrix.aggrEvents;       

        for(var key in this.points)
        { 
          let compEvents = aggrEvents.filter(function (item) {
              return item.subComponent == key;
          });

          if (compEvents.length == 0)
          {
            this.$set(this.points[key],'color',0);
            this.$set(this.points[key], 'events', []);
          }
          else
          {
            let mx = Math.max.apply(Math, compEvents.map(function(item){return item.color;}));
            this.$set(this.points[key],'color',mx);
            this.$set(this.points[key], 'events', compEvents);
          }
        }

      });

    },
    updateButtons: function()
    {
       for(var key in this.points)
        {
          let btn = document.getElementById(key);
          
          if (this.points[key].selected)
          {
            if (this.points[key].color == 0) btn.childNodes[0].src = this.greenSel;
            else if (this.points[key].color == 10) btn.childNodes[0].src = this.orangeSel;
            else btn.childNodes[0].src = this.redSel;
          }
          else
          {
            if (this.points[key].color == 0) btn.childNodes[0].src = this.green;
            else if (this.points[key].color == 10) btn.childNodes[0].src =this.orange;
            else btn.childNodes[0].src = this.red;
          }
          
        }
    },
    buttonClick(event)
    {
      let key = event.currentTarget.id;

      this.updateDialog(key);
      this.showDialog = true;

      this.$set(this.points[key], 'selected',true);

      for (var other in this.points)
        if (other!=key) this.unSelectBtn(other);

      let btn = document.getElementById(key);
          
      if (this.points[key].color == 0) btn.childNodes[0].src = this.greenSel;
      else if (this.points[key].color == 10) btn.childNodes[0].src = this.orangeSel;
      else btn.childNodes[0].src = this.redSel;
    },
    unSelectBtn: function(key)
    {
      this.$set(this.points[key], 'selected',false);

      let btn = document.getElementById(key);

      if (this.points[key].color == 0) btn.childNodes[0].src = this.green;
      else if (this.points[key].color == 10) btn.childNodes[0].src =this.orange;
      else btn.childNodes[0].src = this.red;
    },
    updateDialog: function(key)
    {
      let popUp = document.getElementById(this.idName+"popUp");

      this.currEvents = this.points[key].events;

      if (this.points[key].color == 0) popUp.style.borderColor = "rgb(60, 171, 48)";
      else if (this.points[key].color == 10) popUp.style.borderColor = "rgb(255, 184, 29)";
      else popUp.style.borderColor = "rgb(205, 57, 64)";  
      
      popUp.getElementsByClassName("v-card__title")[0].textContent = key;
    },
    hideDialog: function()
    {
      this.showDialog=false;

      for (var key in this.points)
        if (this.points[key].selected) this.unSelectBtn(key);

    }
  },
  };
</script>
<style>
  .image-box {
    height: 100%;
    width: 100%;  
    background-color: rgb(42,42,42)
  }

  .schem{
    height: 100%;
    width: 100%;  
  }  
  .schem-btn
  {
    position:absolute;
    height: 25px;
    width: 25px;
  }
  .dialog-btn
  {
    width: 100%;
    text-transform: none !important;  
    text-align:left;
    height:50px;
    padding: 5px;
  }
  .popUp
  {
    background-color: rgb(31,31,31);
    border-style: solid;
    border-width: 2px;  
  }
  .close-btn
  {
    color:white;
    background-color: rgb(51,82,128);    
    text-align:justify;
  }
</style>
