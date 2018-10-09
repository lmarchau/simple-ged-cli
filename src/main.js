// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'

Vue.use(Vuetify)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.interceptors.push(function (request) {
  // modify headers
  let token = localStorage.getItem('token')
  if (token !== null) {
    request.headers.set('Authorization', 'Bearer ' + token)
  }

  return function (response) {
    if (response.status === 401 || response.status === 403) {
      this.$router.push({name: 'login'})
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
