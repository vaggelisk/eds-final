// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {getData} from "./api/getData";


const theme = {
  primary: {
    base: '#f44336',
    darken1: '#b71c1c',
  },
  // primary:  '#f44336',
  secondary: '#b0bec5',
  accent: '#8c9eff',
  error: '#b71c1c',
};

// Vue.use(Vuetify, {theme} );
Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
} );

Vue.config.productionTip = false;

var apiService = new getData( );

export var globalStore = new Vue({
  data: {
    events: {},
    engMap: {},
    timelineData:{},
    counter:0
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  created() {
    // console.log(this.$vuetify);
    // this.$material.theme.primary = '#f44336';
    // this.$vuetify.theme = theme;
  },
  router,
  components: { App },
  template: '<App/>'
});
