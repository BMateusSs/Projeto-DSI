import { StoreData } from '../services/storeService';
import { Wine } from '../services/wineService';

export type RootStackParamList = {
  'Lista de Vinhos': undefined;
  'Adicionar Vinhos': { wineToEdit?: Wine };
  'Lista de Lojas': undefined;
  'Adicionar Lojas': { storeToEdit?: StoreData };
  'Preferences': undefined;
  'WineList': undefined;
  'StoreList': undefined;
  'Professionals': undefined;
}; 