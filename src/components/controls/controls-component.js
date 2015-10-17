import React from 'react';
import styles from './controls-style';

export default ({toggleInPlay, isInPlay, gameSpeed}) => (
  <div style={styles.comp}>
    <div style={styles.leftGutter}></div>
    <div
      onClick={toggleInPlay}
      style={
        Object.assign({}, styles.gameButton, {
          backgroundColor: isInPlay ? '#DE7979' : '#5AB15A'
        })
      }>
      {
        isInPlay ? 'pause' : 'play'
      }
    </div>
    <div style={styles.rightGutter}>
      <div style={
        Object.assign({}, styles.speedButton, {
          border: `1px solid ${gameSpeed === 1 ? '#4E1212' : '#BFBFBF'}`,
          color: gameSpeed === 1 ? '#4E1212' : '#BFBFBF'
        })
      }>
        1x
      </div>
      <div style={
        Object.assign({}, styles.speedButton, {
          border: `1px solid ${gameSpeed === 5 ? '#4E1212' : '#BFBFBF'}`,
          color: gameSpeed === 1 ? '#4E1212' : '#BFBFBF'
        })
      }>
        5x
      </div>
      <div style={
        Object.assign({}, styles.speedButton, {
          border: `1px solid ${gameSpeed === 10 ? '#4E1212' : '#BFBFBF'}`,
          color: gameSpeed === 1 ? '#4E1212' : '#BFBFBF'
        })
      }>
        10x
      </div>
    </div>
  </div>
);
