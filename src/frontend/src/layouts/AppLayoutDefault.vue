<template>
  <div>
    <AppLayoutHeader
      :show-login="!isAuthenticated && $route.name !== 'Login'"
    />
    <slot />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';

export default {
  name: 'AppLayoutDefault',

  components: {
    AppLayoutHeader
  },

  computed: {
    ...mapState(['Auth']),

    isAuthenticated() {
      return this.Auth.isAuthenticated;
    }
  }
};
</script>
<style lang="scss" scoped></style>
