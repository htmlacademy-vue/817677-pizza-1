<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'Builder' }" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'Cart' }"> {{ fullPrice }} ₽ </router-link>
    </div>
    <div class="header__user">
      <router-link
        v-if="showLogin"
        :to="{ name: 'Login' }"
        class="header__login"
      >
        <span>Войти</span>
      </router-link>
      <template v-else>
        <router-link :to="{ name: 'Profile' }">
          <img
            :src="getUserAttribute('avatar')"
            :alt="getUserAttribute('name')"
            width="32"
            height="32"
          />
          <span>{{ getUserAttribute("name") }}</span>
        </router-link>
        <a href="#" @click.prevent="$logout" class="header__logout">
          <span>Выйти</span>
        </a>
      </template>
    </div>
  </header>
</template>
<script>
import { mapGetters } from "vuex";
import { logout } from "@/common/mixins";

export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  props: {
    showLogin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("Cart", ["fullPrice"]),
    ...mapGetters("Auth", ["getUserAttribute"]),
  },
};
</script>
<style lang="scss" scoped></style>
