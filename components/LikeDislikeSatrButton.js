import React from "react";
import { StyleSheet,View } from "react-native";
import theme from '../themes/DraftbitTheme.js';
import * as Utils from '../utils'
import AnimatedButton from './AnimatedButton'
import {
  Circle,
  Icon,
  LinearGradient,
} from '@draftbit/ui';

//** LikeDislikeSatrButton */
const LikeDislikeSatrButton = ({ selectedIconType }) => {

  return (
    <>
      {(selectedIconType === '' || selectedIconType === Utils.ICON_TYPE.DISLIKE) ?
        <AnimatedButton
          style={[
            styles.Surfaceee4c7470,
            {
              borderRadius: 64,
              backgroundColor:
                theme.colors.onboardingSubtitleLettering,
            },
          ]}
          elevation={3}
        >
          <Circle
            bgColor={theme.colors.poppinsLightBlack}
            size={64}
          >
            <Icon
              name={'Feather/x'}
              color={theme.colors.xIconColor}
              size={34}
            />
          </Circle>
        </AnimatedButton>
        : <View
          style={[styles.Surfaceee4c7470, { backgroundColor: 'transparent' }]}
        />
      }
      {(selectedIconType === '' || selectedIconType === Utils.ICON_TYPE.LIKE) ?
        <AnimatedButton
          style={[styles.Surfacec97fd320, { borderRadius: 64 }]}
          elevation={3}
        >
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
              size={74}
            />
          </LinearGradient>
        </AnimatedButton>
        : <View
          style={[styles.Surfacec97fd320, { backgroundColor: 'transparent' }]}
        />}
      {(selectedIconType === '' || selectedIconType === Utils.ICON_TYPE.STAR) ?
        <AnimatedButton
          style={[
            styles.Surface1c6185ff,
            {
              borderRadius: 64,
              backgroundColor:
                theme.colors.onboardingSubtitleLettering,
            },
          ]}
          elevation={3}
        >
          <Circle
            bgColor={theme.colors.poppinsLightBlack}
            size={64}
          >
            <Icon
              style={styles.Icon7a33adf1}
              color={theme.colors.xIconColor}
              name={'Feather/star'}
              size={34}
            />
          </Circle>
        </AnimatedButton>
        : <View
          style={[styles.Surface1c6185ff, { backgroundColor: 'transparent' }]}
        />}
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
  Surfaceee4c7470: {
    height: 64,
    marginRight: 8,
    width: 64,
  },
  Surfacec97fd320: {
    height: 90,
    width: 90,
  },
  Surface1c6185ff: {
    height: 64,
    marginLeft: 8,
    width: 64,
  },
  Icon7a33adf1: {
    opacity: 1,
  },
});

export default LikeDislikeSatrButton;
