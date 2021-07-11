<template>
  <div
    class="pizza"
    :class="`pizza--foundation--${this.normalizeDoughType}-${this.sauce}`"
  >
    <div class="pizza__wrapper">
      <div
        v-for="ingredient in ingredientsNames"
        :key="ingredient"
        :class="`pizza__filling pizza__filling--${ingredient}`"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BuilderPizzaView",
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
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ingredientsNames() {
      return Object.keys(this.ingredients);
    },
    normalizeDoughType() {
      const doughType = {
        light: "small",
        large: "big",
      };

      return doughType[this.dough];
    },
  },
};
</script>
<style lang="scss" scoped></style>
