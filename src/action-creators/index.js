import { BUILD_BOARD, POPULATE_ENTITIES } from '../actions/index';
import { getNeighbours } from '../reducers/board';

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
