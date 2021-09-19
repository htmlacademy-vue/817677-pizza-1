<template>
  <div class="layout__sidebar sidebar">
    <router-link :to="{ name: 'Builder' }" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      v-for="(link, index) in sidebar"
      :key="index"
      class="layout__link"
      :class="{ 'layout__link--active': linkIsActive(link.to) }"
      :to="link.to"
      >{{ link.text }}</router-link
    >
  </div>
</template>
<script>
export default {
  name: "AppLayoutSidebar",
  data() {
    return {
      sidebar: [
        {
          to: "Orders",
          text: "История заказов",
        },
        {
          to: "Profile",
          text: "Мои данные",
        },
      ],
    };
  },
  methods: {
    linkIsActive(linkName) {
      return this.$route.name === linkName;
    },
  },
};
</script>
<style lang="scss" scoped></style>
