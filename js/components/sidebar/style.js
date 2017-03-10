
const React = require('react-native');

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#454545',
  },
  drawerCover: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 107,
    width: null,
    marginBottom: 2,
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
        marginTop:1,
        borderWidth:2,
        borderColor: '#330000'
    },

  iconContainer: {
    width: 61,
    height: 61,
    marginRight: 5,
    marginLeft: 12,
    paddingTop: (Platform.OS === 'android') ? 7 : 5
  },

  text: {
    width: 120,
    fontWeight: '500',
      color : '#FFF',
    fontSize: 16,
      lineHeight: (Platform.OS === 'android') ? 17 : 20,
  },
});
