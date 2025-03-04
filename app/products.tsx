import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../app/redux/slices/productsSlice";
import { RootState, AppDispatch } from "../app/redux/store";
import { addToCart, removeFromCart } from "../app/redux/slices/cartSlice";
import LottieView from "lottie-react-native";
import styled from "styled-components/native";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const cart = useSelector((state: RootState) => state.cart.items);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getCartQuantity = (productId: string) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView 
          source={require("../assets/animations/loading.json")} 
          autoPlay 
          loop 
          style={{ width: 200, height: 200 }} 
        />
      </View>
    );
  }

  return (
    <Container>
      <SearchInput
        placeholder="Ürün Ara..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard>
            <ProductImage source={{ uri: item.image }} />
            <Text>{item.title}</Text>

            <QuantityContainer>
              <QuantityButton onPress={() => dispatch(removeFromCart(item.id.toString()))}>
                <ButtonText>-</ButtonText>
              </QuantityButton>

              <QuantityText>{getCartQuantity(item.id.toString())}</QuantityText>

              <QuantityButton onPress={() => dispatch(addToCart({ 
                id: item.id.toString(), 
                title: item.title, 
                image: item.image 
              }))}>
                <ButtonText>+</ButtonText>
              </QuantityButton>
            </QuantityContainer>
          </ProductCard>
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ProductCard = styled.View`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const QuantityButton = styled.TouchableOpacity`
  background-color: #ff6347;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin: 0 10px;
`;

const QuantityText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
