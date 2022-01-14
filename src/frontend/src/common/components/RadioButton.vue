<template>
  <label :class="labelClasses">
    <input
      type="radio"
      :name="name"
      :value="value"
      class="visually-hidden"
      :checked="checked"
      @change="$emit('change', $event.target.value)"
    />
    <slot />
  </label>
</template>
<script>
export default {
  name: 'RadioButton',

  props: {
    labelClasses: {
      type: [Array, String],
      default: ''
    },

    name: {
      type: String,
      required: true
    },

    value: {
      type: String,
      required: true
    },

    checked: {
      type: Boolean,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/blocks/radio.scss";
</style>
