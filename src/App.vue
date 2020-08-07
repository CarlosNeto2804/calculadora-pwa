<template>
  <v-app>
    <app-bar-core-vue />
    <v-main>
      <router-view />
    </v-main>
    <login-vue />
  </v-app>
</template>

<script>
import AppBarCoreVue from "./components/Core/AppBarCore.vue";
import LoginVue from './components/Login.vue';

export default {
  name: "App",
  components: {
    AppBarCoreVue,
    LoginVue
  },
  data: () => ({
    //
  }),
};
</script>
