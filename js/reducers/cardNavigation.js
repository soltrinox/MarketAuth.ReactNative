
import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const initialState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: 'home',
      index: 0,

    },
  ],
    selectedNavCategory: 'Accountant',
    selectedNavDomain : 'www.domain.com',
    dexNavPrem: [],
    dexNavPlux: [],
    dexNavBasc: [],
};

module.exports = cardStackReducer(initialState);
