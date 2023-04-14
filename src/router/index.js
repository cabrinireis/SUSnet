import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/LoginSusNet.vue"),
  },
  {
    path: "/list",
    name: "list",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "list" */ "../views/ListPatient.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const logged = JSON.parse(sessionStorage.getItem("loggerUser"));
  if (to.name !== "login" && !logged) next({ name: "login" });
  else next();
});

export default router;
