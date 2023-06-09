import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { makeServer } from "./mirage/index";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import VueMask from "v-mask";
Vue.use(VueMask);
if (process.env.NODE_ENV === "development") {
  makeServer();
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
