const POINTS_15 = "15";
const POINTS_30 = "30";
const POINTS_40 = "40";
const POINTS_AD = "AD";
const POINTS_GAME = "GAME";

const pointScoreTypes = [
  POINTS_15,
  POINTS_30,
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
  userPoint: [
    UNFORCED_FOREHAND_OPPONENT,
    UNFORCED_BACKHAND_OPPONENT,
    ACES_USER,
    DOUBLE_FAULTS_OPPONENT,
    WINNERS_FOREHAND_USER,
    WINNERS_BACKHAND_USER,
    UNSPECIFIED_POINT_USER,
  ],
  opponentPoint: [
    UNFORCED_FOREHAND_USER,
    UNFORCED_BACKHAND_USER,
    DOUBLE_FAULTS_USER,
    ACES_OPPONENT,
    WINNERS_FOREHAND_OPPONENT,
    WINNERS_BACKHAND_OPPONENT,
    UNSPECIFIED_POINT_OPPONENT,
  ],
};

const increasePoint = (game, player) => {
  if (game["user"] != POINTS_GAME && game["opponent"] != POINTS_GAME) {
    const otherPlayer = player == "user" ? "opponent" : "user";

    if (pointScoreTypes.indexOf(game[otherPlayer]) < 3) {
      let indexOf = pointScoreTypes.indexOf(game[player]);

      if (indexOf == 3) {
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
  if (pointEndingReasonTypes.userPoint.includes(pointEndingReason)) {
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

    result.push(game);
  }

  for (const i of Array(numberOfGamesOpponent).keys()) {
    const game = {
      activeReport: false,
      user: null,
      opponent: null,
      points: [],
    };

    result.push(game);
  }

  return result;
};

const registerRallyPoint = (set, game, userPointType, index) => {
  if (set[pointEndingReasonTypes[userPointType][index]] > 0) {
    registerPoint(game, pointEndingReasonTypes[userPointType][index]);

    set[pointEndingReasonTypes[userPointType][index]]--;
  } else {
    registerPoint(
      game,
      userPointType == "userPoint"
        ? UNSPECIFIED_POINT_USER
        : UNSPECIFIED_POINT_OPPONENT
    );
  }
};

const registerRallyPoints = (games, set) => {
  while (
    set.unforcedForehandOpponent +
      set.unforcedBackhandOpponent +
      set.unforcedForehandUser +
      set.unforcedBackhandUser +
      set.winnersForehandUser +
      set.winnersBackhandUser +
      set.winnersForehandOpponent +
      set.winnersBackhandOpponent >
    0
  ) {
    let currIndexUserPoints = 0;
    let currIndexOpponentPoints = 0;
    for (const game of games) {
      if (
        pointEndingReasonTypes.userPoint[currIndexUserPoints] ==
        UNSPECIFIED_POINT_USER
      ) {
        currIndexUserPoints = 0;
      }

      registerRallyPoint(set, game, "userPoint", currIndexUserPoints);

      currIndexUserPoints++;

      if (
        pointEndingReasonTypes.opponentPoint[currIndexOpponentPoints] ==
        UNSPECIFIED_POINT_OPPONENT
      ) {
        currIndexOpponentPoints = 0;
      }

      registerRallyPoint(set, game, "opponentPoint", currIndexOpponentPoints);

      currIndexOpponentPoints++;
    }
  }
};

const registerServePoints = (games, set) => {

}

const registerSet = (
  set
  //   {
  //   numberOfGamesUser,
  //   numberOfGamesOpponent,
  //   unforcedForehandUser,
  //   unforcedBackhandUser,
  //   unforcedForehandOpponent,
  //   unforcedBackhandOpponent,
  //   acesUser,
  //   doubleFaultsUser,
  //   acesOpponent,
  //   doubleFaultsOpponent,
  //   winnersForehandUser,
  //   winnersBackhandUser,
  //   winnersForehandOpponent,
  //   winnersBackhandOpponent,
  // }
) => {
  // let unforcedForehandUserLeft = unforcedForehandUser;
  // let unforcedBackhandUserLeft = unforcedBackhandUser;
  // let unforcedForehandOpponentLeft = unforcedForehandOpponent;
  // let unforcedBackhandOpponentLeft = unforcedBackhandOpponent;
  // let acesUserLeft = acesUser;
  // let doubleFaultsUserLeft = doubleFaultsUser;
  // let acesOpponentLeft = acesOpponent;
  // let doubleFaultsOpponentLeft = doubleFaultsOpponent;
  // let winnersForehandUserLeft = winnersForehandUser;
  // let winnersBackhandUserLeft = winnersBackhandUser;
  // let winnersForehandOpponentLeft = winnersForehandOpponent;
  // let winnersBackhandOpponenLeft = winnersBackhandOpponent;

  const result = getGames(set.numberOfGamesUser, set.numberOfGamesOpponent);

  registerRallyPoints(result, set);
  registerServePoints(result, set);

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
