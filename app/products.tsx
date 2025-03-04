import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../app/redux/slices/productsSlice";
import { RootState, AppDispatch } from "../app/redux/store";
import { addToCart } from "../app/redux/slices/cartSlice"; // Sepete ekleme action'ı
import LottieView from "lottie-react-native";
import styled from "styled-components/native";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});
  const [isPageLoadingVisible, setIsPageLoadingVisible] = useState(true);
  const [isLoadingVisible, setIsLoadingVisible] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts());

    const pageLoadingTimeout = setTimeout(() => {
      setIsPageLoadingVisible(false);
    }, 1000);

    const loadingTimeout = setTimeout(() => {
      setIsLoadingVisible(false);
    }, 2000);

    return () => {
      clearTimeout(pageLoadingTimeout);
      clearTimeout(loadingTimeout);
    };
  }, [dispatch]);

  const handleImageLoad = (id: string) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  // Sepete ürün ekleme fonksiyonu
  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ id: product.id.toString(), title: product.title, image: product.image }));
  };

  return (
    <Container>
      {isPageLoadingVisible && (
        <LottieView
          source={require("../assets/animations/pageLoading.json")}
          autoPlay
          loop
          style={{
            position: "absolute",
            top: "50%",
            left: "60%",
            transform: [{ translateX: -150 }, { translateY: -150 }],
            width: 300,
            height: 300,
          }}
        />
      )}

      {!isPageLoadingVisible && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard>
              {isLoadingVisible && !imageLoaded[item.id] && (
                <LottieView
                  source={require("../assets/animations/loading.json")}
                  autoPlay
                  loop
                  style={{ width: 50, height: 50 }}
                />
              )}
              <ProductImage
                source={{ uri: item.image }}
                onLoad={() => handleImageLoad(item.id.toString())}
              />
              <Text>{item.title}</Text>
              <AddToCartButton onPress={() => handleAddToCart(item)}>
                <ButtonText>Sepete Ekle</ButtonText>
              </AddToCartButton>
            </ProductCard>
          )}
        />
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
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

const AddToCartButton = styled.TouchableOpacity`
  background-color: #ff6347;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
