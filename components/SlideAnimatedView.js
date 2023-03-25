import React from "react";
import {StyleSheet} from "react-native";
import * as Animatable from 'react-native-animatable';

//** SlideAnimatedView */
const SlideAnimatedView = ({ children, value = 1 , duration = 200 }) => {

  return (
  <Animatable.View duration={duration} animation={value === 0 ? "fadeInUpBig" : "fadeOutDownBig"} style={styles.backgroundView321eb058}>
    {children}
  </Animatable.View >
  )
}

const styles = StyleSheet.create({
  backgroundView321eb058: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
  },
});


export default SlideAnimatedView;
