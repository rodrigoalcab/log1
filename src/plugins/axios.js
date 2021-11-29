import Vue from 'vue'
import axios from 'axios'

//axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
axios.defaults.baseURL = 'http://localhost:8080'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})