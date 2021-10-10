<template>
  <AppDrop
    class="pizza"
    :class="`pizza--foundation--${this.normalizeDoughType}-${this.sauce}`"
    @drop="addIngredient"
  >
    <div class="pizza__wrapper">
      <transition-group name="roll" mode="out-in">
        <div
          v-for="{ value, count } in ingredients"
          v-show="count > 0"
          :key="value"
          class="pizza__filling"
          :class="[
            count > 0 ? `pizza__filling--${value}` : '',
            count > 1 ? `pizza__filling--${countIngredients(count)}` : '',
          ]"
        ></div>
      </transition-group>
    </div>
  </AppDrop>
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
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show: false,
    };
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
      if (ingredient.count === 3) {
        return;
      }

      this.$emit("change-ingredient-count", {
        ...ingredient,
        count: ingredient.count + 1,
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
<style lang="scss" scoped>
.roll-enter-active {
  animation: roll-in 0.5s;
}
.roll-leave-active {
  animation: roll-in 0.5s reverse;
}
@keyframes roll-in {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
