import React from "react";
import { Animated, StyleSheet } from "react-native";
import theme from '../themes/DraftbitTheme.js';
import * as Animatable from 'react-native-animatable';


//** SlideIconAnimatedView */
const SlideIconAnimatedView = ({ children, animationEnd, duration = 200 }) => {

  const animation = new Animated.Value(0.3);
  const inputRange = [0, 1];
  const outputRange = [0, 1.5];
  const scale = animation.interpolate({ inputRange, outputRange });

  /** When Animatable.View animation will be finished then animation will be Start */
  const animationStart = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      animationClose()
    })
  };

  /** When animationStart() will be finished then animationClose() will call */
  const animationClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      animationEnd()
    })
  };

  return (
    <Animatable.View duration={duration} animation={"fadeInUpBig"} style={[styles.backgroundView341eb058, {}]}
      onAnimationEnd={() => {
        animationStart()
      }}
    >
      <Animatable.View
        style={[styles.iconView323eb058, { transform: [{ scale }] }]}>
        {children}
      </Animatable.View >
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  backgroundView341eb058: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: "#FFFFFF",
  },
  iconView323eb058: {
    marginTop: 160,
    // backgroundColor: "red",
    borderRadius: 24,
    backgroundColor: theme.colors.poppinsLightBlack,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: 'center',
    // position:'absolute',
  }
});


export default SlideIconAnimatedView;
