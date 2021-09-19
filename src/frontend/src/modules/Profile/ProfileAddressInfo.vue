<template>
  <div class="layout__address">
    <ProfileAddressForm
      v-if="addressFormIsVisible"
      :number="number"
      :name="name"
      :street="street"
      :building="building"
      :flat="flat"
      :comment="comment"
      @submit-address="updateAddress"
      @delete-address="deleteAddress"
    />
    <div v-else class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №{{ number }}. Тест</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="showAddressForm">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ fullAddress }}</p>
      <small v-if="comment">
        {{ comment }}
      </small>
    </div>
  </div>
</template>

<script>
import ProfileAddressForm from "@/modules/Profile/ProfileAddressForm";
import { mapActions } from "vuex";

export default {
  name: "ProfileAddressInfo",
  props: {
    number: {
      type: Number,
      default: 1,
    },
    id: {
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
  components: {
    ProfileAddressForm,
  },
  data() {
    return {
      addressFormIsVisible: false,
    };
  },
  computed: {
    fullAddress() {
      return `${this.street} ${this.building} ${this.flat}`.trim();
    },
  },
  methods: {
    ...mapActions("Profile", ["put", "delete"]),
    showAddressForm() {
      this.addressFormIsVisible = true;
    },
    updateAddress(address) {
      this.put({
        id: this.id,
        ...address,
      });
      this.addressFormIsVisible = false;
    },
    deleteAddress() {
      this.delete(this.id);
      this.addressFormIsVisible = false;
    },
  },
};
</script>

<style scoped></style>
