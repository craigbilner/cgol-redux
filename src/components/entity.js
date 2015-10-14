import React from 'react';

export default ({toggleValue, id, value}) => (
  <div onClick={toggleValue.bind(null, {id, curValue: value})}>
    <div>{value}</div>
  </div>
);
