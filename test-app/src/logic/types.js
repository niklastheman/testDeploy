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

export {
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
  pointScoreTypes
};
