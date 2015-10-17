import { BUILD_BOARD, POPULATE_ENTITIES, TOGGLE_VALUE, NEXT_TICK, PLAY_GAME, PAUSE_GAME } from '../actions/index';
import { getNeighbours, applyRules } from '../reducers/board';

export const toggleValue = ({id, curValue}) => {
  return {
    type: TOGGLE_VALUE,
    payload: {
      id,
      curValue,
      colour: (~~(Math.random() * (1 << 24))).toString(16)
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

const nextTickInterval = ({applyRules, board, dispatch, cb}) => {
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
  cb();
};

export const autoPlay = (dispatch, getState) => {
  const { board, entities, isInPlay } = getState();
  if (entities.aliveCount && isInPlay) {
    setTimeout(nextTickInterval.bind(null, {
      applyRules,
      board,
      dispatch,
      cb: autoPlay.bind(null, dispatch, getState)
    }), 500);
  } else {
    pauseGame(dispatch);
  }
};

const playGame = ({dispatch, getState}) => {
  dispatch({
    type: PLAY_GAME
  });
  autoPlay(dispatch, getState);
};

const pauseGame = dispatch => {
  dispatch({
    type: PAUSE_GAME
  });
};

export const toggleInPlay = ()  => (dispatch, getState) => {
  if (getState().isInPlay) {
    pauseGame(dispatch);
  } else {
    playGame({
      dispatch,
      getState: getState
    });
  }
};