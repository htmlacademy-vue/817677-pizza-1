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
      v-model.number="counterValue"
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
    counterValue: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      innerCounterValue: 0,
    };
  },
  watch: {
    innerCounterValue(newValue) {
      let result = newValue;

      if (result < 0) {
        result = 0;
      }

      if (isNaN(result)) {
        result = 0;
      }

      this.$emit("change-counter-value", result);
    },
  },
  methods: {
    decrimentCounter() {
      this.innerCounterValue = this.counterValue - 1;
    },
    incrementCounter() {
      this.innerCounterValue = this.counterValue + 1;
    },
    handleInputCounterValue(e) {
      this.innerCounterValue = parseInt(e.target.value);
      this.$emit("change-counter-value", parseInt(e.target.value));
    },
  },
};
</script>
<style lang="scss" scoped></style>
