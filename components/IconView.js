import React from "react";
import {StyleSheet } from "react-native";
import theme from '../themes/DraftbitTheme.js';
import * as Utils from '../utils'
import {
  Circle,
  Icon,
  LinearGradient,
} from '@draftbit/ui';

//** IconView */
const IconView = ({ selectedIconType }) => {

  return (
    <>
      {selectedIconType === Utils.ICON_TYPE.DISLIKE ? <Circle
        bgColor={theme.colors.poppinsLightBlack}
        size={64}
      >
        <Icon
          name={'Feather/x'}
          color={theme.colors.xIconColor}
          size={44}
        />
      </Circle> : selectedIconType === Utils.ICON_TYPE.LIKE ?
        <LinearGradient
          style={[
            styles.LinearGradientcf6b392c,
            { borderRadius: 64 },
          ]}
          endY={100}
          color2={theme.colors.color2Stop}
          color1={theme.colors.color1Stop}
          endX={0}
        >
          <Icon
            color={theme.colors.communialWhite}
            name={'EvilIcons/heart'}
            size={84}
          />
        </LinearGradient>
        : null}
    </>
  )
}
const styles = StyleSheet.create({
  LinearGradientcf6b392c: {
    alignItems: 'center',
    height: 90,
    justifyContent: 'center',
    width: 90,
  },
});

export default IconView;
