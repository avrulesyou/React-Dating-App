import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal} from "react-native";
import theme from '../themes/DraftbitTheme.js';

//** LoaderView */
 const LoaderView = ({loading }) => {

  if (loading) {
    return (
      <Modal  
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => { }}>
        <View style={styles.modalBackgroundView341eb058}>
          <View style={styles.activityIndicatorWrapper341e2358}>
      <ActivityIndicator size="large" color={theme.colors.color1Stop} />
      </View>
        </View>
     </Modal>
    )
  }
  return null;
}

const styles = StyleSheet.create({
  modalBackgroundView341eb058: {
    top:0,
    bottom:0,
    left:0, 
    right:0,
    position:'absolute',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  },
  activityIndicatorWrapper341e2358: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});


export default LoaderView;
