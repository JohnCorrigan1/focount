import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { auth } from "./firebase";

// createApp(App).use(router).mount("#app");

auth.onAuthStateChanged(async (user) => {
  var user = await auth.currentUser;
  createApp(App).use(router).mount("#app");
});
