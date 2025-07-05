import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6d6d6d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 180,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  wineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d2d2d',
    marginBottom: 6,
  },
  wineType: {
    fontSize: 14,
    color: '#8B2D3E',
    marginBottom: 12,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6d6d6d',
    width: 70,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: '#2d2d2d',
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  region: {
    fontSize: 13,
    color: '#6d6d6d',
    flex: 1,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    fontSize: 16,
    marginRight: 6,
  },
  countryName: {
    fontSize: 13,
    color: '#6d6d6d',
  },
});

export default styles;