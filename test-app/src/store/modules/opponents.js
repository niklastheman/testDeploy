const NAMESPACE = "opponents/";
//mutations
const _SET_OPPONENTS = "SET_OPPONENTS";
const _ADD_OPPONENT = "ADD_OPPONENT";
const _REMOVE_OPPONENT = "REMOVE_OPPONENT";

const SET_OPPONENTS = `${NAMESPACE}${_SET_OPPONENTS}`;
const ADD_OPPONENT = `${NAMESPACE}${_ADD_OPPONENT}`;
const REMOVE_OPPONENT = `${NAMESPACE}${_REMOVE_OPPONENT}`;

// data types
const OPPONENTS = "OPPONENTS";

export { NAMESPACE, SET_OPPONENTS, ADD_OPPONENT, REMOVE_OPPONENT, OPPONENTS };

export default {
  namespaced:true,
  state: {
    opponents: [],
  },
  mutations: {
    [_SET_OPPONENTS](state, payload) {
      state.opponents = payload;
    },
    [_ADD_OPPONENT](state, payload) {
      state.opponents.push(payload);
    },
    [_REMOVE_OPPONENT](state, payload) {
      const indexOf = state.opponents.indexOf(payload);
      state.opponents.splice(indexOf, 1);
    },
  },
  actions: {
    [_ADD_OPPONENT]({ commit, state }, payload) {
      commit(_ADD_OPPONENT, payload);
      localStorage.setItem(OPPONENTS, JSON.stringify(state.opponents));
    },
  },
};
