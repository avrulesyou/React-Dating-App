// Place any imports required by your custom components at the top of
// this file. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section. The first import from
// 'react' is required.
import React from 'react';
import { Image, View, FlatList, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { Fetch } from 'react-request';
import * as Contacts from 'expo-contacts';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Shadow } from 'react-native-shadow-2';

// Define and export your components as named exports here.
// You can reference them within a Custom Code block
// as <CustomCode.MyTextComponent />
export {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
export { Contacts };

// define a custom component
export const RNModal = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { flex: 1, backgroundColor: '#ffb703', padding: 24 };

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
          {/* ADD THIS CLOSE BUTTON */}
          <TouchableOpacity
            onPress={hideModal}
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
            }}
          >
            <AntDesign name="closecircleo" size={30} color="black" />
          </TouchableOpacity>
          {/* CLOSE BUTTON ENDS */}
          <Text style={{ fontSize: 24, color: 'black' }}>
            Example Modal. Click the close button to dismiss.
          </Text>
        </Modal>
      </Portal>
      <Button
        style={{ marginTop: 30 }}
        labelStyle={{ fontSize: 24, color: '#5A45FF' }}
        onPress={showModal}
      >
        Show Modal
      </Button>
    </Provider>
  );
};

export const ShadowComponent = ({ children }) => {
  return (
    <Shadow distance={10} radius={20} offset={[0, 10]} startColor={'#0001'}>
      {children}
    </Shadow>
  );
};
