import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import Login from "./views/login.vue";
import Register from "./views/register.vue";
import Moments from "./views/moments.vue";
import Publish from "./views/publish.vue";
import Information from './views/information.vue'
import Chat from './views/chatView.vue'

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/chats",
      component: Index,
      children: [
        {
          path: "/chats",
          name: "chats",
          component: () => import("./views/chats.vue")
        },
        {
          path: "/me",
          name: "me",
          component: () => import("./views/me.vue")
        },
        {
          path: "/discover",
          name: "discover",
          component: () => import("./views/discover.vue")
        },
        {
          path: "/contact",
          name: "contact",
          component: () => import("./views/contact.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/moments",
      name: "moments",
      component: Moments
    },
    {
      path: "/publish",
      name: "publish",
      component: Publish
    },
    {
      path: "/information",
      name: "information",
      component: Information
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.wxToken ? true : false;
  if (to.path == "/login" || to.path == "/register") next();
  else isLogin ? next() : next("/login");
});

export default router;
