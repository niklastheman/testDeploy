import { POINTS_GAME, POINTS_0 } from "./types";

const convertSetsToScore = (sets) => {
  const result = {
    user: {
      sets: 0,
      games: [],
      points: POINTS_0,
    },
    opponent: {
      sets: 0,
      games: [],
      points: POINTS_0,
    },
  };

  for (let i = 0; i < sets.length; i++) {
    const set = sets[i];
    result.user.games[i] = 0;
    result.opponent.games[i] = 0;

    for (const game of set.games) {
      if (game.user == POINTS_GAME) {
        result.user.games[i]++;
      } else if (game.opponent == POINTS_GAME) {
        result.opponent.games[i]++;
      } else {
        result.user.points = game.user;
        result.opponent.points = game.opponent;
      }
    }

    if (
      (result.user.games[i] === 6 && result.opponent.games[i] <= 4) ||
      result.user.games[i] === 7
    ) {
      result.user.sets++;
    } else if (
      (result.opponent.games[i] === 6 && result.user.games[i] <= 4) ||
      result.opponent.games[i] === 7
    ) {
      result.opponent.sets++;
    }
  }

  return result;
};

export { convertSetsToScore };
