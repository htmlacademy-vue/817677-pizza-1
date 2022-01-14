<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">
        Мои данные
      </h1>
    </div>

    <ProfileUser
      :avatar="getUserAttribute('avatar')"
      :name="getUserAttribute('name')"
      :phone="getUserAttribute('phone')"
    />

    <template v-if="addresses.length > 0">
      <ProfileAddressInfo
        v-for="(address, index) in addresses"
        :id="address.id"
        :key="address.id"
        :number="index + 1"
        :name="address.name"
        :street="address.street"
        :building="address.building"
        :flat="address.flat"
        :comment="address.comment"
      />
    </template>

    <div
      v-if="addressFormIsVisible"
      class="layout__address"
    >
      <ProfileAddressForm
        :number="addresses.length + 1"
        address-form-is-visible
        @submit-address="addAddress"
        @delete-address="addressFormIsVisible = false"
      />
    </div>

    <div
      v-else
      class="layout__button"
    >
      <AppButton
        type="button"
        border
        @click="showAddressForm"
      >
        Добавить новый адрес
      </AppButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ProfileUser from '@/modules/profile/components/ProfileUser';
import ProfileAddressInfo from '@/modules/profile/components/ProfileAddressInfo';
import ProfileAddressForm from '@/modules/profile/components/ProfileAddressForm';

import { isLoggedIn, auth } from '@/middlewares';

export default {
  name: 'Profile',
  layout: 'AppLayoutMain',
  middlewares: { isLoggedIn, auth },

  components: {
    ProfileUser,
    ProfileAddressInfo,
    ProfileAddressForm
  },

  data() {
    return {
      addressFormIsVisible: false
    };
  },

  computed: {
    ...mapState('Auth', ['user']),
    ...mapState('Profile', ['addresses']),
    ...mapGetters('Auth', ['getUserAttribute'])
  },

  mounted() {
    this.query();
  },

  methods: {
    ...mapActions('Profile', ['query', 'post', 'delete']),

    showAddressForm() {
      this.addressFormIsVisible = true;
    },

    addAddress(address) {
      this.post(address);
    }
  }
};
</script>

<style lang="scss" scoped></style>
