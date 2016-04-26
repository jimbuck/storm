import test from 'ava';
import Top from './top';

import {
  PLAYER_A,
  PLAYER_B,
  PLAYER_C,
  PLAYER_D,
  PLAYER_E,
  PLAYER_F,
  PLAYERS
} from './test-data';

test('return the top n items', t => {
  let top = new Top();

  let result = top.select([PLAYER_C, PLAYER_B, PLAYER_D, PLAYER_A], 2);

  t.is(result[0], PLAYER_D);
  t.is(result[1], PLAYER_C);
});

test('return all items if less than count', t => {
  let top = new Top();

  let players = [PLAYER_C, PLAYER_B, PLAYER_D, PLAYER_A];

  let result = top.select(players, 8);

  t.is(result.length, players.length);
  t.is(result[0], PLAYER_D);
  t.is(result[1], PLAYER_C);
  t.is(result[2], PLAYER_B);
  t.is(result[3], PLAYER_A);
});