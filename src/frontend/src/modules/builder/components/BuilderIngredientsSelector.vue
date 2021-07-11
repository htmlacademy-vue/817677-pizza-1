<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
    <div class="sheet__content ingridients">
      <div class="ingridients__sauce">
        <p>Основной соус:</p>

        <RadioButton
          v-for="{ name, value } in sauces"
          :key="value"
          :label-classes="['radio', 'ingridients__input']"
          name="sauce"
          :value="value"
          :checked="selectedSauce === value"
          @change="$emit('change-sauce', value)"
        >
          <span>{{ name }}</span>
        </RadioButton>
      </div>

      <div class="ingridients__filling">
        <p>Начинка:</p>

        <ul class="ingridients__list">
          <li
            class="ingridients__item"
            v-for="{ name, value, price } in ingredients"
            :key="value"
          >
            <SelectorItem :classes="`filling--${value}`">
              {{ name }}
            </SelectorItem>

            <ItemCounter
              counter-classes="ingridients__counter"
              @change-ingredient-count="
                $emit('change-ingredient-count', {
                  [value]: { count: $event, price },
                })
              "
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    SelectorItem,
    ItemCounter,
    RadioButton,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    selectedSauce: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
