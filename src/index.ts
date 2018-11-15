import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './asset/sass/style';

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

try {
  if (window.console && window.console.log) {
    console.log('%c Created By shiluo34 %c', 'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff', 'background:#3880ff ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff');
  }
} catch (e) {}