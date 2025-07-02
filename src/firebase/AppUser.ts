import { User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export class AppUser {
  uid: string;
  email: string;
  name: string;
  preferences: any;
  profilePicture: string | null;
  constructor(
    uid: string,
    email: string,
    name: string,
    preferences: any = {},
    profilePicture: string | null = null
  ) {
    this.uid = uid;
    this.email = email;
    this.name = name;
    this.preferences = preferences;
    this.profilePicture = profilePicture;
  }

  async savePreferences() {
    const userRef = doc(db, 'users', this.uid);
    await setDoc(
      userRef,
      {
        preferences: this.preferences,
      },
      { merge: true }
    );
  }

  async updateName(newName: string) {
    const userRef = doc(db, 'users', this.uid);
    await updateDoc(userRef, {
      name: newName,
    });
    this.name = newName;
  }

  async updateProfilePicture(url: string) {
    const userRef = doc(db, 'users', this.uid);
    await updateDoc(userRef, {
      profilePicture: url,
    });
    this.profilePicture = url;
  }

  static async loadPreferences(uid: string) {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.preferences || {};
    } else {
      return {};
    }
  }

  static async create(user: FirebaseUser) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      return new AppUser(
        user.uid,
        data.email || user.email || '',
        data.name || user.displayName || '',
        data.preferences || {},
        data.profilePicture || null
      );
    } else {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || '',
        createdAt: new Date(),
        preferences: {},
        profilePicture: null,
      });
      return new AppUser(user.uid, user.email || '', user.displayName || '', {}, null);
    }
  }
}