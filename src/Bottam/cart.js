import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../Common/CartItem';
import { addToWishlist, removeFromCart, removeFromWishlist } from '../Redux/actions';
import CommonButton from '../Common/CommonButton';
import RazorpayCheckout from 'react-native-razorpay';

const cart = () => {
    const [cartList, setCartList] = useState([]);
    const cartData = useSelector(state => state.cart);
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1}}>
            <StatusBar backgroundColor="white" barStyle="light-content" />
            <View style={style.appBar}>
                    <Text style={style.title}>Cart List</Text>
            </View>
            {cartData.length>0 ?(
                <FlatList data={cartData} renderItem={({ item, index }) => {
                    return <CartItem item={item}
                        onAddWishlist={(x) => {
                            dispatch(addToWishlist(x))
                        }}
                        onRemoveItem={() => {
                            dispatch(removeFromCart(index));
                        }} />;
                }} style={{marginTop: 10}} />
            ) : (
                <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                    <Text style={{fontSize: 15, color: 'black'}}>No Item Added In The Cart</Text>
                </View>
            )}
            {cartData.length>0? (
                <View style={{marginBottom: 80}}>
                <CommonButton title={'Checkout'} bgcolor={'#78B3CE'} textcolor={'black'} 
                onPress={() =>{}}/>
            </View>
            ): null}
        </View>
    );
};
const style = StyleSheet.create({
    appBar: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      title: {
        color: 'black',
        fontSize: 22,
        fontWeight: '500',
        marginLeft: 10,
        paddingBottom: 10,
        marginLeft: 30,
      },
});
export default cart;