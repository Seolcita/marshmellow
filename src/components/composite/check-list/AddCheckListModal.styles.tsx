import { Button } from 'react-native-elements';
import styled from 'styled-components/native';

export const Content = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 25px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListContainer = styled.View`
  background-color: #f9f9f9;
  width: 100%;
`;

export const ListItem = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding-vertical: 5px;
`;
