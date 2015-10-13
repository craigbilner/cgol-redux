import { BUILD_BOARD, POPULATE_ENTITIES } from '../actions/index';


export const board = (prevState = [], action = {}) => {
  let nextState = prevState.slice(0);

  if (action.type === BUILD_BOARD) {
    const {rows, columns} = action.payload;
    const column = new Array(columns);
    column.fill(0);
    nextState.length = rows;
    nextState.fill(column);
  }

  return nextState;
};

export const entities = (prevState = {}, action = {}) => {
  let nextState = Object.assign({}, prevState);

  if (action.type === POPULATE_ENTITIES) {
    nextState = action.payload.board.reduce((entityMap, row, x) => {
      return Object.assign({}, entityMap, row.reduce((colMap, column, y)=> {
        return Object.assign({}, colMap, {
          [`${x}|${y}`]: {
            value: 0
          }
        });
      }, Object.assign({}, entityMap)));
    }, {});
  }

  return nextState;
};

