import React from 'react';
import _ from 'lodash';
import styles from './entity-style';

export default class EntityComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    const {toggleValue, id, value, colour} = this.props;
    return (
      <div
        onClick={toggleValue.bind(null, {id, curValue: value})}
        style={styles.comp}
        >
        <div style={styles.default}></div>
        <div style={{
            height: '90%',
            width: '90%',
            position: 'absolute',
            cursor: 'pointer',
            transition: 'opacity 0.25s ease-out',
            backgroundColor: `#${colour || '2345dc'}`,
            opacity: value
        }}></div>
      </div>
    );
  }
}