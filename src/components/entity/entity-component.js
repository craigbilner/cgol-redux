import React from 'react';
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
        <div style={
        Object.assign({},styles.alive, {
            backgroundColor: `#${colour || '2345dc'}`,
            opacity: value
        })}></div>
      </div>
    );
  }
}