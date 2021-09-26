<template>
  <label class="input" :class="{ 'has-error': showError, [classes]: classes }">
    <span :class="{ 'visually-hidden': labelIsHidden }">
      {{ labelText }}
    </span>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
    <span v-if="showError" class="text-field__text">
      {{ errorText }}
    </span>
  </label>
</template>

<script>
export default {
  name: "AppInput",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    labelText: {
      type: String,
      required: true,
    },
    labelIsHidden: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: "",
    },
  },
  computed: {
    showError() {
      return !!this.errorText;
    },
  },
};
</script>

<style lang="scss" scoped>
.has-error {
  color: red;
}
</style>
