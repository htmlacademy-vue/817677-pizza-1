<template>
  <div>
    <HeaderLayout />
    <router-view />
  </div>
</template>
<script>
import HeaderLayout from "@/layouts/HeaderLayout";

export default {
  name: "AppLayout",
  components: {
    HeaderLayout,
  },
};
</script>
<style lang="scss" scoped></style>
