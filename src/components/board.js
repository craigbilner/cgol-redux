import React from 'react';
import Entity from '../components/entity';
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
