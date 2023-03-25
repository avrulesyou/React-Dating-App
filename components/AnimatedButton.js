import React from "react";
import { Animated,  StyleSheet } from "react-native";
import { withAnimated } from './MakeAnimatedComponent';
import { Touchable, Surface } from '@draftbit/ui';

const AnimatedButton = ({ children, onPress, style, props, }) => {

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.9];
  const scale = animation.interpolate({ inputRange, outputRange });
  const AnimatedSurface = withAnimated(Surface);

  /** When Touchable Press animation will be Start  */
  const animationStart = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      if (onPress) {
        onPress()
      }
      animationClose()
    })
  };

    /** When animationStart() will be finished then animationClose() will call */
  const animationClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  };

  return (
    <AnimatedSurface  {...props} style={[styles.button, style, { transform: [{ scale }] }]}>
      <Touchable onPress={animationStart}>
        {children}
      </Touchable>
    </AnimatedSurface>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 64,
    width: 64,
  }
});

export default AnimatedButton;
