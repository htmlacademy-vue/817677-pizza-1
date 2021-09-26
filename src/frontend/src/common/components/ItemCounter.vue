<template>
  <div class="counter" :class="counterClasses">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :class="{ 'counter__button--disabled': counterValue === 0 }"
      :disabled="counterValue === 0"
      @click="decrementCounter"
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
      :class="{
        'counter__button--disabled': counterValue === this.maxCounterValue,
        'counter__button--orange': counterColor === 'orange',
      }"
      :disabled="counterValue === this.maxCounterValue"
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
    counterColor: String,
    counterValue: {
      type: Number,
      required: true,
    },
    maxCounterValue: {
      type: Number,
      default: Infinity,
    },
  },
  data() {
    return {
      innerCounterValue: 0,
    };
  },
  watch: {
    innerCounterValue(newValue) {
      this.$emit("change-counter-value", newValue);
    },
    counterValue(newValue) {
      this.innerCounterValue = newValue;
    },
  },
  methods: {
    decrementCounter() {
      this.innerCounterValue = this.counterValue - 1;
    },
    incrementCounter() {
      this.innerCounterValue = this.counterValue + 1;
    },
    handleInputCounterValue(e) {
      let result = parseInt(e.target.value);

      if (result < 0 || isNaN(result)) {
        result = 0;
      }

      if (result > this.maxCounterValue) {
        result = this.maxCounterValue;
      }

      this.innerCounterValue = result;
      this.$emit("change-counter-value", result);
    },
  },
};
</script>
<style lang="scss" scoped></style>
