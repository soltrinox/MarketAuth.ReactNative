
const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#000000',
    width: 230,
  },
  drawerCover: {
    alignSelf: 'center',
    // resizeMode: 'cover',
    height: 105,
    width: null,
    position: 'relative',
    marginBottom: 2,
    paddingTop: 20,
    paddingLeft: 20,
      backgroundColor: '#444444',
  },
  drawerImage: {
    // position: 'absolute',
    // left: (Platform.OS === 'android') ? 30 : 40,
    // left: (Platform.OS === 'android') ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    // top: (Platform.OS === 'android') ? deviceHeight / 13 : deviceHeight / 12,
    // width: 174,
    height: 0,
    resizeMode: 'cover',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#444444'
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 18,
    marginRight: 8,
    // paddingLeft: 11,
    paddingTop: (Platform.OS === 'android') ? 7 : 5,
  },
  sidebarIcon: {
    fontSize: 60,
    color: '#fff',
    lineHeight: (Platform.OS === 'android') ? 61 : 65,
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '500',
      color : '#FFF',
    fontSize: 16,
  },
  bottomLogo: {
    flex: 1,
    backgroundColor: '#444444',
    alignSelf: 'center',

  },
});
