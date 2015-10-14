import React from 'react';
import styles from './entity-style';

export default ({toggleValue, id, value, colour, columns}) => (
  <div
    onClick={toggleValue.bind(null, {id, curValue: value, columns})}
    style={styles.comp}
    >
    <div style={styles.default}></div>
    <div style={Object.assign({},styles.alive, {
      backgroundColor: `#${colour}`,
      opacity: value
    })}></div>
  </div>
);
