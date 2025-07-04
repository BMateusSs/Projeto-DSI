import { db } from "../firebase/firebaseConfig";
import {
    collection,
    doc,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    Timestamp,
} from 'firebase/firestore'
import { StoreClass } from "./storeClass";

const STORES_COLLECTION = 'stores';
class StoreService {
  async addStore(store: StoreClass): Promise<void> {
    store.validate();
    await addDoc(collection(db, STORES_COLLECTION), {
      ...store,
      createdAt: Timestamp.fromDate(store.createdAt),
      coordinates: store.coordinates ?? null,
    });
  }

  async getStoresByUser(userId: string): Promise<StoreClass[]> {
    const storeQuery = query(collection(db, STORES_COLLECTION), where('createdBy', '==', userId));
    const snapshot = await getDocs(storeQuery);
    return snapshot.docs.map(doc => new StoreClass(
      doc.data().name,
      doc.data().type,
      doc.data().address,
      doc.data().contact,
      doc.data().notes,
      doc.data().createdBy,
      doc.data().userId,
      doc.id
    ));
  }

  async updateStore(store: StoreClass): Promise<void> {
    store.validate();
    const storeRef = doc(db, STORES_COLLECTION, store.id!);
    await updateDoc(storeRef, {
      name: store.name,
      type: store.type,
      address: store.address,
      contact: store.contact,
      notes: store.notes,
      createdAt: Timestamp.fromDate(store.createdAt),
      coordinate: store.coordinates ?? null,
    });
  }

  async deleteStore(storeId: string): Promise<void> {
    const storeRef = doc(db, STORES_COLLECTION, storeId);
    await deleteDoc(storeRef);
  }

  async storeExists(place_id: string, userId: string): Promise<boolean> {
    const storeQuery = query(collection(db, STORES_COLLECTION), where('place_id', '==', place_id), where('createdBy', '==', userId));
    const snapshot = await getDocs(storeQuery);
    return !snapshot.empty;
  }
}

const storeService = new StoreService();
export default storeService;