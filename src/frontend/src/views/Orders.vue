<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <template v-if="Object.values(builder).every((item) => item.length)">
      <section
        v-for="{ id, pizzas, misc, address, price } in normalizeOrders"
        :key="id"
        class="sheet order"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ id }}NBSP{{ price }} ₽</span>
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="deleteOrder(id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="repeatOrder(id)">
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <li v-for="pizza in pizzas" :key="pizza.id" class="order__item">
            <div class="product">
              <img
                src="@/assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ pizza.size.name }}, на
                    {{ normalizeDoughType(pizza.dough) }}
                    тесте
                  </li>
                  <li>Соус: томатный</li>
                  <li>
                    Начинка:
                    {{ ingredientsToSting(pizza.ingredients) }}
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">{{ pizza.price * pizza.count }} ₽</p>
          </li>
        </ul>

        <ul class="order__additional">
          <template v-for="miscItem in misc">
            <li v-if="miscItem.count > 0" :key="miscItem.miscId">
              <img
                :src="miscItem.image"
                width="20"
                height="30"
                :alt="miscItem.name"
              />
              <p>
                <span>{{ miscItem.name }}</span>
                <b>{{ miscItem.price * miscItem.count }} ₽</b>
              </p>
            </li>
          </template>
        </ul>

        <p v-if="!!address.addressId" class="order__address">
          Адрес доставки: {{ fullAddress(address) }}
        </p>
      </section>
    </template>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Orders",
  computed: {
    ...mapState("Builder", ["builder"]),
    ...mapState("Orders", ["orders"]),
    ...mapState("Cart", ["misc"]),
    normalizeOrders() {
      return this.orders.reduce(
        (
          acc,
          { id, userId, orderPizzas, orderMisc = [], orderAddress, addressId }
        ) => {
          const normalizeOrder = {
            pizzas: orderPizzas.map((pizza) => {
              const normalizePizza = this.normalizePizzaInfo(pizza);

              return {
                ...normalizePizza,
                name: pizza.name,
                count: pizza.quantity,
                price: this.pizzaPrice(normalizePizza),
              };
            }),
            misc: this.misc.map((miscItem) => {
              const foundMisc = orderMisc.find(({ id }) => id === miscItem.id);
              let count = 0;

              if (foundMisc) {
                count = foundMisc.quantity;
              }

              return {
                ...miscItem,
                count,
                price: miscItem.price,
              };
            }),
            address: {
              test: 2,
              addressId,
              ...orderAddress,
            },
          };

          return [
            ...acc,
            {
              id,
              userId,
              price: this.fullOrdersPrice(orderPizzas, orderMisc),
              ...normalizeOrder,
            },
          ];
        },
        []
      );
    },
  },
  mounted() {
    this.query();
  },
  methods: {
    ...mapActions("Orders", {
      deleteOrder: "delete",
      query: "query",
      put: "put",
    }),
    fullAddress({ name, street = "", building = "", flat = "" }) {
      if (name) {
        return name;
      }

      return `${street} ${building} ${flat}`;
    },
    normalizePizzaInfo({ doughId, sizeId, sauceId, ingredients }) {
      const dough = this.builder.dough.find(({ id }) => id === doughId);
      const size = this.builder.sizes.find(({ id }) => id === sizeId);
      const sauce = this.builder.sauces.find(({ id }) => id === sauceId);
      const foundIngredients = ingredients.map(
        ({ ingredientId, quantity }) => ({
          ...this.builder.ingredients.find(({ id }) => id === ingredientId),
          count: quantity,
        })
      );

      return {
        dough,
        size,
        sauce,
        ingredients: foundIngredients,
      };
    },
    ingredientsToSting(ingredients) {
      return ingredients
        .map(({ name, count }) => `${name} ${count}`)
        .join(", ");
    },
    normalizeMiscInfo({ miscId, quantity }) {
      return {
        ...this.misc.find(({ id }) => id === miscId),
        count: quantity,
      };
    },
    pizzaPrice(pizza) {
      const { dough, sauce, size, ingredients } = pizza;

      return (
        (dough.price + sauce.price + this.ingredientsPrice(ingredients)) *
        size.multiplier
      );
    },
    fullOrdersPrice(pizzas, misc = []) {
      const fullPizzasPrice = pizzas.reduce(
        (acc, pizza) =>
          this.pizzaPrice(this.normalizePizzaInfo(pizza)) * pizza.quantity,
        0
      );
      const fullMiscPrice = misc.reduce((acc, misc) => {
        const { price, count } = this.normalizeMiscInfo(misc);

        return acc + price * count;
      }, 0);

      return fullPizzasPrice + fullMiscPrice;
    },
    ingredientsPrice(ingredients) {
      return ingredients.reduce((acc, ingredient) => {
        const { count, price } = ingredient;

        return acc + count * price;
      }, 0);
    },
    normalizeDoughType({ name }) {
      return name.toLowerCase().substring(0, name.length - 1) + "м";
    },
    repeatOrder(id) {
      const { pizzas, misc, address } = this.normalizeOrders.find(
        (order) => order.id === id
      );

      this.put({
        mainOrder: pizzas,
        misc,
        address,
      });
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>
<style lang="scss" scoped></style>
