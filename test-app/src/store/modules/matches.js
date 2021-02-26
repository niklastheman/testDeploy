const NAMESPACE = "matches/";
//mutations
const _SET_MATCHES = 'SET_MATCHES'; 
const _ADD_MATCHES = 'ADD_MATCHES'; 
const _REMOVE_MATCHES = 'REMOVE_MATCHES';

const SET_MATCHES = `${NAMESPACE}${_SET_MATCHES}`; 
const ADD_MATCHES = `${NAMESPACE}${_ADD_MATCHES}`; 
const REMOVE_MATCHES = `${NAMESPACE}${_REMOVE_MATCHES}`;

// data types
const MATCHES = 'MATCHES'; 

export { NAMESPACE, SET_MATCHES, ADD_MATCHES, REMOVE_MATCHES, MATCHES };

export default {
  state: {
    matches: [],
  },
  getters: {},
  mutations: {
    [_SET_MATCHES](state, payload) {
      state.matches = payload;
    },
    [_ADD_MATCHES](state, payload) {
      state.matches.push(payload);
    },
    [_REMOVE_MATCHES](state, payload) {
      const indexOf = state.matches.indexOf(payload);
      state.matches.splice(indexOf, 1);
    },
  },
  actions: {},
};
