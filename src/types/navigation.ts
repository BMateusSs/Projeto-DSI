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
  'Adicionar Vinhos': { wineToEdit?: any };
  'Adicionar Lojas': { storeToEdit?: any };
  'Mapa': undefined;
  'Recomendados': undefined;
  'Profissionais': undefined;
  'Detalhes Enologo': { professionalId: string };
  'Lista de Vinhos': undefined;
  'Lista de Lojas': undefined;
  'WineDetails': { wineId: string };
  'StoreDetails': { storeId: string };
};

export type TabParamList = {
  Home: undefined;
  Biblioteca: undefined;
  Lojas: undefined;
  Professionais: undefined;
  Perfil: undefined;
};