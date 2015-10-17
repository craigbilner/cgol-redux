import React from 'react';

export default ({toggleInPlay, isInPlay}) => (
  <div>
    <div onClick={toggleInPlay}>
      {
        isInPlay ? 'pause' : 'play'
      }
    </div>
  </div>
);
