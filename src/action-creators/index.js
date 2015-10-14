import { BUILD_BOARD, POPULATE_ENTITIES, TOGGLE_VALUE, NEXT_TICK } from '../actions/index';
import { getNeighbours, applyRules } from '../reducers/board';

export const toggleValue = ({id, curValue}) => ({
  type: TOGGLE_VALUE,
  payload: {
    id,
    curValue
  }
});

export const buildBoard = ({rows, columns}) => ({
  type: BUILD_BOARD,
  payload: {
    rows,
    columns
  }
});

export const populateEntities = ({board, rows, columns, getNeighbours}) => ({
  type: POPULATE_ENTITIES,
  payload: {
    board,
    rows,
    columns,
    getNeighbours
  }
});

export const initGrid = ({rows, columns}) => (dispatch, getState) => {
  dispatch(buildBoard({rows, columns}));
  dispatch(populateEntities({
    board: getState().board,
    rows,
    columns,
    getNeighbours
  }));
};

export const nextTick = () => (dispatch, getState) => {
  setInterval(
    dispatch.bind(null, {
      type: NEXT_TICK,
      payload: {
        applyRules,
        board: getState().board
      }
    }), 500);
};
