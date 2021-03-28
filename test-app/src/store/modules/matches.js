import { v4 as uuidv4 } from "uuid";
import { convertStatsToGames } from "@/logic/statsToGames";
import { convertGamesToStats } from "@/logic/gamesToStats";
import { convertSetsToScore } from "@/logic/setsToScore";
import {
  UNFORCED_FOREHAND_USER,
  UNFORCED_BACKHAND_USER,
  UNFORCED_FOREHAND_OPPONENT,
  UNFORCED_BACKHAND_OPPONENT,
  ACES_USER,
  DOUBLE_FAULTS_USER,
  ACES_OPPONENT,
  DOUBLE_FAULTS_OPPONENT,
  WINNERS_FOREHAND_USER,
  WINNERS_BACKHAND_USER,
  WINNERS_FOREHAND_OPPONENT,
  WINNERS_BACKHAND_OPPONENT,
} from "@/logic/types";

const NAMESPACE = "matches/";
//mutations
const _SET_MATCHES = "SET_MATCHES";
const _SET_ACTIVE_MATCH = "_SET_ACTIVE_MATCH";
const _ADD_MATCHES = "ADD_MATCHES";
const _REMOVE_MATCHES = "REMOVE_MATCHES";
const _ADD_SET = "ADD_SET";
const _ADD_SET_ACTIVE_MATCH = "_ADD_SET_ACTIVE_MATCH";
const _SET_SETS = "_SET_SETS";
const _SET_SETS_MATCH = "_SET_SETS_MATCH";
const _REMOVE_SETS_OF_MATCH = "_REMOVE_SETS_OF_MATCH";
const _SET_GAMES_ACTIVE_MATCH = "_SET_GAMES_ACTIVE_MATCH";
const _SET_GAMES_MATCH = "_SET_GAMES_MATCH";
const _SET_SETS_ACTIVE_MATCH = "_SET_SETS_ACTIVE_MATCH";
const _SET_GAMES = "_SET_GAMES";
const _REMOVE_GAMES_OF_MATCH = "_REMOVE_GAMES_OF_MATCH";

const SET_MATCHES = `${NAMESPACE}${_SET_MATCHES}`;
const SET_ACTIVE_MATCH = `${NAMESPACE}${_SET_ACTIVE_MATCH}`;
const ADD_MATCHES = `${NAMESPACE}${_ADD_MATCHES}`;
const REMOVE_MATCHES = `${NAMESPACE}${_REMOVE_MATCHES}`;
const ADD_SET = `${NAMESPACE}${_ADD_SET}`;
const ADD_SET_ACTIVE_MATCH = `${NAMESPACE}${_ADD_SET_ACTIVE_MATCH}`;
const SET_SETS = `${NAMESPACE}${_SET_SETS}`;
const SET_SETS_MATCH = `${NAMESPACE}${_SET_SETS_MATCH}`;
const SET_GAMES_ACTIVE_MATCH = `${NAMESPACE}${_SET_GAMES_ACTIVE_MATCH}`;
const SET_SETS_ACTIVE_MATCH = `${NAMESPACE}${_SET_SETS_ACTIVE_MATCH}`;
const SET_GAMES = `${NAMESPACE}${_SET_GAMES}`;

// data types
const MATCHES = "MATCHES";
const SETS = "SETS";
const GAMES = "GAMES";

export {
  NAMESPACE,
  SET_MATCHES,
  SET_ACTIVE_MATCH,
  ADD_MATCHES,
  REMOVE_MATCHES,
  MATCHES,
  ADD_SET,
  ADD_SET_ACTIVE_MATCH,
  SET_SETS,
  SETS,
  SET_GAMES_ACTIVE_MATCH,
  SET_SETS_ACTIVE_MATCH,
  SET_SETS_MATCH,
  GAMES,
  SET_GAMES,
};

const state = {
  activeMatchId: null,
  matches: [],
  sets: {},
  games: {},
};

const getters = {
  matches: (state, getters, rootState) => {
    const result = [];
    const opponentState = rootState["opponents"];

    const opponents = opponentState.opponents;

    for (const match of state.matches) {
      let games = [];

      for (const set of getters.setsByMatchId(match.id)) {
        const gamesOfSet = state.games[`${match.id}#${set}`];
        if (gamesOfSet) {
          games = games.concat(gamesOfSet);
        }
      }

      const stats = convertGamesToStats(games);

      const obj = {
        ...match,
        displayName: opponents[match.opponentId].displayName,
        [UNFORCED_FOREHAND_USER]: stats[UNFORCED_FOREHAND_USER],
        [UNFORCED_BACKHAND_USER]: stats[UNFORCED_BACKHAND_USER],
        [UNFORCED_FOREHAND_OPPONENT]: stats[UNFORCED_FOREHAND_OPPONENT],
        [UNFORCED_BACKHAND_OPPONENT]: stats[UNFORCED_BACKHAND_OPPONENT],
        [ACES_USER]: stats[ACES_USER],
        [DOUBLE_FAULTS_USER]: stats[DOUBLE_FAULTS_USER],
        [ACES_OPPONENT]: stats[ACES_OPPONENT],
        [DOUBLE_FAULTS_OPPONENT]: stats[DOUBLE_FAULTS_OPPONENT],
        [WINNERS_FOREHAND_USER]: stats[WINNERS_FOREHAND_USER],
        [WINNERS_BACKHAND_USER]: stats[WINNERS_BACKHAND_USER],
        [WINNERS_FOREHAND_OPPONENT]: stats[WINNERS_FOREHAND_OPPONENT],
        [WINNERS_BACKHAND_OPPONENT]: stats[WINNERS_BACKHAND_OPPONENT],
      };

      result.push(obj);
    }

    return result;
  },

  sets: (state, getters, rootState) => {
    const opponentState = rootState["opponents"];
    const opponents = opponentState.opponents;
    const result = [];

    for (const matchId in state.sets) {
      if (Object.hasOwnProperty.call(state.sets, matchId)) {
        const sets = state.sets[matchId];

        const match = getters.matchById(matchId);

        if (match) {
          const displayName = opponents[match.opponentId].displayName;

          for (const set of sets) {
            const gamesOfSet = state.games[`${match.id}#${set}`];

            if (gamesOfSet) {
              const stats = convertGamesToStats(gamesOfSet);

              const obj = {
                displayName: displayName,
                [UNFORCED_FOREHAND_USER]: stats[UNFORCED_FOREHAND_USER],
                [UNFORCED_BACKHAND_USER]: stats[UNFORCED_BACKHAND_USER],
                [UNFORCED_FOREHAND_OPPONENT]: stats[UNFORCED_FOREHAND_OPPONENT],
                [UNFORCED_BACKHAND_OPPONENT]: stats[UNFORCED_BACKHAND_OPPONENT],
                [ACES_USER]: stats[ACES_USER],
                [DOUBLE_FAULTS_USER]: stats[DOUBLE_FAULTS_USER],
                [ACES_OPPONENT]: stats[ACES_OPPONENT],
                [DOUBLE_FAULTS_OPPONENT]: stats[DOUBLE_FAULTS_OPPONENT],
                [WINNERS_FOREHAND_USER]: stats[WINNERS_FOREHAND_USER],
                [WINNERS_BACKHAND_USER]: stats[WINNERS_BACKHAND_USER],
                [WINNERS_FOREHAND_OPPONENT]: stats[WINNERS_FOREHAND_OPPONENT],
                [WINNERS_BACKHAND_OPPONENT]: stats[WINNERS_BACKHAND_OPPONENT],
              };

              result.push(obj);
            }
          }
        }
      }
    }

    return result;
  },

  matchById: (state) => (id) => state.matches.find((match) => match.id == id),
  activeMatch: (state, getters) => getters.matchById(state.activeMatchId),
  setsByMatchId: (state) => (id) => state.sets[id] ?? [],
  gamesByMatchSetId: (state) => (matchId, setId) =>
    state.games[`${matchId}#${setId}`] ?? [],
  activeMatchSets: (state, getters) =>
    getters.setsByMatchId(state.activeMatchId),
  gameStatsByMatchSetId: (state) => (matchId, setId) => {
    const games = state.games[`${matchId}#${setId}`];
    const stats = games ? convertGamesToStats(games) : {};
    return stats;
  },
  setsWithGamesByMatchId: (state, getters) => (matchId) => {
    const result = [];

    const sets = getters.setsByMatchId(matchId);

    for (const set of sets) {
      const games = getters.gamesByMatchSetId(matchId, set);
      result.push({
        set,
        games,
      });
    }

    return result;
  },
  activeMatchSetsWithGames: (state, getters) =>
    getters.setsWithGamesByMatchId(state.activeMatchId),

  activeMatchScore: (state, getters) =>
    convertSetsToScore(getters.activeMatchSetsWithGames),

  shotsSummarized: (state) => {
    let games = [];

    for (const key in state.games) {
      if (Object.hasOwnProperty.call(state.games, key)) {
        games = games.concat(state.games[key]);
      }
    }

    return convertGamesToStats(games);
  },
  shotsSummarizedArray: (state, getters) => {
    const result = [];
    const obj = getters.shotsSummarized;

    for (const key in obj) {
      if (
        Object.hasOwnProperty.call(obj, key) &&
        key != "numberOfGamesUser" &&
        key != "numberOfGamesOpponent"
      ) {
        const value = obj[key];

        result.push({ key: key, value: value });
      }
    }

    result.sort((a, b) => {
      let comparison = 0;

      if (a.value < b.value) {
        comparison = 1;
      } else if (a.value > b.value) {
        comparison = -1;
      }

      return comparison;
    });

    return result;
  },
  scoreSummarized: (state, getters) => {
    const result = {
      user: {
        matches: 0,
        sets: 0,
        games: 0,
      },
      opponent: {
        matches: 0,
        sets: 0,
        games: 0,
      },
    };

    for (const match of state.matches) {
      const sets = state.sets[match.id];
      const matchSets = [];

      for (const set of sets) {
        const games = getters.gamesByMatchSetId(match.id, set);

        matchSets.push({
          set,
          games,
        });
      }
      const matchStats = convertSetsToScore(matchSets);
      result.user.sets += matchStats.user.sets;
      result.opponent.sets += matchStats.opponent.sets;

      for (const gameScore of matchStats.user.games) {
        result.user.games += gameScore;
      }

      for (const gameScore of matchStats.opponent.games) {
        result.opponent.games += gameScore;
      }

      if (
        matchStats.user.sets > matchStats.opponent.sets ||
        (matchStats.user.sets == matchStats.opponent.sets &&
          matchStats.user.games > matchStats.opponent.games)
      ) {
        result.user.matches++;
      } else {
        result.opponent.matches++;
      }
    }

    return result;
  },
};

const mutations = {
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
  [_ADD_SET](state, { matchId, set }) {
    if (!state.sets[matchId]) {
      state.sets = {
        ...state.sets,
        [matchId]: [],
      };
    }

    state.sets[matchId].push(set);
  },
  [_SET_SETS](state, payload) {
    state.sets = payload;
  },
  [_SET_SETS_MATCH](state, { matchId, sets }) {
    state.sets[matchId] = sets;
  },
  [_REMOVE_SETS_OF_MATCH](state, payload) {
    delete state.sets[payload];
  },
  [_REMOVE_GAMES_OF_MATCH](state, payload) {
    for (const key in state.games) {
      if (key.startsWith(`${payload}#`)) {
        delete state.games[key];
      }
    }
  },
  [_SET_GAMES_MATCH](state, { matchId, setId, games }) {
    state.games[`${matchId}#${setId}`] = games;
  },
  [_SET_GAMES](state, payload) {
    state.games = payload;
  },
};

const actions = {
  [_ADD_MATCHES]({ commit, state, dispatch }, match) {
    commit(_ADD_MATCHES, match);
    localStorage.setItem(MATCHES, JSON.stringify(state.matches));

    const setId = uuidv4();

    dispatch(_ADD_SET, {
      matchId: match.id,
      set: setId,
    });
  },
  [_REMOVE_MATCHES]({ commit, state, getters, dispatch }, id) {
    const match = getters.matchById(id);
    commit(_REMOVE_MATCHES, match);
    localStorage.setItem(MATCHES, JSON.stringify(state.matches));

    dispatch(_REMOVE_SETS_OF_MATCH, id);
    dispatch(_REMOVE_GAMES_OF_MATCH, id);

    if (id == state.activeMatchId) {
      commit(_SET_ACTIVE_MATCH, null);
    }
  },
  [_ADD_SET]({ commit, state }, payload) {
    commit(_ADD_SET, payload);
    localStorage.setItem(SETS, JSON.stringify(state.sets));
  },
  [_ADD_SET_ACTIVE_MATCH]({ state, dispatch }, set) {
    dispatch(_ADD_SET, {
      matchId: state.activeMatchId,
      set: set,
    });
  },
  [_SET_SETS_ACTIVE_MATCH]({ commit, state }, sets) {
    commit(_SET_SETS_MATCH, {
      matchId: state.activeMatchId,
      sets: sets,
    });
    localStorage.setItem(SETS, JSON.stringify(state.sets));
  },
  [_REMOVE_SETS_OF_MATCH]({ commit, state }, matchId) {
    commit(_REMOVE_SETS_OF_MATCH, matchId);
    localStorage.setItem(SETS, JSON.stringify(state.sets));
  },
  [_REMOVE_GAMES_OF_MATCH]({ commit, state }, matchId) {
    commit(_REMOVE_GAMES_OF_MATCH, matchId);
    localStorage.setItem(GAMES, JSON.stringify(state.sets));
  },
  [_SET_GAMES_ACTIVE_MATCH]({ commit, state }, obj) {
    const games = convertStatsToGames(obj);
    commit(_SET_GAMES_MATCH, {
      games: games,
      setId: obj.setId,
      matchId: state.activeMatchId,
    });
    localStorage.setItem(GAMES, JSON.stringify(state.games));
  },
};

export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
