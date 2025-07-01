import { doc, setDoc, collection, getDocs, query, where, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { WineClass } from "./wineClass";

const WINES_COLLECTION = 'wines';

class WineService {
  async addWine(wine: WineClass): Promise<void> {
    wine.validate();

    const wineRef = doc(collection(db, WINES_COLLECTION));
    wine.id = wineRef.id;

    await setDoc(wineRef, {
      ...wine,
      createdAt: Timestamp.fromDate(wine.createdAt),
    });
  }

  async updateWine(wine: WineClass): Promise<void> {
    wine.validate();

    const wineRef = doc(db, WINES_COLLECTION, wine.id!);
    await updateDoc(wineRef, {
      nome: wine.nome,
      tipo: wine.tipo,
      regiao: wine.regiao,
      status: wine.status,
      rating: wine.rating,
      anotation: wine.anotation,
    });
  }

  async getWinesByUser(userId: string): Promise<WineClass[]> {
    const wineQuery = query(collection(db, WINES_COLLECTION), where('createdBy', '==', userId));
    const snapshot = await getDocs(wineQuery);

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new WineClass(
        data.nome,
        data.tipo,
        data.regiao,
        data.status,
        data.createdBy,
        data.rating ?? null,
        data.anotation ?? null,
        doc.id,
        data.createdAt?.toDate()
      );
    });
  }

  async deleteWine(wineId: string): Promise<void> {
    const wineRef = doc(db, WINES_COLLECTION, wineId);
    await deleteDoc(wineRef);
  }
}

const wineService = new WineService();
export default wineService;