import {
  registerPoint,
  registerSet,
  increasePoint,
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
} from "@/logic/gameLogic.js";

const testObj = {
  numberOfGamesUser: 6,
  numberOfGamesOpponent: 4,
  unforcedForehandUser: 10,
  unforcedBackhandUser: 15,
  unforcedForehandOpponent: 8,
  unforcedBackhandOpponent: 7,
  acesUser: 1,
  doubleFaultsUser: 3,
  acesOpponent: 0,
  doubleFaultsOpponent: 4,
  winnersForehandUser: 3,
  winnersBackhandUser: 2,
  winnersForehandOpponent: 6,
  winnersBackhandOpponent: 1,
};

// test("register set", () => {
//   const result = registerSet(testObj);

//   expect(result.length).toBe(10);
// });

test("register point", () => {
  const game = {};
  registerPoint(game, ACES_USER);

  expect(game.user).toBe(POINTS_15);
  expect(game.opponent).toBeUndefined();
  expect(game.points.length).toBe(1);
  expect(game.points.includes(ACES_USER)).toBeTruthy();
});

test("register game winning point", () => {
  const game = {
    user: POINTS_40,
    opponent: POINTS_15,
    points: [
      ACES_USER,
      DOUBLE_FAULTS_USER,
      UNFORCED_BACKHAND_OPPONENT,
      WINNERS_FOREHAND_USER,
    ],
  };
  registerPoint(game, WINNERS_BACKHAND_USER);

  expect(game.user).toBe(POINTS_GAME);
  expect(game.opponent).toBe(POINTS_15);
  expect(game.points.length).toBe(5);
  expect(game.points.includes(ACES_USER)).toBeTruthy();
  expect(game.points.includes(DOUBLE_FAULTS_USER)).toBeTruthy();
  expect(game.points.includes(UNFORCED_BACKHAND_OPPONENT)).toBeTruthy();
  expect(game.points.includes(WINNERS_FOREHAND_USER)).toBeTruthy();
  expect(game.points.includes(WINNERS_BACKHAND_USER)).toBeTruthy();
});

test("increase point first point", () => {
  const game = {};
  increasePoint(game, "user");

  expect(game.user).toBe(POINTS_15);
  expect(game.opponent).toBeUndefined();
});

test("increase point to game", () => {
  const game = {
    user: POINTS_40,
    opponent: POINTS_15,
  };
  increasePoint(game, "user");

  expect(game.user).toBe(POINTS_GAME);
  expect(game.opponent).toBe(POINTS_15);
});

test("increase point to ad", () => {
  const game = {
    user: POINTS_40,
    opponent: POINTS_40,
  };
  increasePoint(game, "opponent");

  expect(game.user).toBe(POINTS_40);
  expect(game.opponent).toBe(POINTS_AD);
});

test("increase point from ad", () => {
  const game = {
    user: POINTS_40,
    opponent: POINTS_AD,
  };
  increasePoint(game, "user");

  expect(game.user).toBe(POINTS_40);
  expect(game.opponent).toBe(POINTS_40);
});

test("increase should not change", () => {
  const game = {
    user: POINTS_GAME,
    opponent: POINTS_40,
  };

  increasePoint(game, "user");

  expect(game.user).toBe(POINTS_GAME);
  expect(game.opponent).toBe(POINTS_40);
});
