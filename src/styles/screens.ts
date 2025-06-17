import { StyleSheet } from 'react-native';

export const screenStyles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  listContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  
  filterContainer: {
    marginBottom: 10,
  },
  
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  
  inputContainer: {
    marginBottom: 15,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  notesText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  
  ratingContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
  
  statusContainer: {
    marginVertical: 10,
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    marginLeft: 10,
  },
}); 