<template>
  <div>
    <form v-if="!showPopup" class="layout-form">
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
          <button type="submit" class="button" @click.prevent="placeAnOrder">
            Оформить заказ
          </button>
        </div>
      </section>
    </form>

    <div v-if="showPopup" class="popup">
      <router-link :to="{ name: 'Builder' }" class="close">
        <span class="visually-hidden">Закрыть попап</span>
      </router-link>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <router-link
          :to="{ name: isAuthenticated ? 'Orders' : 'Builder' }"
          class="button"
          >Отлично, я жду!</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import { validator } from "@/common/mixins";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import CartMainList from "@/modules/Cart/CartMainList";
import CartAdditionalList from "@/modules/Cart/CartAdditionalList";
import CartForm from "@/modules/Cart/CartForm";
import {
  UPDATE_MISC_COUNT,
  SET_ADDRESS,
  RESET_STATE,
} from "@/store/mutation-types";

export default {
  name: "Cart",
  mixins: [validator],
  components: {
    CartMainList,
    CartAdditionalList,
    CartForm,
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
        this.address?.test === 2 &&
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
<style lang="scss" scoped></style>
