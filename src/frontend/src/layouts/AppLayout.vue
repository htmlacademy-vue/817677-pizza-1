<template>
  <component :is="layout">
    <slot />
  </component>
</template>
<script>
const DEFAULT_LAYOUT = 'AppLayoutDefault';

export default {
  name: 'AppLayout',

  computed: {
    layout() {
      const layout = this.$route.meta.layout || DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    }
  }
};
</script>
<style lang="scss">
// layout
@import "~@/assets/scss/layout/main.scss";
@import "~@/assets/scss/layout/header.scss";
@import "~@/assets/scss/layout/content.scss";
@import "~@/assets/scss/layout/sheet.scss";
@import "~@/assets/scss/layout/container.scss";
@import "~@/assets/scss/layout/layout.scss";
</style>
