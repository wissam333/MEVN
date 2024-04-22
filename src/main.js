import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

/* import Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

/* import main scss file */
import "./assets/main.scss";

/* import bootstrap icons */
import "bootstrap-icons/font/bootstrap-icons.css";

/* apex chart */
import VueApexCharts from "vue3-apexcharts";

/* Toast */
import ToastPlugin from "vue-toast-notification";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueApexCharts);

app.mount("#app");
