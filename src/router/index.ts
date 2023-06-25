import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Group from "../views/Group.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/profile", component: Profile },
  { path: "/login", component: Login },
  { path: "/:group", component: Group, name: "group" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
