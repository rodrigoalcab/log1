import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})