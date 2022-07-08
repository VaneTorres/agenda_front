import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App).use(store).use(router).mount("#app");
createApp(App).use(VueSweetalert2);
