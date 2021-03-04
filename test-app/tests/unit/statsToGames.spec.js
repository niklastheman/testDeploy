import {
  registerPoint,
  registerSet,
  increasePoint,
} from "@/logic/statsToGames.js";

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
} from "@/logic/types.js";

const testObj = {
  // numberOfGamesUser: 1,
  // numberOfGamesOpponent: 1,
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

test("register set report style", () => {
  let unforcedForehandUserExpected = testObj.unforcedForehandUser;
  let unforcedBackhandUserExpected = testObj.unforcedBackhandUser;
  let unforcedForehandOpponentExpected = testObj.unforcedForehandOpponent;
  let unforcedBackhandOpponentExpected = testObj.unforcedBackhandOpponent;
  let acesUserExpected = testObj.acesUser;
  let doubleFaultsUserExpected = testObj.doubleFaultsUser;
  let acesOpponentExpected = testObj.acesOpponent;
  let doubleFaultsOpponentExpected = testObj.doubleFaultsOpponent;
  let winnersForehandUserExpected = testObj.winnersForehandUser;
  let winnersBackhandUserExpected = testObj.winnersBackhandUser;
  let winnersForehandOpponentExpected = testObj.winnersForehandOpponent;
  let winnersBackhandOpponentExpected = testObj.winnersBackhandOpponent;

  const result = registerSet(testObj);

  let unforcedForehandUser = 0;
  let unforcedBackhandUser = 0;
  let unforcedForehandOpponent = 0;
  let unforcedBackhandOpponent = 0;
  let acesUser = 0;
  let doubleFaultsUser = 0;
  let acesOpponent = 0;
  let doubleFaultsOpponent = 0;
  let winnersForehandUser = 0;
  let winnersBackhandUser = 0;
  let winnersForehandOpponent = 0;
  let winnersBackhandOpponent = 0;

  for (const game of result) {
    for (const point of game.points) {
      switch (point) {
        case UNFORCED_FOREHAND_USER:
          unforcedForehandUser++;
          break;
        case UNFORCED_BACKHAND_USER:
          unforcedBackhandUser++;
          break;
        case UNFORCED_FOREHAND_OPPONENT:
          unforcedForehandOpponent++;
          break;
        case UNFORCED_BACKHAND_OPPONENT:
          unforcedBackhandOpponent++;
          break;
        case ACES_USER:
          acesUser++;
          break;
        case DOUBLE_FAULTS_USER:
          doubleFaultsUser++;
          break;
        case ACES_OPPONENT:
          acesOpponent++;
          break;
        case DOUBLE_FAULTS_OPPONENT:
          doubleFaultsOpponent++;
          break;
        case WINNERS_FOREHAND_USER:
          winnersForehandUser++;
          break;
        case WINNERS_BACKHAND_USER:
          winnersBackhandUser++;
          break;
        case WINNERS_FOREHAND_OPPONENT:
          winnersForehandOpponent++;
          break;
        case WINNERS_BACKHAND_OPPONENT:
          winnersBackhandOpponent++;
          break;
      }
    }
  }

  expect(result.length).toBe(10);
  // expect(result.length).toBe(2);
  expect(unforcedForehandUser).toBe(unforcedForehandUserExpected);
  expect(unforcedBackhandUser).toBe(unforcedBackhandUserExpected);
  expect(unforcedForehandOpponent).toBe(unforcedForehandOpponentExpected);
  expect(unforcedBackhandOpponent).toBe(unforcedBackhandOpponentExpected);
  expect(acesUser).toBe(acesUserExpected);
  expect(doubleFaultsUser).toBe(doubleFaultsUserExpected);
  expect(acesOpponent).toBe(acesOpponentExpected);
  expect(doubleFaultsOpponent).toBe(doubleFaultsOpponentExpected);
  expect(winnersForehandUser).toBe(winnersForehandUserExpected);
  expect(winnersBackhandUser).toBe(winnersBackhandUserExpected);
  expect(winnersForehandOpponent).toBe(winnersForehandOpponentExpected);
  expect(winnersBackhandOpponent).toBe(winnersBackhandOpponentExpected);
});

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

test("increase point from 30 all", () => {
  const game = {
    user: POINTS_30,
    opponent: POINTS_30,
  };
  increasePoint(game, "user");

  expect(game.user).toBe(POINTS_40);
  expect(game.opponent).toBe(POINTS_30);
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
