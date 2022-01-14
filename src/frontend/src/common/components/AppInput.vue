<template>
  <label
    class="input"
    :class="{ 'has-error': showError, 'input--big-label': bigLabel }"
  >
    <span :class="{ 'visually-hidden': labelIsHidden }">
      {{ labelText }}
    </span>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :required="required"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    />
    <span
      v-if="showError"
      class="text-field__text"
    >
      {{ errorText }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'AppInput',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    labelText: {
      type: String,
      required: true
    },

    bigLabel: {
      type: Boolean,
      default: false
    },

    labelIsHidden: {
      type: Boolean,
      default: false
    },

    value: {
      type: [String, Number],
      required: true
    },

    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: 'text'
    },

    placeholder: {
      type: String,
      default: ''
    },

    errorText: {
      type: String,
      default: ''
    },

    required: {
      type: Boolean,
      default: false
    },

    classes: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    showError() {
      return !!this.errorText;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/input.scss";

.has-error {
  color: red;
}
</style>
