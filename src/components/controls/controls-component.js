import React from 'react';
import styles from './controls-style';

export default ({toggleInPlay, isInPlay}) => (
  <div style={styles.comp}>
    <div style={styles.leftGutter}></div>
    <div
      onClick={toggleInPlay}
      style={
        Object.assign({},styles.button,{
          backgroundColor: isInPlay ? '#DE7979' : '#5AB15A'
        })
      }>
      {
        isInPlay ? 'pause' : 'play'
      }
    </div>
    <div style={styles.rightGutter}></div>
  </div>
);
