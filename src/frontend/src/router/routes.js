const IndexHome = () => import("@/views/Index.vue");
const Login = () => import("@/views/Login.vue");
const Cart = () => import("@/views/Cart.vue");
const Orders = () => import("@/views/Orders.vue");
const Profile = () => import("@/views/Profile.vue");

export default [
  {
    path: "/",
    name: "IndexHome",
    component: IndexHome,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "EmptyLayout",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "AppLayout",
    },
  },
];
