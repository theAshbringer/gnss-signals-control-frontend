import { createApp } from "vue";
import PrimeVue from "primevue/config";
import VueSidebarMenu from "vue-sidebar-menu";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

createApp(App)
  .use(store)
  .use(router)
  .use(VueSidebarMenu)
  .use(PrimeVue, { ripple: true })
  .mount("#app");
