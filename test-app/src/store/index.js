import Vue from "vue";
import Vuex from "vuex";

//mutations
const SET_OPPONENTS = 'SET_OPPONENTS'; 
const ADD_OPPONENT = 'ADD_OPPONENT'; 
const REMOVE_OPPONENT = 'REMOVE_OPPONENT'; 
const SET_MATCHES = 'SET_MATCHES'; 
const ADD_MATCHES = 'ADD_MATCHES'; 
const REMOVE_MATCHES = 'REMOVE_MATCHES'; 

// actions
const INIT_APP = 'INIT_APP';

// data types
const OPPONENTS = 'OPPONENTS'; 
const MATCHES = 'MATCHES'; 

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    opponents: [],
    matches: []
  },
  getters: {

    activeOpponents: state => {

      return state.opponents.filter(o => o.active);
    }
  },
  mutations: {

    [SET_OPPONENTS](state, payload){

      state.opponents = payload;
    },
    [ADD_OPPONENT](state, payload){

      state.opponents.push(payload);
    },
    [REMOVE_OPPONENT](state, payload){

      const indexOf = state.opponents.indexOf(payload);
      state.opponents.splice(indexOf, 1);
    },
    [SET_MATCHES](state, payload){

      state.matches = payload;
    },
    [ADD_MATCHES](state, payload){

      state.matches.push(payload);
    },
    [REMOVE_MATCHES](state, payload){

      const indexOf = state.matches.indexOf(payload);
      state.matches.splice(indexOf, 1);
    }
  },
  actions: {

    async [INIT_APP]({commit}) {

      const opponentObj = localStorage.getItem(OPPONENTS);
      const opponents = JSON.parse(opponentObj);
      
      if(opponents != null){

        commit(SET_OPPONENTS, opponents)
      }
      
      const matchesObj = localStorage.getItem(MATCHES);
      const matches = JSON.parse(matchesObj);

      if(matches != null){

        commit(SET_MATCHES, matches);
      }
    },

    [ADD_OPPONENT]({commit, state}, payload){

      commit(ADD_OPPONENT, payload);

      localStorage.setItem(OPPONENTS, JSON.stringify(state.opponents));
    }
    
  },
  modules: {}
});

export { INIT_APP, ADD_OPPONENT, REMOVE_OPPONENT };