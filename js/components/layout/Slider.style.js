import { StyleSheet } from 'react-native';
import { itemHorizontalMargin, itemWidth } from './SliderEntry.style';

export default StyleSheet.create({
  slider: {
    marginBottom: 0
  },
  sliderContainer: {
    padding: 0
  },
  slide: {
    borderRadius: 0,

    flexDirection: 'column',
    width: itemWidth,
    paddingHorizontal: 0
  }
});
