import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Link } from 'expo-router';

const LoginScreen = () => {
  return (
    <Container>
      <Title><Text>SignUp</Text></Title>
      <Input placeholder="Email" keyboardType="email-address" />
      <Input placeholder="Password" secureTextEntry />
      <LoginButton>
        <ButtonText>SignUp</ButtonText>
      </LoginButton>
    </Container>
  );
};

export default LoginScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  background-color: #3498db;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;

const SignUpText = styled.Text`
  color: #3498db;
  margin-top: 15px;
  font-size: 16px;
  text-decoration: underline;
`;
