<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>

<script>
import Index from "@/views/Index.vue";
import Login from "@/views/Login.vue";
import Cart from "@/views/Cart.vue";
import Orders from "@/views/Orders.vue";
import Profile from "@/views/Profile.vue";

export default {
  name: "App",
  components: {
    Index,
    Login,
    Cart,
    Orders,
    Profile,
  },
  created() {
    this.DEFAULT_LAYOUT = "AppLayout";
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || this.DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
