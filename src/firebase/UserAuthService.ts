import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, collection, getDocs, query, where, Timestamp } from "firebase/firestore";
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

  async updateBusinessInfo(uid: string, businessData: any){
    await setDoc(
      doc(db, "users", uid),
      { businessInfo: businessData},
      { merge: true }
    );
  }

  async updateProducerInfo(uid: string, producerData: any){
    await setDoc(
      doc(db, "users", uid),
      { producerInfo: producerData },
      { merge: true }
    );
  }

  async checkIfCnpjExists(cnpj: string): Promise<boolean> {
    const usersRef = collection(db, "users");
    const businessQuery = query(usersRef, where("businessInfo.cnpj", "==", cnpj));
    const producerQuery = query(usersRef, where("producerInfo.cnpj", "==", cnpj));
    const businessSnapshot = await getDocs(businessQuery);
    const producerSnapshot = await getDocs(producerQuery);
    return !businessSnapshot.empty || !producerSnapshot.empty;
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
  }
