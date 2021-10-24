<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>
    <div class="sheet__content ingridients">
      <div class="ingridients__sauce">
        <p>Основной соус:</p>

        <RadioButton
          v-for="sauce in sauces"
          :key="sauce.value"
          :label-classes="['radio', 'ingridients__input']"
          name="sauce"
          :value="sauce.value"
          :checked="selectedSauce === sauce.value"
          @change="$emit('change-sauce', sauce)"
        >
          <span>{{ sauce.name }}</span>
        </RadioButton>
      </div>

      <div class="ingridients__filling">
        <p>Начинка:</p>

        <ul class="ingridients__list">
          <li
            class="ingridients__item"
            v-for="ingredient in ingredients"
            :key="ingredient.id"
          >
            <AppDrag
              :transferData="{
                value: ingredient.value,
                count: ingredient.count,
                price: ingredient.price,
              }"
            >
              <span class="filling" :class="`filling--${ingredient.value}`">
                {{ ingredient.name }}
              </span>
            </AppDrag>

            <ItemCounter
              counter-classes="ingridients__counter"
              :counter-value="ingredient.count"
              :max-counter-value="3"
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
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderIngredientsSelector",
  components: {
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
