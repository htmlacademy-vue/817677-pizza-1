<template>
  <component :is="layout">
    <slot />
  </component>
</template>
<script>
const DEFAULT_LAYOUT = "AppLayoutDefault";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
<style lang="scss" scoped></style>
