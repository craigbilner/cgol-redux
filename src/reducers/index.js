import { combineReducers } from 'redux';
import { board, entities} from './board';
import { isInPlay } from './game';

export default combineReducers({
  board,
  entities,
  isInPlay
});

