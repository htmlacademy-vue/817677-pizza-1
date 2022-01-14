<template>
  <div>
    <AppLayoutHeader
      :show-login="!isAuthenticated && $route.name !== 'Login'"
    />
    <main class="layout">
      <AppLayoutSidebar />

      <slot />
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';
import AppLayoutSidebar from '@/layouts/AppLayoutSidebar';

export default {
  name: 'AppLayoutMain',

  components: {
    AppLayoutHeader,
    AppLayoutSidebar
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
