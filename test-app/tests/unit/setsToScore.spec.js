import { convertSetsToScore } from "@/logic/setsToScore";
import { POINTS_0 } from "@/logic/types";

import { POINTS_15, POINTS_30, POINTS_40, POINTS_GAME } from "@/logic/types";

test("0 -0, 4 - 0 to user", () => {
  const input = [
    {
      set: "",
      games: [
        { user: POINTS_GAME, opponent: POINTS_15 },
        { user: POINTS_GAME, opponent: POINTS_30 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
      ],
    },
  ];

  const result = convertSetsToScore(input);

  expect(result.user.sets).toBe(0);
  expect(result.opponent.sets).toBe(0);
  expect(result.user.games[0]).toBe(4);
  expect(result.opponent.games[0]).toBe(0);
});

test("2 -0, 4 - 2 to user", () => {
  const input = [
    {
      set: "",
      games: [
        { user: POINTS_GAME, opponent: POINTS_15 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_30 },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
      ],
    },
    {
      set: "",
      games: [
        { user: POINTS_GAME, opponent: POINTS_15 },
        { user: POINTS_GAME, opponent: POINTS_30 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
      ],
    },
    {
      set: "",
      games: [
        { user: POINTS_GAME, opponent: POINTS_15 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_30 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
      ],
    },
  ];

  const result = convertSetsToScore(input);

  expect(result.user.sets).toBe(2);
  expect(result.opponent.sets).toBe(0);
  expect(result.user.games[0]).toBe(6);
  expect(result.opponent.games[0]).toBe(4);
  expect(result.user.games[1]).toBe(6);
  expect(result.opponent.games[1]).toBe(0);
  expect(result.user.games[2]).toBe(4);
  expect(result.opponent.games[2]).toBe(2);
  expect(result.user.points).toBe(POINTS_0);
  expect(result.opponent.points).toBe(POINTS_0);
});

test("2 -2, 2 - 4 to user", () => {
  const input = [
    {
      set: "",
      games: [
        { user: POINTS_GAME, opponent: POINTS_15 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_30 },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
      ],
    },
    {
      set: "",
      games: [
        { user: POINTS_GAME, opponent: POINTS_15 },
        { user: POINTS_GAME, opponent: POINTS_30 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
      ],
    },
    {
      set: "",
      games: [
        { user: POINTS_GAME, opponent: POINTS_15 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_30 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
      ],
    },
    {
      set: "",
      games: [
        { user: POINTS_GAME, opponent: POINTS_15 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_30 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
      ],
    },
    {
      set: "",
      games: [
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_GAME, opponent: POINTS_30 },
        { user: POINTS_GAME, opponent: POINTS_40 },
        { user: POINTS_15, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_GAME },
        { user: POINTS_30, opponent: POINTS_30 },
      ],
    },
  ];

  const result = convertSetsToScore(input);

  expect(result.user.sets).toBe(2);
  expect(result.opponent.sets).toBe(2);
  expect(result.user.games[3]).toBe(5);
  expect(result.opponent.games[3]).toBe(7);
  expect(result.user.games[4]).toBe(2);
  expect(result.opponent.games[4]).toBe(4);
  expect(result.user.points).toBe(POINTS_30);
  expect(result.opponent.points).toBe(POINTS_30);
});
