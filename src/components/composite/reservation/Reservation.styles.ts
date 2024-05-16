import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';

export const AddCampingTripCard = styled.View`
  margin: 20px;
  background-color: pink;
`;

export const StyledBackground = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 200px;
`;

export const AddCampinButton = styled.Pressable`
  width: 60%;
  height: 60px;
  background-color: #0e46a3f2;
  margin-top: 20px;
  margin-left: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const AddCampingTripText = styled.Text`
  color: #e1f7f5;
  font-size: 20px;
  font-weight: bold;
`;
