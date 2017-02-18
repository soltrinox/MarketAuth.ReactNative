import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = 400; //viewportHeight * 0.4;
const slideWidth = 350; //wp(75);

export const sliderWidth = 350;
export const itemHorizontalMargin = 0; //wp(2);
export const itemWidth =  350  ; //slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 0;

export default StyleSheet.create({
  slideInnerContainer: {
    height: slideHeight,
    backgroundColor:'#00000000'
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#00000000',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  textContainer: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#00000000',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  title: {
    color: '#00000000',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  subtitle: {
    marginTop: 6,
    color: '#888888',
    fontSize: 12,
    fontStyle: 'italic'
  }
});
