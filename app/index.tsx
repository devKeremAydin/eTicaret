import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Ionicons } from 'react-native-vector-icons';  // İkon kütüphanesini import ettik

export default function Index() {
  return (
    <Provider store={store}>
      <Container>
        <CenteredContent>
          <Title>Hoş Geldiniz</Title>
        </CenteredContent>

        {/* Alt gezinme çubuğu */}
        <SafeAreaView style={{ width: "100%" }}>
          <BottomNav>
            <Link href="/products" asChild>
              <StyledPressable>
                <Button>
                  <ButtonText>Ürünler</ButtonText>
                </Button>
              </StyledPressable>
            </Link>

            <Link href="/cart" asChild>
              <StyledPressable>
                <Button>
                  <ButtonText>Sepet</ButtonText>
                </Button>
              </StyledPressable>
            </Link>
          </BottomNav>
        </SafeAreaView>

        {/* Sağ üstteki profil simgesi */}
        <ProfileIconContainer>
          <Link href="/LogIn" asChild>
            <StyledPressable>
              <Ionicons name="person-circle" size={45} color="#3498db"></Ionicons> 
            </StyledPressable>
          </Link>
        </ProfileIconContainer>
      </Container>
    </Provider>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  position: relative;
`;

const CenteredContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

const BottomNav = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: #f5f5f5;
  padding-vertical: 12px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledPressable = styled.Pressable`
  flex: 1;
  align-items: center;
`;

const Button = styled.View`
  width: 90%;
  align-items: center;
  justify-content: center;
  padding-vertical: 10px;
  background-color: #3498db;
  border-radius: 8px;
  border: 1px solid #3498db;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const ProfileIconContainer = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;
