//mutations
const SET_MATCHES = 'SET_MATCHES'; 
const ADD_MATCHES = 'ADD_MATCHES'; 
const REMOVE_MATCHES = 'REMOVE_MATCHES'; 

// actions

// data types
const MATCHES = 'MATCHES'; 

export { SET_MATCHES, ADD_MATCHES, REMOVE_MATCHES, MATCHES };

export default {
  state: {
    matches: [],
  },
  getters: {},
  mutations: {
    [SET_MATCHES](state, payload) {
      state.matches = payload;
    },
    [ADD_MATCHES](state, payload) {
      state.matches.push(payload);
    },
    [REMOVE_MATCHES](state, payload) {
      const indexOf = state.matches.indexOf(payload);
      state.matches.splice(indexOf, 1);
    },
  },
  actions: {},
};
