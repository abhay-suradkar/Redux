import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAddress } from '../Redux/actions';

const MyAddress = () => {
    const navigation = useNavigation();
    const addressList = useSelector(state => state.address);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Addresses</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
                    <Text style={styles.subtitle}>+ Add Address</Text>
                </TouchableOpacity>
            </View>

            {Array.isArray(addressList) && addressList.length > 0 ? (
                <FlatList
                    data={addressList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.addressItem}>
                            <Text style={styles.addressText}><Text style={styles.bold}>State:</Text> {item.state}</Text>
                            <Text style={styles.addressText}><Text style={styles.bold}>City:</Text> {item.city}</Text>
                            <Text style={styles.addressText}><Text style={styles.bold}>Area:</Text> {item.Area}</Text>
                            <Text style={styles.addressText}><Text style={styles.bold}>Pincode:</Text> {item.pincode}</Text>
                            
                            <TouchableOpacity 
                                style={styles.deleteButton}
                                onPress={() => dispatch(deleteAddress(index))}
                            >
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noAddress}>No addresses available.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    subtitle: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        padding: 7,
        fontSize: 12,
    },
    addressItem: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        elevation: 3,
        marginTop: 30,
    },
    addressText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
    },
    deleteButton: {
        marginTop: 10,
        padding: 8,
        backgroundColor: '#FF7777',
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },
    noAddress: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
});

export default MyAddress;
