import { auth, isLoggedIn } from "@/middlewares";

const Builder = () => import("@/views/Builder.vue");
const Login = () => import("@/views/Login.vue");
const Cart = () => import("@/views/Cart.vue");
const Orders = () => import("@/views/Orders.vue");
const Profile = () => import("@/views/Profile.vue");

export default [
  {
    path: "/",
    name: "Builder",
    component: Builder,
    meta: {
      layout: "AppLayoutDefault",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "AppLayoutEmpty",
      middlewares: [auth],
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      layout: "AppLayoutDefault",
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      layout: "AppLayoutMain",
      middlewares: [auth, isLoggedIn],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayoutMain",
      middlewares: [auth, isLoggedIn],
    },
  },
];
