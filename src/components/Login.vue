<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.loginDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Entrar</v-card-title>
        <v-card-text>
          Faça login com sua rede social e receba gratiutamente a geração de
          gráficos
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-btn block color="red" dark @click="login('google')">
                <v-icon class="mr-2">mdi-google</v-icon>
                Google
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn block color="blue" dark>
                <v-icon class="mr-2">mdi-facebook</v-icon>Facebook
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="cancel">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    cancel() {
      this.$store.commit("changeLoginState");
    },
    login(provider){
        const host = 'http://localhost:3000'
        const url = `${host}/social-login/${provider}`
        location.href = url;
    }
  },
};
</script>
