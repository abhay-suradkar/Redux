import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import CustomTextinput from '../Common/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import CommonButton from '../Common/CommonButton';
import { useDispatch } from 'react-redux';
import { addAddress } from '../Redux/actions';

const AddAddress = () => {
    const navigation = useNavigation();
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [Area, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../Images/back.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.title}>Add Address</Text>
            </View>

            <View style={{ marginTop: 40 }}>
                <CustomTextinput
                    Placeholder="Enter Your State"
                    icon={require('../Images/state.png')}
                    value={state}
                    onChangeText={setState}
                />
                <CustomTextinput
                    Placeholder="Enter Your City"
                    icon={require('../Images/city.png')}
                    value={city}
                    onChangeText={setCity}
                    marginTop={20}
                />
                <CustomTextinput
                    Placeholder="Enter Your Area"
                    icon={require('../Images/building.png')}
                    value={Area}
                    onChangeText={setArea}
                    marginTop={20}
                />
                <CustomTextinput
                    Placeholder="Enter Your PinCode"
                    icon={require('../Images/pincode.png')}
                    value={pincode}
                    keyboardType={'number-pad'}
                    onChangeText={setPincode}
                    marginTop={20}
                />
                <CommonButton
                    title="Save Address"
                    bgcolor="lightblue"
                    style={styles.button}
                    onPress={() => {
                        if (state !== '' && city !== '' && Area !== '' && pincode !== '') {
                            dispatch(
                                addAddress({ city, state, Area, pincode })
                            );
                            navigation.goBack();
                        }
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15, // Space between back button and title
    },
    button: {
        position: 'absolute',
        top: 100,
        bottom: 0
    },
});

export default AddAddress;
