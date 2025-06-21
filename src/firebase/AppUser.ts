import { User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export class AppUser {
  uid: string;
  email: string;
  name: string;
  preferences: any;
  constructor(user: FirebaseUser, preferences: any = {}) {
    this.uid = user.uid;
    this.email = user.email || '';
    this.name = user.displayName || '';
    this.preferences = preferences;
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

  static async create(user: FirebaseUser, preferences: any = {}) {
    const appUser = new AppUser(user, preferences);
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      createdAt: new Date(),
      preferences,
    });
    return appUser;
  }
}