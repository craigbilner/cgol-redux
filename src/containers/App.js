import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleValue } from  '../action-creators/index';
import Entity from '../components/entity';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return {
      display: 'flex',
      flexFlow: 'column'
    };
  }

  getRowStyle() {
    return {
      display: 'flex',
      flexFlow: 'row',
      flex: 1
    };
  }

  getColumnStyle() {
    return {
      flex: 1
    };
  }

  render() {
    const { board, entities, toggleValue } = this.props;

    return (
      <div style={this.getCompStyle()}>
        {
          board.map((row, x) => {
            return (
              <div style={this.getRowStyle()}>
                {
                  row.map((column, y) => {
                    const id = `${x}|${y}`;
                    return (
                      <div style={this.getColumnStyle()}>
                        <Entity
                          id={id}
                          neighbours={entities[id].neighbours}
                          value={entities[id].value}
                          toggleValue={toggleValue}
                          />
                      </div>
                    );
                  })
                }
              </div>
            );
          })
        }
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

const mapDispatchToProps = dispatch => bindActionCreators({toggleValue}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)