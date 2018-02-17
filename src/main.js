import Vue from 'vue'
import Vuetify from 'vuetify'

import TheContainer from './the-container'
import router from './router'
import store from './store'
import eventBus from './plugins/event-bus'

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify, {theme: { primary: '#378FB0' }})
Vue.use(eventBus)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<TheContainer/>',
  components: { TheContainer }
})
