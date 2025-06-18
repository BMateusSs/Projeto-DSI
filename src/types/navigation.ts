import { StoreData } from '../services/storeService';
import { Wine } from '../services/wineService';

export type RootStackParamList = {
  'Login': undefined;
  'SignUp': undefined;
  'Password': undefined;
  'RecoveryCode': undefined;
  'NewPassword': undefined;
  'Preferences': undefined;
  'Home': undefined;
  'Adicionar Vinhos': { wineToEdit?: Wine };
  'Adicionar Lojas': { storeToEdit?: StoreData };
  'Mapa': undefined;
  'Lista de Vinhos': undefined;
  'Lista de Lojas': undefined;
  'Professionals': undefined;
  'WineDetails': { wineId: string };
  'StoreDetails': { storeId: string };
};

export type TabParamList = {
  Home: undefined;
  Biblioteca: undefined;
  Lojas: undefined;
  Explorar: undefined;
  Perfil: undefined;
}; 