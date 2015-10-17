import _ from 'lodash';
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
    // no left
    xs = xs.concat(columns - 1, x, x + 1);
  } else if (x === (columns - 1)) {
    //no right
    xs = xs.concat(x - 1, x, 0);
  } else {
    xs = xs.concat(x - 1, x, x + 1);
  }

  if (y === 0) {
    // no top
    ys = ys.concat(rows - 1, y, y + 1);
  } else if (y === (rows - 1)) {
    //no bottom
    ys = ys.concat(y - 1, y, 0);
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
  let nextState = _.assign({}, prevState);

  if (action.type === POPULATE_ENTITIES) {
    const {board, getNeighbours, rows, columns} = action.payload;
    _.assign(nextState, {
      details: board.reduce((entityMap, row, y) => {
        return _.assign({}, entityMap, row.reduce((colMap, column, x)=> {
          return _.assign({}, colMap, {
            [`${x}|${y}`]: {
              value: 0,
              neighbours: getNeighbours({x, y, rows, columns})
            }
          });
        }, entityMap));
      }, {}),
      aliveCount: 0
    });
  }

  if (action.type === TOGGLE_VALUE) {
    const {id, curValue, colour} = action.payload;

    nextState.details[id] = {
      value: (!curValue) >> 0,
      neighbours: prevState.details[id].neighbours,
      colour
    };
    nextState.aliveCount = nextState.aliveCount + 1;
  }

  if (action.type === NEXT_TICK) {
    const {board, applyRules, colours} = action.payload;
    let aliveCount = 0;
    _.assign(nextState, {
      details: board.reduce((entityMap, row, y) => {
        return _.assign({}, entityMap, row.reduce((colMap, column, x)=> {
          const id = `${x}|${y}`;
          const value = applyRules({id, entities: prevState.details});
          aliveCount = aliveCount + value;
          colMap[id] = {
            value,
            neighbours: prevState.details[id].neighbours,
            colour: colours[Math.min(x + y, board.length - 1)]
          };

          return colMap;
        }, entityMap));
      }, {}),
      aliveCount: aliveCount
    });
  }

  return nextState;
};

