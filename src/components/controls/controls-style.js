export default {
  comp: {
    display: 'flex',
    flexFlow: 'row',
    height: 50,
    alignItems: 'center'
  },
  gameButton: {
    flex: 2,
    '@media (min-width: 768px)': {
      flex: 3
    },
    textAlign: 'center',
    fontFamily: 'Tahoma',
    height: 25,
    color: 'white',
    padding: '5px 0',
    cursor: 'pointer'
  },
  leftGutter: {
    '@media (min-width: 768px)': {
      flex: 1
    },
    height: 25
  },
  rightGutter: {
    display: 'flex',
    flexFlow: 'row',
    flex: 1
  },
  speedButton: {
    fontFamily: 'Tahoma',
    boxSizing: 'border-box',
    height: 35,
    flex: 1,
    margin: '5px',
    textAlign: 'center',
    cursor: 'pointer',
    paddingTop: 8,
    fontSize: '0.7rem',
    '@media (min-width: 768px)': {
      paddingTop: 5,
      fontSize: '1rem'
    }
  }
};
