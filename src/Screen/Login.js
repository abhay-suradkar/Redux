/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonButton from '../Common/CommonButton';
import CustomTextinput from '../Common/CustomTextInput';
import Loder from '../Common/Loder';

const Login = () => {
    const navigation = useNavigation();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [Bademail, setBademail] = useState(false);
    const [Badpassword, setBadpassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const login = () => {
        setModalVisible(true);
        if (email === '') {
            setModalVisible(false);
            setBademail(true);
        } else {
            setBademail(false);
        }

        if (password === '') {
            setModalVisible(false);
            setBadpassword(true);
        } else {
            setBadpassword(false);
        }

        if (email !== '' && password !== '') {
            setTimeout(() => {
                getData();
            },2000);
        }
    };

    const getData = async () => {
        try {
            const mEmail = await AsyncStorage.getItem('Email');
            const mPassword = await AsyncStorage.getItem('Password');
            if (email === mEmail && password === mPassword) {
                setModalVisible(false);
                navigation.navigate('Home'); // Use the screen name as a string
            } else {
                setModalVisible(false);
                Alert.alert('Error', 'Incorrect email or password');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <Image
                    source={require('../Images/ecommerce.png')}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        alignSelf: 'center',
                        marginTop: '15%',
                    }}
                />
                <Text
                    style={{
                        fontSize: 30,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        marginTop: 30,
                    }}>
                    Login
                </Text>
                <CustomTextinput
                    Placeholder="Enter Email ID"
                    icon={require('../Images/gmail.png')}
                    marginTop={60}
                    value={email}
                    onChangeText={(txt) => setemail(txt)}
                />
                {Bademail && <Text style={{ color: 'red' }}>Please Enter Email</Text>}
                <CustomTextinput
                    type="password"
                    Placeholder="Enter Password"
                    icon={require('../Images/password.png')}
                    marginTop={20}
                    value={password}
                    onChangeText={(txt) => setpassword(txt)}
                />
                {Badpassword && <Text style={{ color: 'red' }}>Please Enter Password</Text>}
                <CommonButton
                    title={'Login'}
                    bgcolor={'lightblue'}
                    textcolor={'black'}
                    onPress={login}
                />
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 20,
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                        marginBlock: '10%',
                    }}
                    onPress={() => navigation.navigate('Signup')}>
                    Create New Account?
                </Text>
            </View>
            <Loder modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </ScrollView>
    );
};

export default Login;
