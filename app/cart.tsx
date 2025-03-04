import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { removeFromCart } from "../app/redux/slices/cartSlice";
import styled from "styled-components/native";

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container>
      <Title>Sepetiniz</Title>
      {items.length === 0 ? (
        <Text>Sepetiniz boş!</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItem>
              <ItemImage source={{ uri: item.image }} />
              <ItemDetails>
                <Text>{item.title}</Text>
                <Text>Adet: {item.quantity}</Text>
              </ItemDetails>
              <RemoveButton onPress={() => handleRemoveFromCart(item.id)}>
                <ButtonText>Sil</ButtonText>
              </RemoveButton>
            </CartItem>
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

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CartItem = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  align-items: center;
`;

const ItemImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;

const ItemDetails = styled.View`
  flex: 1;
`;

const RemoveButton = styled.TouchableOpacity`
  background-color: #ff6347;
  padding: 5px 10px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;
