import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions.js";
import opponents from "./modules/opponents.js";
import matches from "./modules/matches.js";
import mutations from "./mutations.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeUser: null
  },
  getters: {
    userIsSet: state => {
      return state.activeUser != null;
    },
    displayName: state => (state.activeUser ? state.activeUser.displayName : "")
  },
  mutations: mutations,
  actions: actions,
  modules: {
    opponents: opponents,
    matches: matches
  }
});
