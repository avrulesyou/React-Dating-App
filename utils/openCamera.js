import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getMimeTypeFromFilename } from '@shopify/mime-types';

async function openCamera({
  mediaTypes = ImagePicker.MediaTypeOptions.Images,
  allowsEditing = false,
  quality = 1,
}) {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  }

  let result = await ImagePicker.launchCameraAsync({
    mediaTypes,
    allowsEditing,
    quality,
    base64: true,
  });

  if (!result.cancelled) {
    if (Platform.OS === 'web') return result.uri;

    const mimeType = getMimeTypeFromFilename(result.uri);

    if (result.type === 'video') {
      const base64Video = await FileSystem.readAsStringAsync(result.uri, {
        encoding: 'base64',
      });

      return 'data:' + mimeType + ';base64,' + base64Video;
    }

    return 'data:' + mimeType + ';base64,' + result.base64;
  }
}

export default openCamera;
