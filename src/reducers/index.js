import { combineReducers } from 'redux';
import { board, entities} from './board';
import { isInPlay, gameSpeed } from './game';

export default combineReducers({
  board,
  entities,
  isInPlay,
  gameSpeed
});

