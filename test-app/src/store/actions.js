import { SET_USER, INIT_APP, USER } from "./types.js";
import { SET_MATCHES, MATCHES } from "./modules/matches.js";
import { SET_OPPONENTS, OPPONENTS } from "./modules/opponents.js";

export default {
  async [INIT_APP]({ commit }) {
    const userObj = localStorage.getItem(USER);
    const user = JSON.parse(userObj);

    if (user != null) {
      commit(SET_USER, user);
    }

    const opponentObj = localStorage.getItem(OPPONENTS);
    const opponents = JSON.parse(opponentObj);

    if (opponents != null) {
      commit(SET_OPPONENTS, opponents);
    }

    const matchesObj = localStorage.getItem(MATCHES);
    const matches = JSON.parse(matchesObj);

    if (matches != null) {
      commit(SET_MATCHES, matches);
    }
  },
  [SET_USER]({ commit }, payload) {
    commit(SET_USER, payload);
    localStorage.setItem(USER, JSON.stringify(payload));
  },
};
