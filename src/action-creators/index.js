import { BUILD_BOARD, POPULATE_ENTITIES, TOGGLE_VALUE, NEXT_TICK } from '../actions/index';
import { getNeighbours, applyRules } from '../reducers/board';

export const toggleValue = ({id, curValue, columns}) => {
  const colourArray = new Array(columns);
  colourArray.fill(0);

  return {
    type: TOGGLE_VALUE,
    payload: {
      id,
      curValue,
      colours: colourArray.map(() => (~~(Math.random() * (1 << 24))).toString(16))
    }
  };
};

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

const nextTickInterval = ({columns, applyRules, board, dispatch}) => {
  const colourArray = new Array(columns);
  colourArray.fill(0);

  dispatch({
    type: NEXT_TICK,
    payload: {
      applyRules,
      board,
      colours: colourArray.map(() => (~~(Math.random() * (1 << 24))).toString(16))
    }
  });
};

export const nextTick = ({columns}) => (dispatch, getState) => {
  setInterval(nextTickInterval.bind(null, {
    columns,
    applyRules,
    board: getState().board,
    dispatch
  }), 500);
};
