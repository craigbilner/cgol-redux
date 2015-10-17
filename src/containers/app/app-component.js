import React from 'react';
import Radium from 'radium';
import styles from './app-style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleValue, toggleInPlay, toggleGameSpeed } from  '../../action-creators/index';
import Board from '../../components/board/board-component';
import Controls from '../../components/controls/controls-component';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      board,
      entities,
      toggleValue,
      toggleInPlay,
      isInPlay,
      gameSpeed,
      toggleGameSpeed
      } = this.props;

    return (
      <div style={styles.comp}>
        <div style={styles.leftGutter}></div>
        <div style={styles.gol}>
          <Controls
            toggleInPlay={toggleInPlay}
            isInPlay={isInPlay}
            gameSpeed={gameSpeed}
            toggleGameSpeed={toggleGameSpeed}
            />
          <Board
            board={board}
            entities={entities}
            toggleValue={toggleValue}
            />
        </div>
        <div style={styles.rightGutter}></div>
      </div>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

const mapStateToProps = ({ board, entities, isInPlay, gameSpeed }) => ({
  board,
  entities,
  isInPlay,
  gameSpeed
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleValue,
  toggleInPlay,
  toggleGameSpeed
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Radium(App))