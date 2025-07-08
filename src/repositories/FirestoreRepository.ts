import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { db } from "../firebase/firebaseConfig";
import { Entity, RepositoryException } from "./RepositoryException";

  export class FirestoreRepository<T> {
    constructor(private collectionName: string) {}
  
    async create(data: T): Promise<string> {
      const docRef = await addDoc(collection(db, this.collectionName), data);
      return docRef.id;
    }
  
    async find(id: string): Promise<T> {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()) {
        throw new RepositoryException("ENTITY_NOT_FOUND", this.collectionName as Entity);
      }
       return docSnap.data() as T
    }
  
    async readAll(): Promise<T[]> {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      return querySnapshot.docs.map((doc) => ({
        ...(doc.data() as T),
        id: doc.id,
      }));
    }
  
    async update(id: string, data: Partial<T>): Promise<void> {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, data);
    }
  
    async delete(id: string): Promise<void> {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    }
  }