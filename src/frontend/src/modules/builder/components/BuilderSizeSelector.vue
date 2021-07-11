<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>
    <div class="sheet__content diameter">
      <RadioButton
        v-for="{ name, value } in sizes"
        :key="value"
        :label-classes="['diameter__input', `diameter__input--${value}`]"
        name="diameter"
        :value="value"
        :checked="selectedSize === value"
        @change="$emit('change-size', value)"
      >
        <span>{{ name }}</span>
      </RadioButton>
    </div>
  </div>
</template>
<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    RadioButton,
  },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    selectedSize: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
