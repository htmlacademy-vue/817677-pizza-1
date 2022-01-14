<template>
  <form
    action=""
    method="post"
    class="address-form sheet"
    @submit.prevent="submit"
  >
    <div class="address-form__header">
      <b>Адрес № {{ number }}</b>
      <div
        v-if="!editAddress"
        class="address-form__edit"
      >
        <AppIconButton @click="showAddressForm" />
      </div>
    </div>

    <template v-if="!editAddress">
      <p>{{ fullAddress }}</p>
      <small v-if="comment">
        {{ comment }}
      </small>
    </template>

    <template v-else>
      <div class="address-form__wrapper">
        <div class="address-form__input">
          <AppInput
            v-model="form.name"
            label-text="Название адреса*"
            type="text"
            name="name"
            placeholder="Введите название адреса"
            :error-text="validations.name.error"
          />
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <AppInput
            v-model="form.street"
            label-text="Улица*"
            type="text"
            name="street"
            placeholder="Введите название улицы"
            :error-text="validations.street.error"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="form.building"
            label-text="Дом*"
            type="text"
            name="building"
            placeholder="Введите название дома"
            :error-text="validations.building.error"
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="form.flat"
            label-text="Квартира"
            type="text"
            name="flat"
            placeholder="Введите № квартиры"
          />
        </div>
        <div class="address-form__input">
          <AppInput
            v-model="form.comment"
            label-text="Комментарий"
            type="text"
            name="comment"
            placeholder="Введите комментарий"
          />
        </div>
      </div>

      <div class="address-form__buttons">
        <AppButton
          type="button"
          transparent
          @click="deleteAddress"
        >
          Удалить
        </AppButton>
        <AppButton type="submit">
          Сохранить
        </AppButton>
      </div>
    </template>
  </form>
</template>

<script>
import { validator } from '@/common/mixins';

export default {
  name: 'ProfileAddressForm',
  mixins: [validator],

  props: {
    number: {
      type: Number,
      default: 1
    },

    name: {
      type: String,
      default: ''
    },

    street: {
      type: String,
      default: ''
    },

    building: {
      type: String,
      default: ''
    },

    flat: {
      type: String,
      default: ''
    },

    comment: {
      type: String,
      default: ''
    },

    addressFormIsVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      form: {
        name: '',
        street: '',
        building: '',
        flat: '',
        comment: ''
      },

      validations: {
        name: {
          error: '',
          rules: ['required']
        },
        street: {
          error: '',
          rules: ['required']
        },
        building: {
          error: '',
          rules: ['required']
        }
      },

      editAddress: false
    };
  },

  computed: {
    fullAddress() {
      return `${this.street} ${this.building} ${this.flat}`.trim();
    }
  },

  watch: {
    ['form.name']() {
      this.$clearValidationErrors();
    },

    ['form.street']() {
      this.$clearValidationErrors();
    },

    ['form.building']() {
      this.$clearValidationErrors();
    }
  },

  mounted() {
    this.form.name = this.name;
    this.form.street = this.street;
    this.form.building = this.building;
    this.form.flat = this.flat;
    this.form.comment = this.flat;
    this.editAddress = this.addressFormIsVisible;
  },

  methods: {
    showAddressForm() {
      this.editAddress = true;
    },

    submit() {
      if (
        !this.$validateFields(
          {
            name: this.form.name,
            street: this.form.street,
            building: this.form.building
          },
          this.validations
        )
      ) {
        return;
      }

      this.$emit('submit-address', this.form);
      this.editAddress = false;
      this.resetForm();
    },

    deleteAddress() {
      this.$emit('delete-address');
      this.editAddress = false;
    },

    resetForm() {
      this.form = {
        name: '',
        street: '',
        building: '',
        flat: '',
        comment: ''
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/address-form.scss";
</style>
