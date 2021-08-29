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
          @change="$emit('change-sauce', { name, value })"
        >
          <span>{{ name }}</span>
        </RadioButton>
      </div>

      <div class="ingridients__filling">
        <p>Начинка:</p>

        <ul class="ingridients__list">
          <li
            class="ingridients__item"
            v-for="ingredient in ingredients"
            :key="ingredient.value"
          >
            <AppDrag
              :transferData="{
                value: ingredient.value,
                count: ingredient.count,
                price: ingredient.price,
              }"
            >
              <SelectorItem :classes="`filling--${ingredient.value}`">
                {{ ingredient.name }}
              </SelectorItem>
            </AppDrag>

            <ItemCounter
              counter-classes="ingridients__counter"
              :counter-value="ingredient.count"
              @change-counter-value="
                $emit('change-ingredient-count', {
                  ...ingredient,
                  count: $event,
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
import AppDrag from "@/common/components/AppDrag";
import SelectorItem from "@/common/components/SelectorItem";
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppDrag,
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
