<template>
  <AppDrop
    class="pizza"
    :class="`pizza--foundation--${this.normalizeDoughType}-${this.sauce}`"
    @drop="addIngredient"
  >
    <div class="pizza__wrapper">
      <transition-group
        name="roll"
        mode="out-in"
      >
        <div
          v-for="{ value, count } in ingredients"
          v-show="count > 0"
          :key="value"
          class="pizza__filling"
          :class="[
            count > 0 ? `pizza__filling--${value}` : '',
            count > 1 ? `pizza__filling--${countIngredients(count)}` : '',
          ]"
        />
      </transition-group>
    </div>
  </AppDrop>
</template>
<script>
export default {
  name: 'BuilderPizzaView',

  props: {
    dough: {
      type: String,
      required: true
    },

    size: {
      type: String,
      required: true
    },

    sauce: {
      type: String,
      required: true
    },

    ingredients: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      show: false
    };
  },

  computed: {
    normalizeDoughType() {
      const doughType = {
        light: 'small',
        large: 'big'
      };

      return doughType[this.dough];
    }
  },

  methods: {
    addIngredient(ingredient) {
      if (ingredient.count === 3) {
        return;
      }

      this.$emit('change-ingredient-count', {
        ...ingredient,
        count: ingredient.count + 1
      });
    },

    countIngredients(count) {
      const countToString = {
        1: '',
        2: 'second',
        3: 'third'
      };

      return countToString[count];
    }
  }
};
</script>
<style lang="scss" scoped>
.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}

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
