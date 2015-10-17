import { BUILD_BOARD, POPULATE_ENTITIES, TOGGLE_VALUE, NEXT_TICK, PLAY_GAME, PAUSE_GAME } from '../actions/index';
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

const nextTickInterval = ({applyRules, board, dispatch}) => {
  const colourArray = new Array(board[0].length);
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

let interval = 0;

export const nextTick = (dispatch, { board }) => {
  interval = setInterval(nextTickInterval.bind(null, {
    applyRules,
    board,
    dispatch
  }), 500);
};

const playGame = ({dispatch, state}) => {
  dispatch({
    type: PLAY_GAME
  });
  nextTick(dispatch, state);
};

const pauseGame = dispatch => {
  dispatch({
    type: PAUSE_GAME
  });
  clearInterval(interval)
};

export const toggleInPlay = ()  => (dispatch, getState) => {
  if (getState().isInPlay) {
    pauseGame(dispatch);
  } else {
    playGame({
      dispatch,
      state: getState()
    });
  }
};