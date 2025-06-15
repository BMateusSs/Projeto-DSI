import { doc, setDoc, collection, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

export interface Wine {
  id?: string;
  nome: string;
  tipo: string;
  regiao: string;
  status: 'experimented' | 'desired';
  rating: number | null;
  anotation: string | null;
  createdAt: Date;
  createdBy: string;
}

export class WineService {
  private static readonly COLLECTION_NAME = "wines";

  static async addWine(wineData: Omit<Wine, 'id' | 'createdAt' | 'createdBy'>): Promise<string> {
    try {
      if (!auth.currentUser) {
        throw new Error("Usuário não autenticado");
      }

      const wine: Wine = {
        ...wineData,
        id: '',
        createdAt: new Date(),
        createdBy: auth.currentUser.uid,
        rating: wineData.rating ?? null,
        anotation: wineData.anotation ?? null
      };

      const winesCollection = collection(db, this.COLLECTION_NAME);
      const newWineRef = doc(winesCollection);
      wine.id = newWineRef.id;
      
      await setDoc(newWineRef, wine);
      return wine.id;
    } catch (error) {
      console.error("Erro ao adicionar vinho:", error);
      throw error;
    }
  }

  static async updateWine(wineId: string, wineData: Partial<Omit<Wine, 'id' | 'createdAt' | 'createdBy'>>): Promise<void> {
    try {
      if (!auth.currentUser) {
        throw new Error("Usuário não autenticado");
      }

      const wineRef = doc(db, this.COLLECTION_NAME, wineId);
      
      const updatedFields: Partial<Wine> = {
        nome: wineData.nome,
        tipo: wineData.tipo,
        regiao: wineData.regiao,
        status: wineData.status,
        rating: wineData.rating,
        anotation: wineData.anotation,
      };

      await updateDoc(wineRef, updatedFields);
      console.log("Vinho atualizado com sucesso!");
    } catch (error) {
      console.error(`Erro ao atualizar vinho com ID ${wineId}:`, error);
      throw error;
    }
  }

  static async getWinesByUser(userId: string): Promise<Wine[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where("createdBy", "==", userId)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as Wine);
    } catch (error) {
      console.error("Erro ao buscar vinhos:", error);
      throw error;
    }
  }

  static async deleteWine(wineId: string): Promise<void> {
    try {
      if (!auth.currentUser) {
        throw new Error("Usuário não autenticado");
      }

      const wineRef = doc(db, this.COLLECTION_NAME, wineId);
      await deleteDoc(wineRef);
      console.log("Vinho deletado com sucesso!");
    } catch (error) {
      console.error(`Erro ao deletar vinho com ID ${wineId}:`, error);
      throw error;
    }
  }
}