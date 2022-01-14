<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">
      Выберите тесто
    </h2>
    <div class="sheet__content dough">
      <RadioButton
        v-for="doughItem in dough"
        :key="doughItem.id"
        :label-classes="['dough__input', `dough__input--${doughItem.value}`]"
        name="dough"
        :value="doughItem.value"
        :checked="doughType === doughItem.value"
        @change="$emit('change-dough', doughItem)"
      >
        <b>{{ doughItem.name }}</b>
        <span>{{ doughItem.description }}</span>
      </RadioButton>
    </div>
  </div>
</template>
<script>
import RadioButton from '@/common/components/RadioButton';

export default {
  name: 'BuilderDoughSelector',

  components: {
    RadioButton
  },

  props: {
    dough: {
      type: Array,
      required: true
    },
    doughType: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/blocks/dough.scss";
</style>
