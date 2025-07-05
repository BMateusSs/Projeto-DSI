import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainerHalf: {
    width: '100%',
    height: 350,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  loadingOverlay: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
  },
  cardList: {
    flexGrow: 0,
    backgroundColor: '#fff',
    paddingBottom: 16,
    height: '50%',
    zIndex: 2,
  },
  storeCard: {
    backgroundColor: '#f8f1e9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B2737',
    marginBottom: 8,
  },
  storeAddress: {
    fontSize: 15,
    color: '#444',
    flexShrink: 1,
  },
  storeDistance: {
    fontSize: 14,
    color: '#6B2737',
    fontWeight: 'bold',
  },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center'
  },
  modalStoreName: { fontSize: 22, fontWeight: 'bold', color: '#6B2737', marginBottom: 8, textAlign: 'left', alignSelf: 'flex-start' },
  modalStoreDistance: { fontSize: 16, color: '#666', marginBottom: 16, textAlign: 'left', alignSelf: 'flex-start' },
  closeIcon: { position: 'absolute', top: 12, right: 12, zIndex: 10 },
  storeCardVertical: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 0,
    marginRight: 18,
    width: 230,
    height: 300,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
    marginTop: 15,
  },
  rowInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  storeImage: {
    width: '100%', height: 120, borderTopLeftRadius: 16, borderTopRightRadius: 16, marginBottom: 8
  },
  cardBottomBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#6B2737',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginTop: 'auto',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginLeft: 20, marginTop: 20, marginBottom: 8 },
});

export default styles; 