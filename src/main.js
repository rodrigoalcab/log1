import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import './plugins/axios'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import vuetify from './plugins/vuetify' // path to vuetify export

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)


Vue.mixin({
  methods: {
    newMessage(array, content, variant) {
        array.push({
        text: content,
        type: variant
      })
    },
    clearFields(object) {
      Object.keys(object).forEach(key => {
         object[key] = '';
      })
    }
  }
})

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
