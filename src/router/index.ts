import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Group from "../views/Group.vue";
import Expenses from "../views/Expenses.vue";
import MemberDetails from "../views/MemberDetails.vue";
import Payout from "../views/Payout.vue";
import { auth } from "../firebase";

const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    meta: {
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
  {
    path: "/profile",
    component: Profile,
    name: "profile",
    meta: {
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
  { path: "/login", component: Login, name: "login" },
  {
    path: "/:group",
    component: Group,
    name: "group",
    props: true,
    meta: {
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
  {
    path: "/:group/expenses",
    component: Expenses,
    name: "expenses",
    props: true,
    meta: {
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
  {
    path: "/:group/:member",
    component: MemberDetails,
    name: "memberDetails",
    props: true,
    meta: {
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
  {
    path: "/:group/payout",
    component: Payout,
    name: "payout",
    props: true,
    meta: {
      requiresAuth: true, // Add this meta field to indicate authentication is required
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.currentUser; // Check if user is authenticated
  console.log(from);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If the route requires authentication
    if (isAuthenticated) {
      next(); // User is authenticated, proceed to the route
    } else {
      next("/login"); // User is not authenticated, redirect to login page
    }
  } else {
    next(); // Route doesn't require authentication, proceed
  }
});

export default router;
