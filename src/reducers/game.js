import { PLAY_GAME, PAUSE_GAME } from '../actions/index';

export const isInPlay = (prevState = [], action = {}) => {
  let nextState = Object.assign({}, prevState);

  if (action.type === PLAY_GAME) {
    nextState.isInPlay = true;
  } else if (action.type === PAUSE_GAME) {
    nextState.isInPlay = false;
  }

  return nextState;
};
