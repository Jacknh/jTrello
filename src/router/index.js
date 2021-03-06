import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Board from "../views/Board.vue";
import Task from "../views/Task.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/board",
      name: "board",
      component: Board,
      meta: {requiresAuth: true},
      children: [
        {
          path: "task/:id",
          name: "task",
          component: Task,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some(record => record.meta.requiresAuth) && !token ) {
    next('/')
  }
  else {
    next();
  }
})

export default router;