<template>
    <v-card flat style="width : 100%; background-color: rgb(42,42,42); height:250px;">
        <v-select v-model="select" :items="items" item-text="Title" return-object="true" flat  primary class="title" style="height:20%; padding:16px; margin:0px; ">
        </v-select> 
        <CardWoTitle
            v-bind:cardData="select"            
            v-bind:inDropDown=true /> 
    </v-card>
</template>

<script>
import CardWoTitle from './CardWoTitle'

export default {
  name: "DropDownCard",
  components: { CardWoTitle },
  props: {
      items:Object
  },
  data: function() {
    return {
      select: this.items[0],
    };
  },
  watch:
  {
    select : function(newSelect)
    {
        console.log(newSelect.Value);
    }
  },
  methods: {},
  mounted() {
        //this.select = this.items[0];
  }
};
</script>

<style scoped>
</style>
