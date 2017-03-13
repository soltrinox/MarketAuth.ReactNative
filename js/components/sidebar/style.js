
const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#454545',
  },
  headerLogo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: null,

  },
  listItemContainer:{
      // height: 80,
      paddingLeft: 0,
      marginLeft: 0,
  },
  listItem: {
      // height: 78,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#454545',
      paddingLeft: 0,
      marginLeft: 0
  },
  iconContainer: {
    width: 61,
    height: 61,
    marginRight: 5,
    marginLeft: 12,
    paddingTop: (Platform.OS === 'android') ? 7 : 5
  },

  text: {
    width: 100,
    fontWeight: '300',
      color : '#FFF',
    fontSize: 16,
      lineHeight: (Platform.OS === 'android') ? 17 : 20,
  },
});
