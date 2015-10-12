import { combineReducers } from 'redux';
import { grid, neighbours} from './board';

export default combineReducers({
  grid,
  neighbours
});

