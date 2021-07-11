<template>
  <div>
    <HeaderLayout />
    <Index />
  </div>
</template>
<script>
import HeaderLayout from "@/layouts/HeaderLayout";
import Index from "@/views/Index";

export default {
  name: "AppLayout",
  components: {
    Index,
    HeaderLayout,
  },
};
</script>
<style lang="scss" scoped></style>
