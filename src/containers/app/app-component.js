import React from 'react';
import styles from './app-style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleValue, toggleInPlay } from  '../../action-creators/index';
import Board from '../../components/board/board-component';
import Controls from '../../components/controls/controls-component';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { board, entities, toggleValue, toggleInPlay, isInPlay } = this.props;

    return (
      <div style={styles.comp}>
        <div style={styles.leftGutter}></div>
        <div style={styles.gol}>
          <Controls
            toggleInPlay={toggleInPlay}
            isInPlay={isInPlay}
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

const mapStateToProps = ({ board, entities, isInPlay }) => ({
  board,
  entities,
  isInPlay
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleValue,
  toggleInPlay
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)