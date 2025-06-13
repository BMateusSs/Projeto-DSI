import { db } from "../firebase/firebaseConfig";
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    where,
    Timestamp,
} from 'firebase/firestore'

export interface StoreData {
    uid: string;
    name: string;
    type: string;
    address?: string;
    contact?: string;
    notes?: string;
    createdAt?: Timestamp;
}
const STORES_COLLECTION = 'stores';
const addStore = async (store: StoreData): Promise<void> => {
    await addDoc(collection(db, STORES_COLLECTION), {
        ...store,
        createdAt: Timestamp.now(),
    });
};
const getStores = async (uid: string): Promise<StoreData[]> => {
    const storeQuery = query(
        collection(db, STORES_COLLECTION),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(storeQuery);
    return snapshot.docs.map(doc => doc.data() as StoreData);
};
const storeService = {
    addStore,
    getStores,
};

export default storeService;