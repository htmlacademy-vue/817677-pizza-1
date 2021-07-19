<template>
  <div>
    <HeaderLayout />
    <slot />
  </div>
</template>
<script>
import HeaderLayout from "@/layouts/HeaderLayout";

export default {
  name: "AppLayoutDefault",
  components: {
    HeaderLayout,
  },
};
</script>
<style lang="scss" scoped></style>
