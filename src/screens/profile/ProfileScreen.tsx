import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { auth } from '../../firebase/firebaseConfig';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [stats, setStats] = useState({
    wines: 0,
    stores: 0,
    professionals: 0
  });

  const fetchUserData = async () => {
    if (!auth.currentUser) return;
    
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.name) {
          setUserName(userData.name);
        }
        if (userData.email) {
          setUserEmail(userData.email);
        }
      }

      const winesQuery = query(
        collection(db, "wines"),
        where("createdBy", "==", auth.currentUser.uid)
      );
      const winesSnap = await getDocs(winesQuery);
      
      const storesQuery = query(
        collection(db, "stores"),
        where("createdBy", "==", auth.currentUser.uid)
      );
      const storesSnap = await getDocs(storesQuery);
      
      const professionalsQuery = query(
        collection(db, "professionals"),
        where("createdBy", "==", auth.currentUser.uid)
      );
      const professionalsSnap = await getDocs(professionalsQuery);

      setStats({
        wines: winesSnap.size,
        stores: storesSnap.size,
        professionals: professionalsSnap.size
      });

      console.log('Estatísticas:', {
        wines: winesSnap.size,
        stores: storesSnap.size,
        professionals: professionalsSnap.size
      });
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  };

  const getInitial = () => {
    return userName ? userName.charAt(0).toUpperCase() : '?';
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitial()}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="wine" size={24} color="#6B2737" />
            <Text style={styles.statValue}>{stats.wines}</Text>
            <Text style={styles.statLabel}>Vinhos</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="storefront" size={24} color="#6B2737" />
            <Text style={styles.statValue}>{stats.stores}</Text>
            <Text style={styles.statLabel}>Lojas</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people" size={24} color="#6B2737" />
            <Text style={styles.statValue}>{stats.professionals}</Text>
            <Text style={styles.statLabel}>Profissionais</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f1e9',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatarText: {
    fontSize: 48,
    color: '#6B2737',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B2737',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  logoutButton: {
    backgroundColor: '#6B2737',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 