<template>
  <AppDrop
    class="pizza"
    :class="`pizza--foundation--${this.normalizeDoughType}-${this.sauce}`"
    @drop="addIngredient"
  >
    <div class="pizza__wrapper">
      <div
        v-for="{ value } in ingredients"
        :key="value"
        :class="`pizza__filling pizza__filling--${value}`"
      ></div>
    </div>
  </AppDrop>
</template>
<script>
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  props: {
    dough: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    sauce: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    normalizeDoughType() {
      const doughType = {
        light: "small",
        large: "big",
      };

      return doughType[this.dough];
    },
  },
  methods: {
    addIngredient(ingredient) {
      let { value, count } = ingredient;

      this.$emit("change-ingredient-count", { value, count: count + 1 });
    },
  },
};
</script>
<style lang="scss" scoped></style>
