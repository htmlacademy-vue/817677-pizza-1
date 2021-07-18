<template>
  <div class="counter counter--orange" :class="counterClasses">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :class="{ 'counter__button--disabled': counterValue === 0 }"
      :disabled="counterValue === 0"
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
      :class="{ 'counter__button--disabled': counterValue === 3 }"
      :disabled="counterValue === 3"
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
      this.$emit("change-counter-value", newValue);
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
