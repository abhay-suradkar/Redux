import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CartItem = ({ item, isAdded, onRemoveItem, onAddWishlist, isWishlist, onRemoveFromWishlist, onAddToCart }) => {
  return (
    <View
      style={{
        height: 200,
        width: '94%',
        borderRadius: 20,
        elevation: 5,
        backgroundColor: '#C9E6F0',
        margin: 10,
        marginBottom: 20,
      }}
    >
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: '60%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <Text
        style={{
          fontSize: 15,
          marginLeft: 10,
          marginTop: 10,
          fontWeight: '600',
        }}
      >
        {item.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 15 }}>{'₹' + item.price}</Text>
        {isWishlist ? (
            <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              paddingVertical: 7,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              onAddToCart(item);
            }}
          >
            <Text style={{ fontSize: 10 }}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
            <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              paddingVertical: 7,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              onRemoveItem();
            }}
          >
            <Text style={{ fontSize: 10 }}>Remove item</Text>
          </TouchableOpacity>
        )}
        
      </View>
      {isWishlist ? (
        <TouchableOpacity
        style={{
          height: 35,
          width: 35,
          backgroundColor: '#fff',
          borderRadius: 17,
          elevation: 50,
          position: 'absolute',
          top: 10,
          right: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          onRemoveFromWishlist();
        }}
      >
        <Image
          source={require('../Images/blackheart.png')}
          style={{
            height: 20,
            width: 20,
            tintColor: 'red',
          }}
        />
      </TouchableOpacity>
      ): (<TouchableOpacity
        style={{
          height: 35,
          width: 35,
          backgroundColor: '#fff',
          borderRadius: 17,
          elevation: 50,
          position: 'absolute',
          top: 10,
          right: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          onAddWishlist(item);
        }}
      >
        <Image
          source={require('../Images/heart.png')}
          style={{
            height: 20,
            width: 20,
            tintColor: 'gray',
          }}
        />
      </TouchableOpacity>)}
      
    </View>
  );
};

export default CartItem;
