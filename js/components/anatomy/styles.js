import {  Dimensions, Platform } from 'react-native';

const React = require('react-native');
const { StyleSheet } = React;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',

  },
  stretch: {
      flex: 1,
      flexDirection: 'column',
      justifyContent:'flex-start',
      width: null,
      height: null,

  },
  content: {
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderColor: '#000'
  },
  contentText: {
      fontSize: 18
  },
  menuTrigger: {
      flexDirection: 'row',
      paddingHorizontal: 10
  },
  menuTriggerText: {
      color: 'lightgrey',
      fontWeight: '600',
      fontSize: 20
  },
  disabled: {
      color: '#ccc'
  },
  divider: {
      marginVertical: 5,
      marginHorizontal: 2,
      borderBottomWidth: 1,
      borderColor: '#00000000'
  },
  dropdown: {
      width: 200,
      borderColor: '#999',
      borderWidth: 1,
      padding: 5
  },
  dropdownOptions: {
      marginTop: 30,
      borderColor: '#ccc',
      borderWidth: 2,
      width: 200,
      height: 200
  },
  filterLabel: {
    color: '#fff'
  }

});
