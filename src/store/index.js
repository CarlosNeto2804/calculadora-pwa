import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginDialog: false,
  },
  mutations: {
    changeLoginState(state) {
      state.loginDialog = !state.loginDialog;
    },
  },
  actions: {},
  modules: {},
});
