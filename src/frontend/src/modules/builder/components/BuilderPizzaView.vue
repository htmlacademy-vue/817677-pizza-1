<template>
  <AppDrop
    class="pizza"
    :class="`pizza--foundation--${this.normalizeDoughType}-${this.sauce}`"
    @drop="addIngredient"
  >
    <div class="pizza__wrapper">
      <div
        v-for="{ value, count } in ingredients"
        :key="value"
        class="pizza__filling"
        :class="[
          count > 0 ? `pizza__filling--${value}` : '',
          count > 1 ? `pizza__filling--${countIngredients(count)}` : '',
        ]"
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

      if (count === 3) {
        return;
      }

      this.$emit("change-ingredient-count", {
        value,
        count: count + 1,
      });
    },
    countIngredients(count) {
      const countToString = {
        1: "",
        2: "second",
        3: "third",
      };

      return countToString[count];
    },
  },
};
</script>
<style lang="scss" scoped></style>
