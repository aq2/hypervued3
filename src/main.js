// import vues
import Vue from 'vue'
import App from './App.vue'

// vuex datastore
import {store} from './store'

// http stuff
import VueResource from 'vue-resource'
Vue.use(VueResource)

// firebase
import VueFire from 'vuefire'
Vue.use(VueFire)

// awesome icons
// cheaper to import them as you need them
import 'vue-awesome/icons/bar-chart'
import 'vue-awesome/icons/line-chart'
import 'vue-awesome/icons/pie-chart'
import 'vue-awesome/icons/folder-open'
import 'vue-awesome/icons/area-chart'
import 'vue-awesome/icons/window-restore'
import 'vue-awesome/icons/file-text-o'
import 'vue-awesome/icons/file-excel-o'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/upload'
import 'vue-awesome/icons/cloud'
import 'vue-awesome/icons/tasks'
import 'vue-awesome/icons/database'
import 'vue-awesome/icons/chevron-circle-right'
import 'vue-awesome/icons/chevron-circle-left'
import 'vue-awesome/icons/bicycle'
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/search'

// import 'vue-awesome/icons'  // !! warns bundles all icons = 500kB
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

export const EventBus = new Vue()

// start the app
new Vue({
  el: '#app',
  store,
  // router,
  render: h => h(App)
})
