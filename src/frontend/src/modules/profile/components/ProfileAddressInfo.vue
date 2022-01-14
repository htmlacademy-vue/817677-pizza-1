<template>
  <div class="layout__address">
    <ProfileAddressForm
      :number="number"
      :name="name"
      :street="street"
      :building="building"
      :flat="flat"
      :comment="comment"
      @submit-address="updateAddress"
      @delete-address="deleteAddress"
    />
  </div>
</template>

<script>
import ProfileAddressForm from '@/modules/profile/components/ProfileAddressForm';
import { mapActions } from 'vuex';

export default {
  name: 'ProfileAddressInfo',

  components: {
    ProfileAddressForm
  },

  props: {
    number: {
      type: Number,
      default: 1
    },

    id: {
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
    }
  },

  methods: {
    ...mapActions('Profile', ['put', 'delete']),

    updateAddress(address) {
      this.put({
        id: this.id,
        ...address
      });
    },

    deleteAddress() {
      this.delete(this.id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
