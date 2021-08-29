<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>
    <div class="sheet__content dough">
      <RadioButton
        v-for="{ name, description, value } in dough"
        :key="name"
        :label-classes="['dough__input', `dough__input--${value}`]"
        name="dough"
        :value="value"
        :checked="doughType === value"
        @change="$emit('change-dough', { name, value })"
      >
        <b>{{ name }}</b>
        <span>{{ description }}</span>
      </RadioButton>
    </div>
  </div>
</template>
<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  props: {
    dough: {
      type: Array,
      required: true,
    },
    doughType: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
