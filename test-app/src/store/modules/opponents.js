//mutations
const SET_OPPONENTS = "SET_OPPONENTS";
const ADD_OPPONENT = "ADD_OPPONENT";
const REMOVE_OPPONENT = "REMOVE_OPPONENT";

// data types
const OPPONENTS = "OPPONENTS";

export { SET_OPPONENTS, ADD_OPPONENT, REMOVE_OPPONENT, OPPONENTS };

export default {
  state: {
    opponents: [],
  },
  mutations: {
    [SET_OPPONENTS](state, payload) {
      state.opponents = payload;
    },
    [ADD_OPPONENT](state, payload) {
      state.opponents.push(payload);
    },
    [REMOVE_OPPONENT](state, payload) {
      const indexOf = state.opponents.indexOf(payload);
      state.opponents.splice(indexOf, 1);
    },
  },
  actions: {
    [ADD_OPPONENT]({ commit, state }, payload) {
      commit(ADD_OPPONENT, payload);
      localStorage.setItem(OPPONENTS, JSON.stringify(state.opponents));
    },
  },
};
