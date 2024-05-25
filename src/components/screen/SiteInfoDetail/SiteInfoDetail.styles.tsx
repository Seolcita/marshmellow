import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: pink;
  padding-horizontal: 20px;
`;

export const ButtonContainer = styled.View`
  align-self: flex-end;
`;

export const Button = styled.Pressable`
  flex-direction: row;
  align-items: center;
  background-color: lightgrey;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
  margin-right: 20px;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  background-color: lightblue;
  padding-vertical: 10px;
`;

export const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

export const MainContainer = styled.View`
  background-color: #e0fbe2;
  margin-top: 20px;
  flex: 1;
`;
