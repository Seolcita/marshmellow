import styled from 'styled-components/native';
import {
  TopScreenImageBackground,
  TopScreenImageBackgroundContainer,
} from '../../common-styles/CommonStyles';
import ColorMap from '../../../styles/Color';

export const Container = styled.ScrollView`
  background-color: ${ColorMap['white'].main};
  flex: 1;
`;

export const AddCampingTripCard = styled.View`
  margin: 20px;
  background-color: pink;
`;

export const ImageBackgroundContainer = styled(
  TopScreenImageBackgroundContainer
)``;

export const ImageBackground = styled(TopScreenImageBackground)`
  resize-mode: contain;
`;

export const Image = styled.Image``;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 20px;
  margin-vertical: 10px;
`;

export const TitleImageContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-vertical: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
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

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px;
  margin-bottom: 8px;
`;

export const TripsContainer = styled.View`
  margin-horizontal: 0px;
`;

export const NoTripsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${ColorMap['white'].main};
  padding: 20px;
  border-radius: 5px;
`;

export const NoTripsText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
