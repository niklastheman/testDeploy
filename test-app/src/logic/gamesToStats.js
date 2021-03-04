import {
  POINTS_GAME,
  UNSPECIFIED_POINT_OPPONENT,
  UNSPECIFIED_POINT_USER,
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
} from "./types.js";

const convertGamesToStats = (games) => {
  const result = {
    numberOfGamesUser: 0,
    numberOfGamesOpponent: 0,
    [UNFORCED_FOREHAND_USER]: 0,
    [UNFORCED_BACKHAND_USER]: 0,
    [UNFORCED_FOREHAND_OPPONENT]: 0,
    [UNFORCED_BACKHAND_OPPONENT]: 0,
    [ACES_USER]: 0,
    [DOUBLE_FAULTS_USER]: 0,
    [ACES_OPPONENT]: 0,
    [DOUBLE_FAULTS_OPPONENT]: 0,
    [WINNERS_FOREHAND_USER]: 0,
    [WINNERS_BACKHAND_USER]: 0,
    [WINNERS_FOREHAND_OPPONENT]: 0,
    [WINNERS_BACKHAND_OPPONENT]: 0,
  };

  for (const game of games) {
    for (const point of game.points) {
      if (
        point != UNSPECIFIED_POINT_USER &&
        point != UNSPECIFIED_POINT_OPPONENT
      ) {
        result[point]++;
      }
    }
    if (game.user == POINTS_GAME) {
      result.numberOfGamesUser++;
    } else {
      result.numberOfGamesOpponent++;
    }
  }

  return result;
};

export { convertGamesToStats };
