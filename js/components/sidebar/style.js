
const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#000000',
  },
  drawerCover: {
    alignSelf: 'stretch',
    // resizeMode: 'cover',
    height: 100,
    width: null,
    position: 'relative',
    marginBottom: 10,
      backgroundColor: '#454545',
  },
  drawerImage: {
    position: 'absolute',
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: (Platform.OS === 'android') ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: (Platform.OS === 'android') ? deviceHeight / 13 : deviceHeight / 12,
    width: 190,
    height: 0,
    resizeMode: 'cover',
  },
    listItemContainer2: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#454545',
        marginBottom:6,
        paddingLeft:4
    },
  listItemContainer: {
      height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
      backgroundColor: '#000',
      marginBottom:6
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 3,
    paddingLeft: 0,
    paddingTop: (Platform.OS === 'android') ? 7 : 5,
  },
  sidebarIcon: {
    fontSize: 22,
    color: '#fff',
    lineHeight: (Platform.OS === 'android') ? 22 : 25,
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '500',
      color : '#FFF',
    fontSize: 22,
      lineHeight: (Platform.OS === 'android') ? 22 : 25,
  },
});
