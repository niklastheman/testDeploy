import { SET_USER } from "./types.js";
export default {
  [SET_USER](state, payload) {
    state.activeUser = payload;
  },
};
