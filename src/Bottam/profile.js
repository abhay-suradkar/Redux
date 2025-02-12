import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {

  const navigation =useNavigation();
  const [name, setname] = useState([]);
  const [Email, setEmail] = useState([]);
  const [Number, setNumber] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const StoreName = await AsyncStorage.getItem('Name');
      if (StoreName) {
        setname(StoreName);
      }
      const StoreEmail = await AsyncStorage.getItem('Email');
      if (StoreEmail) {
        setEmail(StoreEmail);
      }
      const StoreNumber = await AsyncStorage.getItem('Number');
      if (StoreNumber) {
        setNumber(StoreNumber);
      }
    } catch (error) {
      console.error('failed to load name', error);
    }
  };
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor="white" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Image source={require('../Images/setting.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.userContainer}>
        <Image source={require('../Images/profile.png')} style={styles.user} />
      </View>
      <View>
        <View style={{ marginLeft: 20, marginTop: 30}}>
          <Text style={styles.info}>{name}</Text>
          <Text style={styles.info}>{Email}</Text>
          <Text style={styles.info}>{Number}</Text>
          <TouchableOpacity style={styles.info}  onPress={() => navigation.navigate('MyAddress')}>
            <Text style={{ fontSize: 15, backgroundColor: 'lightblue', padding: 10}}>My Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.info} onPress={() => navigation.navigate('MyOrders')}>
            <Text style={{ fontSize: 15, backgroundColor: 'lightblue', padding: 10}}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.info} onPress={() => navigation.navigate('Offers')}>
            <Text style={{ fontSize: 15, backgroundColor: 'lightblue', padding: 10}}>Offers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 25,
    flex: 1,
    fontWeight: 'bold',
  },
  icon: {
    height: 25,
    width: 25,
  },
  userContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  user: {
    height: 100,
    width: 100,
  },
  info: {
    fontSize: 18,
    marginTop: 15,
    borderBottomWidth: .3,
    borderBlockColor: 'black',
    height: 40,
    width: '95%'
  },
});

export default Profile;
