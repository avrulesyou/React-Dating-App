import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const setNotificationBadgeCount = async (badgeCount = 0) => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return alert(
        failMessage ?? 'Failed to get permission for notifications!'
      );
    }
  } else {
    alert(deviceMessage ?? 'Must use physical device for Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const updatededBadgeCount = await Notifications.setBadgeCountAsync(
    badgeCount
  );

  return updatededBadgeCount;
};

export default setNotificationBadgeCount;
