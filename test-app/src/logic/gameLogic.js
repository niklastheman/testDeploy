const POINTS_15 = "15";
const POINTS_30 = "30";
const POINTS_40 = "40";
const POINTS_AD = "AD";
const POINTS_GAME = "GAME";

const pointScoreTypes = [
  POINTS_15,
  POINTS_30,
  POINTS_40,
  POINTS_AD,
  POINTS_GAME,
];

const UNFORCED_FOREHAND_USER = "unforcedForehandUser";
const UNFORCED_BACKHAND_USER = "unforcedBackhandUser";
const UNFORCED_FOREHAND_OPPONENT = "unforcedForehandOpponent";
const UNFORCED_BACKHAND_OPPONENT = "unforcedBackhandOpponent";
const ACES_USER = "acesUser";
const DOUBLE_FAULTS_USER = "doubleFaultsUser";
const ACES_OPPONENT = "acesOpponent";
const DOUBLE_FAULTS_OPPONENT = "doubleFaultsOpponent";
const WINNERS_FOREHAND_USER = "winnersForehandUser";
const WINNERS_BACKHAND_USER = "winnersBackhandUser";
const WINNERS_FOREHAND_OPPONENT = "winnersForehandOpponent";
const WINNERS_BACKHAND_OPPONENT = "winnersBackhandOpponent";
const UNSPECIFIED_POINT_USER = "unspecifiedPointUser";
const UNSPECIFIED_POINT_OPPONENT = "unspecifiedPointOpponent";

const pointEndingReasonTypes = {
  userRallyPoint: [
    UNFORCED_FOREHAND_OPPONENT,
    UNFORCED_BACKHAND_OPPONENT,
    WINNERS_FOREHAND_USER,
    WINNERS_BACKHAND_USER,
  ],
  userServePoint: [ACES_USER, DOUBLE_FAULTS_OPPONENT],
  opponentRallyPoint: [
    UNFORCED_FOREHAND_USER,
    UNFORCED_BACKHAND_USER,
    WINNERS_FOREHAND_OPPONENT,
    WINNERS_BACKHAND_OPPONENT,
  ],
  opponentServePoint: [DOUBLE_FAULTS_USER, ACES_OPPONENT],
};

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

const registerPointByIndex = (set, game, userPointType, index) => {
  if (set[pointEndingReasonTypes[userPointType][index]] > 0) {
    registerPoint(game, pointEndingReasonTypes[userPointType][index]);

    set[pointEndingReasonTypes[userPointType][index]]--;
  } else {
    registerPoint(
      game,
      userPointType == "userRallyPoint" || userPointType == "userServePoint"
        ? UNSPECIFIED_POINT_USER
        : UNSPECIFIED_POINT_OPPONENT
    );
  }
};

const registerRallyPoints = (games, set) => {
  let currIndexUserPoints = 0;
  let currIndexOpponentPoints = 0;
  while (
    (set[UNFORCED_FOREHAND_OPPONENT] ?? 0) +
      (set[UNFORCED_BACKHAND_OPPONENT] ?? 0) +
      (set[UNFORCED_FOREHAND_USER] ?? 0) +
      (set[UNFORCED_BACKHAND_USER] ?? 0) +
      (set[WINNERS_FOREHAND_USER] ?? 0) +
      (set[WINNERS_BACKHAND_USER] ?? 0) +
      (set[WINNERS_FOREHAND_OPPONENT] ?? 0) +
      (set[WINNERS_BACKHAND_OPPONENT] ?? 0) >
    0
  ) {
    for (const game of games) {
      if (currIndexUserPoints == pointEndingReasonTypes.userRallyPoint.length) {
        currIndexUserPoints = 0;
      }

      registerPointByIndex(set, game, "userRallyPoint", currIndexUserPoints);

      currIndexUserPoints++;

      if (
        currIndexOpponentPoints ==
        pointEndingReasonTypes.opponentRallyPoint.length
      ) {
        currIndexOpponentPoints = 0;
      }

      registerPointByIndex(
        set,
        game,
        "opponentRallyPoint",
        currIndexOpponentPoints
      );

      currIndexOpponentPoints++;
    }
  }
};

const registerServePoints = (games, set) => {
  let currIndexUserPoints = 0;
  let currIndexOpponentPoints = 0;
  const halfSize = Math.ceil(games.length / 2);

  while (
    (set.acesUser ?? 0) +
      (set.doubleFaultsOpponent ?? 0) +
      (games.length > 1
        ? (set.acesOpponent ?? 0) + (set.doubleFaultsUser ?? 0)
        : 0) >
    0
  ) {
    for (let i = 0; i < halfSize; i++) {
      if (currIndexUserPoints == pointEndingReasonTypes.userServePoint.length) {
        currIndexUserPoints = 0;
      }
      const game = games[i];

      registerPointByIndex(set, game, "userServePoint", currIndexUserPoints);
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
        set,
        game,
        "opponentServePoint",
        currIndexOpponentPoints
      );
      registerPoint(game, UNSPECIFIED_POINT_USER);
      currIndexOpponentPoints++;
    }
  }
};

const registerSet = (set) => {
  const result = getGames(set.numberOfGamesUser, set.numberOfGamesOpponent);

  registerRallyPoints(result, set);
  registerServePoints(result, set);

  let gameIndex = 0;

  while (
    result.filter((game) => game.user == POINTS_GAME).length <
    set.numberOfGamesUser
  ) {
    while (result[gameIndex].user != POINTS_GAME) {
      registerPoint(result[gameIndex], UNSPECIFIED_POINT_USER);
    }

    gameIndex++;
  }

  while (
    result.filter((game) => game.opponent == POINTS_GAME).length <
    set.numberOfGamesOpponent
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
  registerSet,
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
