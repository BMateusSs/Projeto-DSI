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
  'Professionals': undefined;
  'Detalhes Enologo': { enologoId: string };
  'Detalhes Sommelier': { sommelierId: string };
  'Lista de Vinhos': undefined;
  'Lista de Lojas': undefined;
  'WineDetails': { wineId: string };
  'StoreDetails': { storeId: string };
};

export type TabParamList = {
  Home: undefined;
  Adega: undefined;
  Lojas: undefined;
  Professionais: undefined;
  Perfil: undefined;
};