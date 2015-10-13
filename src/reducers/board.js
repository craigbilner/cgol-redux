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

export const getNeighbours = ({x, y, rows, columns}) => {
  let xs = [];
  let ys = [];

  if (x === 0) {
    // no top
    xs = xs.concat(x, x + 1);
  } else if (x === (rows - 1)) {
    //no bottom
    xs = xs.concat(x - 1, x);
  } else {
    xs = xs.concat(x - 1, x, x + 1);
  }

  if (y === 0) {
    // no left
    ys = ys.concat(y, y + 1);
  } else if (y === (columns - 1)) {
    //no right
    ys = ys.concat(y - 1, y);
  } else {
    ys = ys.concat(y - 1, y, y + 1);
  }

  return xs.reduce((xMap, nx) => {
    const xMapCopy = xMap.slice(0);
    return ys.reduce((yMap, ny)=> {
      const yMapCopy = yMap.slice(0);

      if (!(x === nx && y === ny)) {
        yMapCopy.push(`${nx}|${ny}`);
      }

      return yMapCopy;
    }, xMapCopy);
  }, []);
};

export const entities = (prevState = {}, action = {}) => {
  let nextState = Object.assign({}, prevState);

  if (action.type === POPULATE_ENTITIES) {
    const {board, getNeighbours, rows, columns} = action.payload;
    nextState = board.reduce((entityMap, row, x) => {
      return Object.assign({}, entityMap, row.reduce((colMap, column, y)=> {
        return Object.assign({}, colMap, {
          [`${x}|${y}`]: {
            value: 0,
            neighbours: getNeighbours({x, y, rows, columns})
          }
        });
      }, Object.assign({}, entityMap)));
    }, {});
  }

  return nextState;
};

