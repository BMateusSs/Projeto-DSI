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

export interface StoreData {
    id?: string;
    name: string;
    type: 'Física' | 'Online';
    address: string;
    contact: string;
    notes: string;
    createdAt: Timestamp;
    createdBy: string;
    userId: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
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
const updateStore = async (store: StoreData): Promise<void> => {
    if (!store.id) throw new Error('ID da loja é obrigatório para atualização');
    const storeRef = doc(db, STORES_COLLECTION, store.id);
    await updateDoc(storeRef, {
        name: store.name,
        type: store.type,
        address: store.address || '',
        contact: store.contact || '',
        notes: store.notes || '',
    });
};
const deleteStore = async (id: string): Promise<void> => {
    const storeRef = doc(db, STORES_COLLECTION, id);
    await deleteDoc(storeRef);
};
const storeService = {
    addStore,
    getStoresByUser,
    updateStore,
    deleteStore,
};

export default storeService;