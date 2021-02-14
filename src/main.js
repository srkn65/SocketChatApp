import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueSocketIO from 'vue-socket.io'
import "bootstrap/dist/css/bootstrap.min.css"
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://srknkrkc.pythonanywhere.com/',
  // vuex: {
  //     store,
  //     actionPrefix: 'SOCKET_',
  //     mutationPrefix: 'SOCKET_'
  // },
  // options: { path: "/my-app/" } //Optional options
}))
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
