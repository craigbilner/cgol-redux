import React from 'react';
import styles from './app-style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleValue, nextTick } from  '../action-creators/index';
import Board from '../components/board';
import Controls from '../components/controls';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { board, entities, toggleValue, nextTick } = this.props;

    return (
      <div style={styles.comp}>
        <div style={styles.leftGutter}></div>
        <div style={styles.gol}>
          <Controls
            nextTick={nextTick.bind(null, {
              columns: board[0].length
            })}
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

const mapStateToProps = state => ({
  board: state.board,
  entities: state.entities
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleValue,
  nextTick
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)