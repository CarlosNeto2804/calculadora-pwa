<template>
  <v-app-bar app color="primary" dark>
    <v-spacer></v-spacer>

    <!-- <v-btn outlined dark @click="openLogin">
      Upgrade
    </v-btn> -->
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBarCore",
  methods: {
    openLogin() {
      this.$store.commit("changeLoginState");
    },
  },
};
</script>

<style scoped></style>
