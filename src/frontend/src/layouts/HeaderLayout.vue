<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'IndexHome' }" class="logo">
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
      <template v-if="isAuth">
        <router-link :to="{ name: 'Profile' }">
          <picture>
            <source
              type="image/webp"
              srcset="
                @/assets/img/users/user5.webp    1x,
                @/assets/img/users/user5@2x.webp 2x
              "
            />
            <img
              src="@/assets/img/users/user5.jpg"
              srcset="@/assets/img/users/user5@2x.jpg"
              alt="Василий Ложкин"
              width="32"
              height="32"
            />
          </picture>
          <span>Василий Ложкин</span>
        </router-link>
        <a href="#" @click.prevent="updateAuth(false)" class="header__logout">
          <span>Выйти</span>
        </a>
      </template>
      <a
        v-else
        href="#"
        @click.prevent="updateAuth(true)"
        class="header__login"
      >
        <span>Войти</span>
      </a>
    </div>
  </header>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import { UPDATE_AUTH } from "@/store/mutation-types";

export default {
  name: "HeaderLayout",
  computed: {
    ...mapState("Auth", ["isAuth"]),
    ...mapGetters("Cart", ["fullPrice"]),
  },
  methods: {
    ...mapMutations("Auth", [UPDATE_AUTH]),
    updateAuth(value) {
      this[UPDATE_AUTH](value);
    },
  },
};
</script>
<style lang="scss" scoped></style>
