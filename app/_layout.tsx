import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../app/redux/store"; // Store'un yolunu kontrol et!

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack initialRouteName="index"> 
        <Stack.Screen name="index" options={{ title: "Ana Sayfa" }} />
        <Stack.Screen name="products" options={{ title: "Ürünler" }} />
        <Stack.Screen name="cart" options={{ title: "Sepet" }} />
        <Stack.Screen name="profile" options={{ title: "Profil" }} />
      </Stack>
    </Provider>
  );
}
