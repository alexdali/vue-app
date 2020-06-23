import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import Settings from "@/views/Settings";
import { auth } from "../firebaseConfig";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/dashboard"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = auth.currentUser;

  //   if (requiresAuth && !currentUser) {
  //     next("/login");
  //   } else if (requiresAuth && currentUser) {
  //     next();
  //   } else next();
  // });
  requiresAuth && !currentUser && next("/login");
  requiresAuth && currentUser && next();
  next();
});

export default router;
