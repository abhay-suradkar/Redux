/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonButton from '../Common/CommonButton';
import CustomTextinput from '../Common/CustomTextInput';

const Signup = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        let valid = true;
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Please enter your name.';
            valid = false;
        }
        if (!email.trim()) {
            newErrors.email = 'Please enter your email.';
            valid = false;
        }
        if (!number.trim() || number.length < 10) {
            newErrors.number = 'Please enter a valid 10-digit mobile number.';
            valid = false;
        }
        if (!password.trim()) {
            newErrors.password = 'Please enter your password.';
            valid = false;
        }
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password.';
            valid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('Name', name);
            await AsyncStorage.setItem('Email', email);
            await AsyncStorage.setItem('Number', number);
            await AsyncStorage.setItem('Password', password);
            Alert.alert('Success', 'Account created successfully!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to save user data. Please try again.');
        }
    };

    const handleSignup = () => {
        if (validateInputs()) {
            saveData();
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                {/* App Logo */}
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
                    Create New Account
                </Text>
                <CustomTextinput
                    Placeholder="Enter Name"
                    icon={require('../Images/user.png')}
                    marginTop={60}
                    value={name}
                    onChangeText={setName}
                />
                {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

                <CustomTextinput
                    Placeholder="Enter Email ID"
                    icon={require('../Images/gmail.png')}
                    marginTop={20}
                    value={email}
                    onChangeText={setEmail}
                />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                <CustomTextinput
                    Placeholder="Enter Mobile Number"
                    icon={require('../Images/call.png')}
                    marginTop={20}
                    value={number}
                    keyboardType="number-pad"
                    onChangeText={setNumber}
                />
                {errors.number && <Text style={{ color: 'red' }}>{errors.number}</Text>}
                <CustomTextinput
                    type="password"
                    Placeholder="Enter Password"
                    icon={require('../Images/password.png')}
                    marginTop={20}
                    value={password}
                    onChangeText={setPassword}
                />
                {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                <CustomTextinput
                    type="password"
                    Placeholder="Confirm Password"
                    icon={require('../Images/password.png')}
                    marginTop={20}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                {errors.confirmPassword && (
                    <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                )}
                <CommonButton
                    title="Sign Up"
                    bgcolor="lightblue"
                    textcolor="black"
                    onPress={handleSignup}
                />
                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 20,
                        alignSelf: 'center',
                        textDecorationLine: 'underline',
                        marginBottom: '10%',
                    }}
                    onPress={() => navigation.goBack()}>
                    Already Have an Account?
                </Text>
            </View>
        </ScrollView>
    );
};

export default Signup;
