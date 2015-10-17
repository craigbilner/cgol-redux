import React from 'react';
import Radium from 'radium';
import _ from 'lodash';
import styles from './controls-style';

class ControlsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {toggleInPlay, isInPlay, gameSpeed, toggleGameSpeed} = this.props;
    return (
      <div style={styles.comp}>
        <div style={styles.leftGutter}></div>
        <div
          onClick={toggleInPlay}
          style={
        _.assign({}, styles.gameButton, {
          backgroundColor: isInPlay ? '#DE7979' : '#5AB15A'
        })
      }>
          {
            isInPlay ? 'pause' : 'play'
          }
        </div>
        <div style={styles.rightGutter}>
          <div style={
          _.assign({}, styles.speedButton, {
            border: `1px solid ${gameSpeed === 1 ? '#4E1212' : '#BFBFBF'}`,
            color: gameSpeed === 1 ? '#4E1212' : '#BFBFBF'
          })
        }
               onClick={toggleGameSpeed.bind(null, 1)}
            >
            1x
          </div>
          <div style={
          _.assign({}, styles.speedButton, {
            border: `1px solid ${gameSpeed === 5 ? '#4E1212' : '#BFBFBF'}`,
            color: gameSpeed === 5 ? '#4E1212' : '#BFBFBF'
          })
        }
               onClick={toggleGameSpeed.bind(null, 5)}
            >
            5x
          </div>
          <div style={
          _.assign({}, styles.speedButton, {
            border: `1px solid ${gameSpeed === 10 ? '#4E1212' : '#BFBFBF'}`,
            color: gameSpeed === 10 ? '#4E1212' : '#BFBFBF'
          })
        }
               onClick={toggleGameSpeed.bind(null, 10)}
            >
            10x
          </div>
        </div>
      </div>
    );
  }
}

ControlsComponent.propTypes = {};

ControlsComponent.defaultProps = {};

export default Radium(ControlsComponent);