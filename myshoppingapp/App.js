import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PRODUCTS = [
  {
    id: "1",
    name: "reversible Angora Cardigan",
    price: 120,
    image: require("./images/dress1.png"),
    category: "Office Wear",
  },
  {
    id: "2",
    name: "recycle Boucle Knit Cardigan",
    price: 120,
    image: require("./images/dress2.png"),
    category: "Black",
  },
  {
    id: "3",
    name: "reversible Angora Cardigan",
    price: 120,
    image: require("./images/dress3.png"),
    category: "Church Wear",
  },
  {
    id: "4",
    name: "reversible Angora Cardigan",
    price: 120,
    image: require("./images/dress4.png"),
    category: "Lamarei",
  },
  {
    id: "5",
    name: "reversible Angora Cardigan",
    price: 120,
    image: require("./images/dress5.png"),
    category: "21WN",
  },
  {
    id: "6",
    name: "reversible Angora Cardigan",
    price: 120,
    image: require("./images/dress6.png"),
    category: "Lopo",
  },
  {
    id: "7",
    name: "reversible Angora Cardigan",
    price: 120,
    image: require("./images/dress7.png"),
    category: "21WN",
  },
  {
    id: "8",
    name: "reversible Angora Cardigan",
    price: 120,
    image: require("./images/dress3.png"),
    category: "Lame",
  },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [screen, setScreen] = useState("Home");

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = async (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
    await AsyncStorage.setItem("cart", JSON.stringify(newCart));
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productWrapper}>
      <View style={styles.productImageContainer}>
        <Image source={item.image} style={styles.productImage} />
        <TouchableOpacity
          style={styles.addIconContainer}
          onPress={() => addToCart(item)}
        >
          <Image
            source={require("./images/add_circle.png")}
            style={styles.addIcon}
          />
          {cart.filter((product) => product.id === item.id).length > 0 && (
            <Text style={styles.cartCount}>
              {cart.filter((product) => product.id === item.id).length}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.categoryText}>{item.category}</Text>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.productText}>{item.category}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <TouchableOpacity
          style={styles.removeIconContainer}
          onPress={() => removeFromCart(item)}
        >
          <Image
            source={require("./images/remove.png")}
            style={styles.removeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {screen === "Home" ? (
        <ScrollView>
          <View style={styles.header}>
            <Image source={require("./images/Menu.png")} style={styles.menu} />
            <Image source={require("./images/Logo.png")} style={styles.logo} />
            <View style={styles.headerIcons}>
              <Image
                source={require("./images/Search.png")}
                style={styles.icon}
              />
              <TouchableOpacity onPress={() => setScreen("Cart")}>
                <Image
                  source={require("./images/shoppingBag.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.subHeader}>
            <Text style={styles.storyText}>OUR STORY</Text>
            <View style={styles.subHeaderIcons}>
              <View style={styles.roundIconContainer}>
                <Image
                  source={require("./images/Listview.png")}
                  style={styles.roundIcon}
                />
              </View>
              <View style={styles.roundIconContainer}>
                <Image
                  source={require("./images/Filter.png")}
                  style={styles.roundIcon}
                />
              </View>
            </View>
          </View>
          <View style={styles.productGrid}>
            <FlatList
              data={PRODUCTS}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={renderProduct}
            />
          </View>
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() => setScreen("Cart")}
          >
            <Text style={styles.viewCartButtonText}>View Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setScreen("Home")}>
              <Image
                source={require("./images/navigate.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Image source={require("./images/Logo.png")} style={styles.logo} />
            <Image
              source={require("./images/Search.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.checkoutText}>CHECKOUT</Text>
          <View style={styles.line} />
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
          />
          <View style={styles.footer}>
            <Text style={styles.estimatedTotalText}>Est. Total</Text>
            <Text style={styles.totalPriceText}>
              ${cart.reduce((sum, item) => sum + item.price, 0)}
            </Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
            <Image
              source={require("./images/shoppingBag.png")}
              style={styles.checkoutIcon}
            />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menu: {
    width: 30,
    height: 30,
    marginHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 60,
    marginLeft: 30,
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 8,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  storyText: {
    fontSize: 30,
  },
  subHeaderIcons: {
    flexDirection: "row",
  },
  roundIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 8,
  },
  roundIcon: {
    width: 30,
    height: 30,
  },
  productGrid: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  productWrapper: {
    flex: 1,
    flexDirection: "column",
    margin: 8,
    alignItems: "flex-start", // Align items to the left
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  productImageContainer: {
    width: "100%",
    height: 265,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  addIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  addIcon: {
    width: 24,
    height: 24,
  },
  cartCount: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryText: {
    fontSize: 20,
    color: "#111111",
    fontWeight: "bold",
    marginTop: 8,
    paddingHorizontal: 8,
    alignSelf: "flex-start", // Align text to the left
  },
  productName: {
    fontSize: 20,
    marginTop: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  productPrice: {
    fontSize: 20,
    color: "#FF0000",
    marginTop: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  viewCartButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  viewCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemContainer: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  cartItemImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 8,
  },
  removeIconContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  removeIcon: {
    width: 30,
    height: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  estimatedTotalText: {
    fontSize: 16,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkoutButton: {
    flexDirection: "row",
    backgroundColor: "#000000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 8,
  },
  checkoutIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#fffff",
  },
  line: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
  checkoutText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default App;
