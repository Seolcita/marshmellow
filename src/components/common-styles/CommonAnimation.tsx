import { Dimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
export const IMAGE_HEIGHT = 250;
export const scrollRef = useAnimatedRef<Animated.ScrollView>();
export const scrollOffset = useScrollViewOffset(scrollRef);
export const imageAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
          [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
          [2, 1, 1]
        ),
      },
    ],
  };
});

export const headerAnimatedStyle = useAnimatedStyle(() => {
  return {
    opacity: interpolate(scrollOffset.value, [0, IMAGE_HEIGHT / 1.5], [0, 1]),
  };
});

const inputBoxTranslateY = useAnimatedStyle(() => {
  return {
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [0, IMAGE_HEIGHT],
          [0, 110]
        ),
      },
    ],
  };
});
