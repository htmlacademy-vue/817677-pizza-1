<template>
  <div class="user">
    <img
      :src="avatar"
      :alt="name"
      width="72"
      height="72"
    />
    <div class="user__name">
      <span>{{ name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ phone }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProfileUser',

  props: {
    avatar: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/blocks/user.scss";
</style>
