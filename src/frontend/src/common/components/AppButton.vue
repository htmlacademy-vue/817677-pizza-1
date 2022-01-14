<template>
  <button
    class="button"
    :disabled="disabled"
    :class="{
      'button--disabled': disabled,
      'button--border': border,
      'button--transparent': transparent,
      'button--arrow': arrow,
      'button--white': white,
      [classes]: classes,
    }"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: 'AppButton',

  props: {
    type: {
      type: String,
      default: 'button'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    border: {
      type: Boolean,
      default: false
    },

    transparent: {
      type: Boolean,
      default: false
    },

    arrow: {
      type: Boolean,
      default: false
    },

    white: {
      type: Boolean,
      default: false
    },

    classes: {
      type: [Array, String],
      default: ''
    }
  }
};
</script>
<style lang="scss">
@import "~@/assets/scss/blocks/button.scss";
</style>
