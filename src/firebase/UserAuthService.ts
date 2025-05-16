import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

export class UserAuthService {
  async signUp(email: string, password: string, name: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await this.createUserDocument(user.uid, email, name);
    await updateProfile(user, { displayName: name });

    return user;
  }

  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  private async createUserDocument(uid: string, email: string, name: string) {
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      name,
      createdAt: new Date(),
    });
  }
}