import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth} from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSSVhBuiFGK60QgR1wVRZtubzTNgq_8ZY",
  authDomain: "projeto-dsi-df033.firebaseapp.com",
  projectId: "projeto-dsi-df033",
  storageBucket: "projeto-dsi-df033.firebasestorage.app",
  messagingSenderId: "317461053981",
  appId: "1:317461053981:web:6eab3035ab1f54a3cf4"
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
