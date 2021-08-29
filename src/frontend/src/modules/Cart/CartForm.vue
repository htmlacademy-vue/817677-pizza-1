<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select
        name="test"
        class="select"
        v-model="currentTypeOrderReceipt"
        @change="currentTypeOrderReceipt = parseInt($event.target.value)"
      >
        <option value="1">Заберу сам</option>
        <option value="2">Новый адрес</option>
        <option v-if="isAuth === true" value="3">Дом</option>
      </select>
    </label>

    <label
      v-if="currentTypeOrderReceipt === 1 || currentTypeOrderReceipt === 2"
      class="input input--big-label"
    >
      <span>Контактный телефон:</span>
      <input
        type="text"
        name="tel"
        placeholder="+7 999-999-99-99"
        @input="($event) => $emit('change-address', $event)"
      />
    </label>

    <div v-if="currentTypeOrderReceipt === 2" class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="street"
            @input="($event) => $emit('change-address', $event)"
          />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="house"
            @input="($event) => $emit('change-address', $event)"
          />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="apartment"
            @input="($event) => $emit('change-address', $event)"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartForm",
  data() {
    return {
      currentTypeOrderReceipt: 1,
    };
  },
  computed: {
    ...mapState("Auth", ["isAuth"]),
  },
};
</script>

<style scoped></style>
