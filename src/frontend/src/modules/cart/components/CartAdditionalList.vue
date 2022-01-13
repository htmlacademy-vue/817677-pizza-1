<template>
  <ul class="additional-list">
    <li
      v-for="{ id, name, image, price, count } in misc"
      :key="name"
      class="additional-list__item sheet"
    >
      <p class="additional-list__description">
        <img :src="image" width="39" height="60" :alt="name" />
        <span>{{ name }} / {{ price }} ₽</span>
      </p>

      <div class="additional-list__wrapper">
        <ItemCounter
          counter-classes="additional-list__counter"
          counter-color="orange"
          :counter-value="count"
          @change-counter-value="
            ($event) => $emit('change-misc-count', id, $event)
          "
        />
        <div class="additional-list__price">
          <b>{{ price * count }} ₽</b>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartAdditionalList",

  components: {
    ItemCounter,
  },

  props: {
    misc: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/additional-list.scss";
</style>
