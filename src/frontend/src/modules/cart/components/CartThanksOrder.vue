<template>
  <transition name="fade" mode="out-in">
    <div class="popup">
      <router-link :to="{ name: 'Builder' }" class="close">
        <span class="visually-hidden">Закрыть попап</span>
      </router-link>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <router-link
          :to="{ name: isAuthenticated ? 'Orders' : 'Builder' }"
          class="button"
          >Отлично, я жду!</router-link
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CartThanksOrder",

  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/popup.scss";
</style>
