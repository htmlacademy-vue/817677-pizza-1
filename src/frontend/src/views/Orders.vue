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
            <span>Сумма заказа: {{ price }} ₽</span>
          </div>

          <div class="order__button">
            <AppButton type="button" border @click="deleteOrder(id)">
              Удалить
            </AppButton>
          </div>
          <div class="order__button">
            <AppButton type="button" @click="repeatOrder(id)">
              Повторить
            </AppButton>
          </div>
        </div>

        <ul class="order__list">
          <li v-for="pizza in pizzas" :key="pizza.id" class="order__item">
            <Product :pizza="pizza" />

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
import Product from "@/common/components/Product";
import { mapActions, mapState } from "vuex";
import { isLoggedIn, auth } from "@/middlewares";

export default {
  name: "Orders",

  components: {
    Product,
  },

  layout: "AppLayoutMain",
  middlewares: { isLoggedIn, auth },

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
              const foundMisc = orderMisc.find(
                ({ miscId }) => miscId === miscItem.id
              );
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
        address: address.name ? address : null,
      });
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/blocks/order.scss";
</style>
