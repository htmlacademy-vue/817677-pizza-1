<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select name="test" class="select" @change="changeAddressType">
        <option value="self">Заберу сам</option>
        <option value="new">Новый адрес</option>
        <template v-if="isAuthenticated">
          <option
            v-for="address in addresses"
            :key="address.id"
            :value="address.id"
          >
            {{ address.name }}
          </option>
        </template>
      </select>
    </label>

    <AppInput
      v-if="form.test === 'self' || form.test === 'new'"
      labelText="Контактный телефон:"
      type="text"
      name="phone"
      v-model="form.phone"
      placeholder="+7 999-999-99-99"
      classes="input--big-label"
    />

    <div v-if="form.test === 'new'" class="cart-form__address">
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
import { mapActions, mapState } from "vuex";

export default {
  name: "CartForm",
  props: {
    address: {
      type: Object,
      default: () => {},
    },
    validations: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        test: "self",
        name: "",
        phone: "",
        street: "",
        building: "",
        flat: "",
      },
    };
  },
  computed: {
    ...mapState(["Auth"]),
    ...mapState("Profile", ["addresses"]),
    isAuthenticated() {
      return this.Auth.isAuthenticated;
    },
  },
  mounted() {
    this.queryAddresses();

    this.form = {
      ...this.form,
      ...this.address,
    };
  },
  watch: {
    form: {
      handler(newValue) {
        if (newValue.test === "new") {
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
  methods: {
    ...mapActions("Profile", {
      queryAddresses: "query",
    }),
    changeAddressType($event) {
      this.form.test = $event.target.value;

      switch (this.form.test) {
        case "self":
          this.$emit("change-address");
          break;
        case "new":
          this.$emit("change-address", this.form);
          break;
        default:
          this.$emit("change-address", {
            test: $event.target.value,
            id: parseInt($event.target.value),
          });
      }
    },
  },
};
</script>

<style scoped></style>
