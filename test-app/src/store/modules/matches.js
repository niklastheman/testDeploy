const NAMESPACE = "matches/";
//mutations
const _SET_MATCHES = "SET_MATCHES";
const _SET_ACTIVE_MATCH = "_SET_ACTIVE_MATCH";
const _ADD_MATCHES = "ADD_MATCHES";
const _REMOVE_MATCHES = "REMOVE_MATCHES";
const _ADD_SET = "ADD_SET";
const _SET_SETS = "_SET_SETS";

const SET_MATCHES = `${NAMESPACE}${_SET_MATCHES}`;
const SET_ACTIVE_MATCH = `${NAMESPACE}${_SET_ACTIVE_MATCH}`;
const ADD_MATCHES = `${NAMESPACE}${_ADD_MATCHES}`;
const REMOVE_MATCHES = `${NAMESPACE}${_REMOVE_MATCHES}`;
const ADD_SET = `${NAMESPACE}${_ADD_SET}`;
const SET_SETS = `${NAMESPACE}${_SET_SETS}`;

// data types
const MATCHES = "MATCHES";

export {
  NAMESPACE,
  SET_MATCHES,
  SET_ACTIVE_MATCH,
  ADD_MATCHES,
  REMOVE_MATCHES,
  MATCHES,
  ADD_SET,
  SET_SETS
};

export default {
  namespaced: true,
  state: {
    activeMatchId: null,
    matches: [],
    sets: {},
    games: {},
  },
  getters: {
    matches: (state, getters, rootState) => {
      const result = [];
      const opponentState = rootState["opponents"];

      const opponents = opponentState.opponents;

      for (const match of state.matches) {
        const obj = {
          ...match,
          displayName: opponents[match.opponentId].displayName,
        };

        result.push(obj);
      }

      return result;
    },

    matchById: (state) => (id) => state.matches.find((match) => match.id == id),
    activeMatch: (state, getters) => getters.matchById(state.activeMatchId),
    setsByMatchId: (state) => (id) => state.sets[id] ?? [],
    activeMatchSets: (state, getters) =>
      getters.setsByMatchId(state.activeMatchId),
    gamesBySetId: (state) => (id) => state.games[id] ?? [],
  },
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
    [_SET_ACTIVE_MATCH](state, payload) {
      state.activeMatchId = payload;
    },
    [_ADD_SET](state, payload) {
      
      if (!state.sets[state.activeMatchId]) {
        state.sets = {
          ...state.sets,
          [state.activeMatchId]: [],
        };
      }

      state.sets[state.activeMatchId].push(payload);
    },
    [_SET_SETS](state, payload){

      state.sets[state.activeMatchId] = payload;
    }
  },
  actions: {
    [_ADD_MATCHES]({ commit, state }, payload) {
      commit(_ADD_MATCHES, payload);
      localStorage.setItem(MATCHES, JSON.stringify(state.matches));
    },
    [_REMOVE_MATCHES]({ commit, state, getters }, payload) {
      //payload == id
      const match = getters.matchById(payload);
      commit(_REMOVE_MATCHES, match);
      localStorage.setItem(MATCHES, JSON.stringify(state.matches));
    }
  },
};
