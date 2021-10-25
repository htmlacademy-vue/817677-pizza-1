<template>
  <div class="sign-form">
    <router-link :to="{ name: 'Builder' }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="" method="post" @submit.prevent="login">
      <div class="sign-form__input">
        <AppInput
          v-model="email"
          labelText="E-mail"
          type="email"
          name="email"
          :errorText="validations.email.error"
          placeholder="example@mail.ru"
        />
      </div>

      <div class="sign-form__input">
        <AppInput
          v-model="password"
          labelText="Пароль"
          type="password"
          name="pass"
          :errorText="validations.password.error"
          placeholder="***********"
        />
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>
<script>
import { validator } from "@/common/mixins";
import { auth } from "@/middlewares";

export default {
  name: "Login",
  layout: "AppLayoutEmpty",
  middlewares: { auth },
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  methods: {
    async login() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      await this.$store.dispatch("Auth/login", {
        email: this.email,
        password: this.password,
      });
      await this.$router.push({ name: "Builder" });
    },
  },
};
</script>
<style lang="scss" scoped></style>
