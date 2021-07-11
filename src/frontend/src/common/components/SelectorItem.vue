<template>
  <span class="filling" :class="classes">
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: "SelectorItem",
  props: {
    classes: [Array, String],
  },
};
</script>
<style lang="scss" scoped></style>
