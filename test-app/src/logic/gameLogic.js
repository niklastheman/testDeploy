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

    if (game[otherPlayer] != POINTS_AD) {
      const indexOf = pointScoreTypes.indexOf(game[player]);
      game[player] = pointScoreTypes[indexOf + 1];
    } else {
      game[otherPlayer] = POINTS_40;
    }
  }
};

const registerPoint = (game, pointEndingReason) => {
  game[pointEndingReason] = game[pointEndingReason]
    ? game[pointEndingReason] + 1
    : 1;

  console.log(game);
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

const registerSet = ({
  numberOfGamesUser,
  numberOfGamesOpponent,
  unforcedForehandUser,
  unforcedBackhandUser,
  unforcedForehandOpponent,
  unforcedBackhandOpponent,
  acesUser,
  doubleFaultsUser,
  acesOpponent,
  doubleFaultsOpponent,
  winnersForehandUser,
  winnersBackhandUser,
  winnersForehandOpponent,
  winnersBackhandOpponent,
}) => {
  // console.log(
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
  //   winnersBackhandOpponent
  // );

  const result = [];

  for (const i of Array(numberOfGamesUser).keys()) {
    const game = {
      userPoints: POINTS_GAME,
      opponentPoints: POINTS_40,
    };

    result.push(game);
  }

  for (const i of Array(numberOfGamesOpponent).keys()) {
    const game = {
      userPoints: POINTS_40,
      opponentPoints: POINTS_GAME,
    };

    result.push(game);
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
