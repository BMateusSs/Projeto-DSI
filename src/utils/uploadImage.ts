import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseConfig';

export const pickAndUploadImage = async (): Promise<string | null> => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert('Você precisa permitir o acesso à galeria de imagens.');
    return null;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (pickerResult.canceled || !pickerResult.assets?.[0]?.uri) {
    return null;
  }

  const uri = pickerResult.assets[0].uri;
  const response = await fetch(uri);
  const blob = await response.blob();

  const uid = auth.currentUser?.uid;
  if (!uid) return null;

  const imageRef = ref(storage, `profile_pictures/${uid}.jpg`);
  await uploadBytes(imageRef, blob);

  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
};