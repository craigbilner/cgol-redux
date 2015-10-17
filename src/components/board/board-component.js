import React from 'react';
import Entity from '../entity/entity-component';
import styles from './board-style';

export default ({board, entities, toggleValue}) => (
  <div style={styles.comp}>
    {
      board.map((row, x) => {
        return (
          <div key={x} style={styles.row}>
            {
              row.map((column, y) => {
                const id = `${x}|${y}`;
                return (
                  <div key={id} style={styles.column}>
                    <Entity
                      id={id}
                      value={entities.details[id].value}
                      toggleValue={toggleValue}
                      colour={entities.details[id].colour}
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
