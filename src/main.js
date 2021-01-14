import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api"
import 'bootstrap';
import 'highlight.js/styles/github.css'
import $ from 'jquery'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { VueShowdown } from 'vue-showdown'
import 'github-markdown-css/github-markdown.css';
Vue.component('VueShowdown', VueShowdown)
// use mavonEditor
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.bus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
