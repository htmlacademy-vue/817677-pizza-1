<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select name="test" class="select" @change="changeAddressType">
        <option value="1">Заберу сам</option>
        <option value="2">Новый адрес</option>
        <option v-if="isAuthenticated && addresses.length" value="3">
          Дом
        </option>
      </select>
    </label>

    <AppInput
      v-if="form.test === 1 || form.test === 2"
      labelText="Контактный телефон:"
      type="text"
      name="phone"
      v-model="form.phone"
      placeholder="+7 999-999-99-99"
      classes="input--big-label"
    />

    <div v-if="form.test === 2" class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <AppInput
          labelText="Улица*"
          type="text"
          name="street"
          v-model="form.street"
          :errorText="validations.street.error"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          labelText="Дом*"
          type="text"
          name="building"
          v-model="form.building"
          :errorText="validations.building.error"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          labelText="Квартира*"
          type="text"
          name="flat"
          v-model="form.flat"
          :errorText="validations.flat.error"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartForm",
  props: {
    validations: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        test: 1,
        name: "",
        phone: "",
        street: "",
        building: "",
        flat: "",
      },
    };
  },
  watch: {
    form: {
      handler(newValue) {
        if (newValue.test === 2) {
          const data = {
            ...newValue,
            name: `${newValue.street} ${newValue.building} ${newValue.flat}`.trim(),
          };

          this.$emit("change-address", data);
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(["Auth"]),
    ...mapState("Profile", ["addresses"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
  },
  methods: {
    changeAddressType($event) {
      this.form.test = parseInt($event.target.value);
      switch (this.form.test) {
        case 1:
          this.$emit("change-address");
          break;
        case 2:
          this.$emit("change-address", this.form);
          break;
        case 3:
          this.$emit("change-address", { id: this.addresses[0].id });
          break;
      }
    },
    resetForm() {
      this.form = {
        ...this.form,
        name: "",
        phone: "",
        street: "",
        building: "",
        flat: "",
      };
    },
  },
};
</script>

<style scoped></style>
