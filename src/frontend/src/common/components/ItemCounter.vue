<template>
  <div class="counter counter--orange" :class="counterClasses">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="decrimentCounter"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="counterValue"
      @input="handleInputCounterValue"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="incrementCounter"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ItemCounter",
  props: {
    counterClasses: [Array, String],
  },
  data() {
    return {
      counterValue: 0,
    };
  },
  watch: {
    counterValue(newValue) {
      this.$emit("change-ingredient-count", newValue);
    },
  },
  methods: {
    decrimentCounter() {
      if (this.counterValue > 0) {
        this.counterValue -= 1;
      }
    },
    incrementCounter() {
      this.counterValue += 1;
    },
    handleInputCounterValue(e) {
      this.counterValue = parseInt(e.target.value);
      this.$emit("change-ingredient-count", this.counterValue);
    },
  },
};
</script>
<style lang="scss" scoped></style>
