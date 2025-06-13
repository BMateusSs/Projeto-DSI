import { db } from "../firebase/firebaseConfig";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    Timestamp,
} from 'firebase/firestore'

export interface StoreData {
    id?: string;
    name: string;
    type: string;
    address?: string;
    contact?: string;
    notes?: string;
    createdAt: Timestamp;
    createdBy: string;
}
const STORES_COLLECTION = 'stores';
const addStore = async (store: Omit<StoreData, 'id' | 'createdAt'>): Promise<void> => {
    await addDoc(collection(db, STORES_COLLECTION), {
        ...store,
        createdAt: Timestamp.now(),
        createdBy: store.createdBy,
    });
};
const getStoresByUser = async (uid: string): Promise<StoreData[]> => {
    const storeQuery = query(
        collection(db, STORES_COLLECTION),
        where('createdBy', '==', uid),
    );
    const snapshot = await getDocs(storeQuery);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as StoreData));
};
const storeService = {
    addStore,
    getStoresByUser,
};

export default storeService;