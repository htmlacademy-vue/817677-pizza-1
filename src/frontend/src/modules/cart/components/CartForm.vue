<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select
        class="select"
        @change="changeAddressType"
      >
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
      v-model="form.phone"
      label-text="Контактный телефон:"
      big-label
      type="text"
      name="phone"
      placeholder="+7 999-999-99-99"
    />

    <div
      v-if="showForm"
      class="cart-form__address"
    >
      <span
        v-if="!readonly"
        class="cart-form__label"
      >Новый адрес:</span>

      <div
        class="cart-form__input"
        :class="{ 'cart-form__input--first': readonly }"
      >
        <AppInput
          v-model="form.street"
          label-text="Улица*"
          type="text"
          name="street"
          :error-text="validations.street.error"
          :disabled="readonly"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          v-model="form.building"
          label-text="Дом*"
          type="text"
          name="building"
          :error-text="validations.building.error"
          :disabled="readonly"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          v-model="form.flat"
          label-text="Квартира*"
          type="text"
          name="flat"
          :error-text="validations.flat.error"
          :disabled="readonly"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CartForm',

  props: {
    address: {
      type: Object,
      default: () => {}
    },

    validations: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      form: {
        test: 'self',
        name: '',
        phone: '',
        street: '',
        building: '',
        flat: ''
      },
      showForm: false,
      readonly: true
    };
  },

  computed: {
    ...mapState(['Auth']),
    ...mapState('Profile', ['addresses']),

    isAuthenticated() {
      return this.Auth.isAuthenticated;
    }
  },

  watch: {
    form: {
      handler(newValue) {
        if (newValue.test === 'new') {
          const data = {
            ...newValue,
            name: `${newValue.street} ${newValue.building} ${newValue.flat}`.trim()
          };

          this.$emit('change-address', data);
        }
      },
      deep: true
    }
  },

  mounted() {
    this.queryAddresses();

    this.form = {
      ...this.form,
      ...this.address
    };
  },

  methods: {
    ...mapActions('Profile', {
      queryAddresses: 'query'
    }),

    changeAddressType($event) {
      this.form.test = $event.target.value;

      switch (this.form.test) {
      case 'self':
        this.showForm = false;
        this.$emit('change-address');
        break;
      case 'new':
        this.showForm = true;
        this.readonly = false;
        this.$emit('change-address', this.form);
        break;
      default: {
        const address = this.addresses.find(
          ({ id }) => id === parseInt($event.target.value)
        );

        this.form = {
          ...this.form,
          ...address
        };

        this.showForm = true;
        this.readonly = true;

        this.$emit('change-address', {
          test: $event.target.value,
          id: parseInt($event.target.value)
        });
      }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/cart-form.scss";

.cart-form__input--first {
  margin-left: 0;
}
</style>
