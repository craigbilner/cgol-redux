import { PLAY_GAME, PAUSE_GAME, CHANGE_SPEED } from '../actions/index';

export const isInPlay = (prevState = false, action = {}) => {
  let isPlaying = prevState;

  if (action.type === PLAY_GAME) {
    isPlaying = true;
  } else if (action.type === PAUSE_GAME) {
    isPlaying = false;
  }

  return isPlaying;
};

export const gameSpeed = (prevState = 1, action = {}) => {
  let speed = prevState;

  if (action.type === CHANGE_SPEED) {
    speed = action.payload.speed;
  }

  return speed;
};