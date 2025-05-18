import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  sectionContainer: ViewStyle;
  sectionTitle: TextStyle;
  sectionSubtitle: TextStyle;
  optionsContainer: ViewStyle;
  optionButton: ViewStyle;
  optionButtonSelected: ViewStyle;
  optionText: TextStyle;
  optionTextSelected: TextStyle;
  divider: ViewStyle;
  rangeContainer: ViewStyle;
  rangeText: TextStyle;
  slider: ViewStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
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
});