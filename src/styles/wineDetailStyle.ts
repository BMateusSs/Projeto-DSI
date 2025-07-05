import { StyleSheet } from 'react-native';

const wineDetailStyle = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#61142b',
    width: '100%',
    textAlign: 'left',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  image: {
    width: 180,
    height: 180,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#61142b',
    textAlign: 'center',
  },
  region: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    color: '#444',
    marginLeft: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagText: {
    fontSize: 13,
    color: '#61142b',
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default wineDetailStyle;