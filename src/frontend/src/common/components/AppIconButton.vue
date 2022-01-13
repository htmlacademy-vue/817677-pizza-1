<template>
  <button
    type="button"
    class="icon"
    v-on="$listeners"
  >
    <span class="visually-hidden">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'AppButton'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/icon.scss";
</style>
