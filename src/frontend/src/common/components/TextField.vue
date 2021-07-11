<template>
  <label class="input">
    <span class="visually-hidden">
      {{ labelText }}
    </span>
    <input
      type="text"
      :name="name"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>
<script>
export default {
  name: "TextField",
  model: {
    prop: "value",
    event: "input",
  },
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
    value: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped></style>
