<template>
  <label class="input">
    <span class="visually-hidden">
      {{ labelText }}
    </span>
    <input
      type="text"
      :value="value"
      @input="$emit('input', e.target.value)"
      :name="name"
      :placeholder="placeholder"
    />
  </label>
</template>
<script>
export default {
  name: "TextField",
  props: {
    labelText: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: String,
  },
};
</script>
<style lang="scss" scoped></style>
