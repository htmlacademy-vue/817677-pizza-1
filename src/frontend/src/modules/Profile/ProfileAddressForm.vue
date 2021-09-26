<template>
  <form
    action=""
    method="post"
    class="address-form sheet"
    @submit.prevent="submit"
  >
    <div class="address-form__header">
      <b>Адрес № {{ number }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <AppInput
          v-model="form.name"
          labelText="Название адреса*"
          type="text"
          name="name"
          placeholder="Введите название адреса"
          :errorText="validations.name.error"
        />
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <AppInput
          v-model="form.street"
          labelText="Улица*"
          type="text"
          name="street"
          placeholder="Введите название улицы"
          :errorText="validations.street.error"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="form.building"
          labelText="Дом*"
          type="text"
          name="building"
          placeholder="Введите название дома"
          :errorText="validations.building.error"
        />
      </div>
      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="form.flat"
          labelText="Квартира"
          type="text"
          name="flat"
          placeholder="Введите № квартиры"
        />
      </div>
      <div class="address-form__input">
        <AppInput
          v-model="form.comment"
          labelText="Комментарий"
          type="text"
          name="comment"
          placeholder="Введите комментарий"
        />
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        @click="$emit('delete-address')"
      >
        Удалить
      </button>
      <button type="submit" class="button">Сохранить</button>
    </div>
  </form>
</template>

<script>
import { validator } from "@/common/mixins";

export default {
  name: "ProfileAddressForm",
  mixins: [validator],
  props: {
    formIsVisible: {
      type: Boolean,
      default: false,
    },
    number: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    building: {
      type: String,
      default: "",
    },
    flat: {
      type: String,
      default: "",
    },
    comment: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      form: {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
      validations: {
        name: {
          error: "",
          rules: ["required"],
        },
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  mounted() {
    this.form.name = this.name;
    this.form.street = this.street;
    this.form.building = this.building;
    this.form.flat = this.flat;
    this.form.comment = this.flat;
  },
  watch: {
    ["form.name"]() {
      this.$clearValidationErrors();
    },
    ["form.street"]() {
      this.$clearValidationErrors();
    },
    ["form.building"]() {
      this.$clearValidationErrors();
    },
  },
  methods: {
    submit() {
      if (
        !this.$validateFields(
          {
            name: this.form.name,
            street: this.form.street,
            building: this.form.building,
          },
          this.validations
        )
      ) {
        return;
      }

      this.$emit("submit-address", this.form);
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
    },
  },
};
</script>

<style scoped></style>
