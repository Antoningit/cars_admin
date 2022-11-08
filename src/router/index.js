import Vue from "vue";
import store from "../store/index";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/addnew",
    name: "addnew",
    component: () => import("../views/AddNew.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/changecar/:id",
    name: "changecar",
    component: () => import("../views/ChangeCar.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some((record) => record.meta.requiresAuth);
  //const isToken = localStorage.getItem("token") != null;
  const isLoggedIn = store.getters.isLoggedIn;
  if (requiredAuth && !isLoggedIn) {
    next("/login");
    return;
  }
  next();
});

export default router;
