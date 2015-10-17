import { PLAY_GAME, PAUSE_GAME } from '../actions/index';

export const isInPlay = (prevState = false, action = {}) => {
  let isPlaying = prevState;

  if (action.type === PLAY_GAME) {
    isPlaying = true;
  } else if (action.type === PAUSE_GAME) {
    isPlaying = false;
  }

  return isPlaying;
};
