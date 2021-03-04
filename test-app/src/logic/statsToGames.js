import {
  POINTS_15,
  POINTS_30,
  POINTS_40,
  POINTS_AD,
  POINTS_GAME,
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
  UNSPECIFIED_POINT_USER,
  UNSPECIFIED_POINT_OPPONENT,
  pointEndingReasonTypes,
  pointScoreTypes,
} from "./types.js";

const increasePoint = (game, player) => {
  if (game["user"] != POINTS_GAME && game["opponent"] != POINTS_GAME) {
    const otherPlayer = player == "user" ? "opponent" : "user";

    if (pointScoreTypes.indexOf(game[otherPlayer]) < 2) {
      let indexOf = pointScoreTypes.indexOf(game[player]);

      if (indexOf == 2) {
        indexOf++;
      }

      game[player] = pointScoreTypes[indexOf + 1];
    } else if (game[otherPlayer] == POINTS_40) {
      const indexOf = pointScoreTypes.indexOf(game[player]);
      game[player] = pointScoreTypes[indexOf + 1];
    } else {
      game[otherPlayer] = POINTS_40;
    }
  }
};

const registerPoint = (game, pointEndingReason) => {
  if (
    pointEndingReasonTypes.userRallyPoint.includes(pointEndingReason) ||
    pointEndingReasonTypes.userServePoint.includes(pointEndingReason) ||
    pointEndingReason == UNSPECIFIED_POINT_USER
  ) {
    increasePoint(game, "user");
  } else {
    increasePoint(game, "opponent");
  }

  if (!game["points"]) {
    game["points"] = [];
  }

  game["points"].push(pointEndingReason);
};

const getGames = (numberOfGamesUser, numberOfGamesOpponent) => {
  const result = [];

  for (const i of Array(numberOfGamesUser).keys()) {
    const game = {
      activeReport: false,
      user: null,
      opponent: null,
      points: [],
    };

    i;
    result.push(game);
  }

  for (const i of Array(numberOfGamesOpponent).keys()) {
    const game = {
      activeReport: false,
      user: null,
      opponent: null,
      points: [],
    };
    i;
    result.push(game);
  }

  return result;
};

const registerPointByIndex = (stats, game, userPointType, index) => {
  if (stats[pointEndingReasonTypes[userPointType][index]] > 0) {
    registerPoint(game, pointEndingReasonTypes[userPointType][index]);

    stats[pointEndingReasonTypes[userPointType][index]]--;
  } else {
    registerPoint(
      game,
      userPointType == "userRallyPoint" || userPointType == "userServePoint"
        ? UNSPECIFIED_POINT_USER
        : UNSPECIFIED_POINT_OPPONENT
    );
  }
};

const registerRallyPoints = (games, stats) => {
  let currIndexUserPoints = 0;
  let currIndexOpponentPoints = 0;
  while (
    (stats[UNFORCED_FOREHAND_OPPONENT] ?? 0) +
      (stats[UNFORCED_BACKHAND_OPPONENT] ?? 0) +
      (stats[UNFORCED_FOREHAND_USER] ?? 0) +
      (stats[UNFORCED_BACKHAND_USER] ?? 0) +
      (stats[WINNERS_FOREHAND_USER] ?? 0) +
      (stats[WINNERS_BACKHAND_USER] ?? 0) +
      (stats[WINNERS_FOREHAND_OPPONENT] ?? 0) +
      (stats[WINNERS_BACKHAND_OPPONENT] ?? 0) >
    0
  ) {
    for (const game of games) {
      if (currIndexUserPoints == pointEndingReasonTypes.userRallyPoint.length) {
        currIndexUserPoints = 0;
      }

      registerPointByIndex(stats, game, "userRallyPoint", currIndexUserPoints);

      currIndexUserPoints++;

      if (
        currIndexOpponentPoints ==
        pointEndingReasonTypes.opponentRallyPoint.length
      ) {
        currIndexOpponentPoints = 0;
      }

      registerPointByIndex(
        stats,
        game,
        "opponentRallyPoint",
        currIndexOpponentPoints
      );

      currIndexOpponentPoints++;
    }
  }
};

const registerServePoints = (games, stats) => {
  let currIndexUserPoints = 0;
  let currIndexOpponentPoints = 0;
  const halfSize = Math.ceil(games.length / 2);

  while (
    (stats.acesUser ?? 0) +
      (stats.doubleFaultsOpponent ?? 0) +
      (games.length > 1
        ? (stats.acesOpponent ?? 0) + (stats.doubleFaultsUser ?? 0)
        : 0) >
    0
  ) {
    for (let i = 0; i < halfSize; i++) {
      if (currIndexUserPoints == pointEndingReasonTypes.userServePoint.length) {
        currIndexUserPoints = 0;
      }
      const game = games[i];

      registerPointByIndex(stats, game, "userServePoint", currIndexUserPoints);
      registerPoint(game, UNSPECIFIED_POINT_OPPONENT);
      currIndexUserPoints++;
    }

    for (let i = halfSize; i < games.length; i++) {
      if (
        currIndexOpponentPoints ==
        pointEndingReasonTypes.opponentServePoint.length
      ) {
        currIndexOpponentPoints = 0;
      }
      const game = games[i];

      registerPointByIndex(
        stats,
        game,
        "opponentServePoint",
        currIndexOpponentPoints
      );
      registerPoint(game, UNSPECIFIED_POINT_USER);
      currIndexOpponentPoints++;
    }
  }
};

const convertStatsToGames = (stats) => {
  const result = getGames(stats.numberOfGamesUser, stats.numberOfGamesOpponent);

  registerRallyPoints(result, stats);
  registerServePoints(result, stats);

  let gameIndex = 0;

  while (
    result.filter((game) => game.user == POINTS_GAME).length <
    stats.numberOfGamesUser
  ) {
    while (result[gameIndex].user != POINTS_GAME) {
      registerPoint(result[gameIndex], UNSPECIFIED_POINT_USER);
    }

    gameIndex++;
  }

  while (
    result.filter((game) => game.opponent == POINTS_GAME).length <
    stats.numberOfGamesOpponent
  ) {
    while (result[gameIndex].opponent != POINTS_GAME) {
      registerPoint(result[gameIndex], UNSPECIFIED_POINT_OPPONENT);
    }

    gameIndex++;
  }

  return result;
};

export {
  increasePoint,
  registerPoint,
  convertStatsToGames,
  POINTS_15,
  POINTS_30,
  POINTS_40,
  POINTS_AD,
  POINTS_GAME,
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
  UNSPECIFIED_POINT_USER,
  UNSPECIFIED_POINT_OPPONENT,
};
