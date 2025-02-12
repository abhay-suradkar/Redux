import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../Redux/actions";
const TshirtSearchScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MyProductItem = ({ item, onAddToCart, onAddWishlist }) => {
    return (
      <View style={styles.productContainer}>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.productImage}
        />
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.productPrice}>₹{item.price}</Text>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              paddingVertical: 7,
              paddingHorizontal: 10,
              marginLeft: 15,
              marginTop: 10
            }}
            onPress={() => {
              onAddToCart(item);
            }}
          >
            <Text style={{ fontSize: 8 }}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
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
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search T-Shirts..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={'black'}
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) =>
            <MyProductItem item={item}
              onAddWishlist={(x) => {
                dispatch(addToWishlist(x));
              }}
              onAddToCart={x => {
                dispatch(addToCart(x));
              }} />}
          numColumns={2}
          columnWrapperStyle={styles.rowStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 25,
    marginBottom: 20,
    fontSize: 16,
    paddingLeft: 15,
    backgroundColor: "#f4f4f4",
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    height: 200,
    width: 160,
    borderRadius: 15,
    elevation: 8,
    backgroundColor: "#fff",
    margin: 10,
    marginBottom: 20,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productImage: {
    width: "100%",
    height: "50%",
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    color: "#333",
  },
  rowStyle: {
    justifyContent: "space-between",
  },
});

export default TshirtSearchScreen;
