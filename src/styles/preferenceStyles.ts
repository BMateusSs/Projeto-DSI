import { StyleSheet } from 'react-native';


export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#800020',
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#800020',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  optionButtonSelected: {
    backgroundColor: '#800020',
  },
  optionText: {
    color: '#800020',
  },
  optionTextSelected: {
    color: 'white',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  rangeContainer: {
    marginBottom: 15,
  },
  rangeText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  saveButton: {
    backgroundColor: '#800020',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerTitle: {
          width: '90%',
          marginBottom: 15
  },
  title: {
      color: '#333',
      fontSize: 25,
      fontWeight: 'bold'
  },
});