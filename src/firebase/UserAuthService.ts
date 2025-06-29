import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, collection, getDocs, query, where, Timestamp, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { AppUser } from "./AppUser";

export class UserAuthService {
  async signUp(email: string, password: string, name: string): Promise<AppUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await this.createUserDocument(user.uid, email, name);
    await updateProfile(user, { displayName: name });
    const appUser = await AppUser.create(user, {});
    return appUser;
  }
  async signIn(email: string, password: string): Promise<AppUser> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const appUser = await AppUser.create(user);
    return appUser;
  }
  private async createUserDocument(uid: string, email: string, name: string) {
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      name,
      createdAt: new Date(),
    });
  }
  async updateUserProfile(uid: string, profile: string) {
    await setDoc(
      doc(db, "users", uid),
      { profile },
      { merge: true }
    );
  }
  async updateUserPreferences(uid: string, preferencesData: any) {
    await setDoc(
      doc(db, "users", uid),
      { preferences: preferencesData },
      { merge: true }
    );
  }
  async checkIfEmailExists(email: string): Promise<boolean> {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
    }
  async generateRecoveryCode(uid: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeRef = doc(db, "recovery_codes", uid);
    const expirationTime = Timestamp.fromMillis(Date.now() + 15 * 60 * 1000);
    await setDoc(codeRef,  { code: code, expirationTime: expirationTime,
    });
    return code;
  }
  async getUserByEmail(email: string) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      return null;
    }
  }
  async getUserPreferences(uid: string) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().preferences || null;
    }
    return null;
  }
}
