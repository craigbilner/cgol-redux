import { BUILD_BOARD, POPULATE_ENTITIES } from '../actions/index';

export const buildBoard = ({rows, columns}) => ({
  type: BUILD_BOARD,
  payload: {
    rows,
    columns
  }
});

export const populateEntities = ({board}) => ({
  type: POPULATE_ENTITIES,
  payload: {
    board
  }
});

export const initGrid = (opts) => (dispatch, getState) => {
  dispatch(buildBoard(opts));
  dispatch(populateEntities({
    board: getState().board
  }));
};
