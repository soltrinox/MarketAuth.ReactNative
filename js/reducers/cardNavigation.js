
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
    selectedNavCategory: 'Carpet Dealer',
    selectedNavDomain : 'www.angieslist.com',
    selectedNavCity: 'PHOENIX, AZ',
    dexNavPrem: [],
    dexNavPlux: [],
    dexNavBasc: [],
    rawLocaleNavData : [],

    masterCatKeyArray: [],
    masterSumDomCoverage: [],
    masterSumProdCoverage: [],
    masterDomainScoreObjects: {},
    masterNavCatArray: [],

};

module.exports = cardStackReducer(initialState);
