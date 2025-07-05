import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { pickAndUploadImage } from '../../utils/uploadImage';
import { AppUser } from '../../firebase/AppUser';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [stats, setStats] = useState({
    wines: 0,
    stores: 0,
    professionals: 0
  });

  const fetchUserData = async () => {
  if (!auth.currentUser) return;

  try {
    const appUser = await AppUser.create(auth.currentUser);
    setUserName(appUser.name);
    setUserEmail(appUser.email);
    setProfilePicture(appUser.profilePicture);

    const winesQuery = query(
      collection(db, "wines"),
      where("createdBy", "==", appUser.uid)
    );
    const winesSnap = await getDocs(winesQuery);

    const storesQuery = query(
      collection(db, "stores"),
      where("createdBy", "==", appUser.uid)
    );
    const storesSnap = await getDocs(storesQuery);

    const professionalsQuery = query(
      collection(db, "professionals"),
      where("createdBy", "==", appUser.uid)
    );
    const professionalsSnap = await getDocs(professionalsQuery);

    setStats({
      wines: winesSnap.size,
      stores: storesSnap.size,
      professionals: professionalsSnap.size,
    });

  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error);
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

  const handleProfilePictureChange = async () => {
    const url = await pickAndUploadImage();
    if (url && auth.currentUser) {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        profilePicture: url,
      });
      setProfilePicture(url);
    }
  }

  const getInitial = () => {
    return userName ? userName.charAt(0).toUpperCase() : '?';
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={handleProfilePictureChange}
            style={styles.avatarContainer}
            activeOpacity={0.8}
          >
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>{getInitial()}</Text>
            )}
          </TouchableOpacity>
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
        <TouchableOpacity 
          style={styles.preferenceButton}
          onPress={() => navigation.navigate('Preferences')}
          activeOpacity={0.8}
        >
          <Ionicons name="settings-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.preferenceButtonText}>Minhas Preferências</Text>
        </TouchableOpacity>
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
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
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
  preferenceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6B2737',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 18,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '90%',
    alignSelf: 'center',
  },
  preferenceButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default ProfileScreen; 