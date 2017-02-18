import {  Dimensions, Platform } from 'react-native';

const React = require('react-native');
const { StyleSheet } = React;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#000000',

  },
});
