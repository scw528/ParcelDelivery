import Vue from 'vue';
import './plugins/vuetify';
import * as firebase from 'firebase';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import { store } from './store';
import alertMessage from './components/shared/alert.vue';


// Required for side-effects
require('firebase/firestore');

Vue.use(Vuetify);
Vue.config.productionTip = false;
Vue.component('app-alert', alertMessage);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCN58EceRKYDScEae-keuCkrR3Nxi6FLTc',
      authDomain: 'vueexample-85e2b.firebaseapp.com',
      databaseURL: 'https://vueexample-85e2b.firebaseio.com',
      projectId: 'vueexample-85e2b',
      storageBucket: '',
      messagingSenderId: '290518738444',
      appId: '1:290518738444:web:735402aaed835631',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLogin', user);
      }
    });
  },
}).$mount('#app');


// eslint-disable-next-line no-unused-vars
const db = firebase.firestore();
export default db;
