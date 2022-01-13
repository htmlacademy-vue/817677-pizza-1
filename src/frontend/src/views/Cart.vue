<template>
  <div>
    <form
      v-if="!showPopup"
      class="layout-form"
      @submit.o.prevent="placeAnOrder"
    >
      <main class="content cart">
        <div class="container">
          <div class="cart__title">
            <h1 class="title title--big">Корзина</h1>
          </div>

          <div v-if="!hasOrders" class="sheet cart__empty">
            <p>В корзине нет ни одного товара</p>
          </div>

          <CartMainList
            v-if="hasOrders"
            :main-order="mainOrder"
            @change-pizza-count="changePizzaCount"
          />

          <div v-if="hasOrders" class="cart__additional">
            <CartAdditionalList
              :misc="misc"
              @change-misc-count="changeMiscCount"
            />
          </div>

          <div v-if="hasOrders" class="cart__form">
            <CartForm
              :address="address"
              :validations="validations"
              @change-address="changeAddress"
            />
          </div>
        </div>
      </main>

      <section v-if="hasOrders" class="footer">
        <div class="footer__more">
          <router-link
            :to="{ name: 'Builder' }"
            class="button button--border button--arrow"
          >
            Хочу еще одну
          </router-link>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ fullPrice }} ₽</b>
        </div>

        <div class="footer__submit">
          <AppButton type="submit">Оформить заказ</AppButton>
        </div>
      </section>
    </form>

    <CartThanksOrder v-show="showPopup" :is-authenticated="isAuthenticated" />
  </div>
</template>
<script>
import { validator } from "@/common/mixins";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import CartMainList from "@/modules/cart/components/CartMainList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartForm from "@/modules/cart/components/CartForm";
import CartThanksOrder from "@/modules/cart/components/CartThanksOrder";
import {
  UPDATE_MISC_COUNT,
  SET_ADDRESS,
  RESET_STATE,
} from "@/store/mutation-types";

export default {
  name: "Cart",
  layout: "AppLayoutDefault",
  mixins: [validator],

  components: {
    CartMainList,
    CartAdditionalList,
    CartForm,
    CartThanksOrder,
  },

  data() {
    return {
      showPopup: false,
      validations: {
        street: {
          error: "",
          rules: ["required"],
        },

        building: {
          error: "",
          rules: ["required"],
        },

        flat: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },

  computed: {
    ...mapState("Cart", ["mainOrder", "misc", "address"]),
    ...mapState("Profile", ["addresses"]),
    ...mapGetters("Cart", ["fullPrice"]),
    ...mapState(["Auth"]),

    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },

    hasOrders() {
      return this.mainOrder.length > 0;
    },
  },

  watch: {
    ["address.street"]() {
      this.$clearValidationErrors();
    },

    ["address.building"]() {
      this.$clearValidationErrors();
    },

    ["address.flat"]() {
      this.$clearValidationErrors();
    },
  },

  methods: {
    ...mapActions("Cart", ["post", "put", "delete"]),
    ...mapMutations("Cart", [UPDATE_MISC_COUNT, SET_ADDRESS, RESET_STATE]),

    changePizzaCount(pizza) {
      if (pizza.count === 0) {
        this.delete(pizza);
      } else {
        this.put(pizza);
      }
    },

    changeMiscCount(id, value) {
      this[UPDATE_MISC_COUNT]({ id, value });
    },

    changeAddress(address = null) {
      this[SET_ADDRESS](address);
    },

    placeAnOrder() {
      if (
        this.address?.test === "new" &&
        !this.$validateFields(
          {
            street: this.address.street,
            building: this.address.building,
            flat: this.address.flat,
          },
          this.validations
        )
      ) {
        return;
      }

      this.post().then(() => {
        this.showPopup = true;
        this[RESET_STATE]();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/layout/layout-form.scss";
@import "~@/assets/scss/blocks/cart.scss";
@import "~@/assets/scss/blocks/footer.scss";
</style>
