import { BUILD_BOARD, POPULATE_ENTITIES, TOGGLE_VALUE, NEXT_TICK } from '../actions/index';


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

export const applyRules = ({id, entities}) => {
  const curValue = entities[id].value;
  const neighbours = entities[id].neighbours.map(eId => entities[eId].value);
  const liveNeighbours = neighbours.reduce((total, value) => total + value, 0);
  let value = null;

  // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  if (curValue === 1 && liveNeighbours < 2) {
    value = 0;
  }

  // Any live cell with two or three live neighbours lives on to the next generation.
  if (curValue === 1 && (liveNeighbours == 2 || liveNeighbours === 3)) {
    value = 1;
  }

  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  if (curValue === 0 && liveNeighbours === 3) {
    value = 1;
  }

  // Any live cell with more than three live neighbours dies, as if by over-population.
  if (curValue === 1 && liveNeighbours > 3) {
    value = 0;
  }

  return value === null ? 0 : value;
};

export const entities = (prevState = {}, action = {}) => {
  let nextState = Object.assign({}, prevState);

  if (action.type === POPULATE_ENTITIES) {
    const {board, getNeighbours, rows, columns} = action.payload;
    Object.assign(nextState, board.reduce((entityMap, row, x) => {
      return Object.assign({}, entityMap, row.reduce((colMap, column, y)=> {
        return Object.assign({}, colMap, {
          [`${x}|${y}`]: {
            value: 0,
            neighbours: getNeighbours({x, y, rows, columns})
          }
        });
      }, entityMap));
    }, {}));
  }

  if (action.type === TOGGLE_VALUE) {
    const {id, curValue, colours} = action.payload;

    Object.assign(nextState, {
      [id]: {
        value: (!curValue) >> 0,
        neighbours: prevState[id].neighbours,
        colour: colours[id.split('|')[0]]
      }
    });
  }

  if (action.type === NEXT_TICK) {
    const {board, applyRules, colours} = action.payload;
    Object.assign(nextState, board.reduce((entityMap, row, x) => {
      return Object.assign({}, entityMap, row.reduce((colMap, column, y)=> {
        const id = `${x}|${y}`;
        return Object.assign({}, colMap, {
          [id]: {
            value: applyRules({id, entities: prevState}),
            neighbours: prevState[id].neighbours,
            colour: colours[Math.min(x + y, board.length)]
          }
        });
      }, entityMap));
    }, {}));
  }

  return nextState;
};

