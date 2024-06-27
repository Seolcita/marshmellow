import styled from 'styled-components/native';

import { Tile } from '../../common-styles/CommonStyles';
import ColorMap from '../../../styles/Color';

export const TopHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  background-color: ${ColorMap['blue'].dark};
`;

export const ButtonContainer = styled.View``;

export const BackButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
export const BackButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${ColorMap['white'].main};
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

export const Container = styled.View`
  flex: 1;
  background-color: ${ColorMap['white'].main};
  padding-horizontal: 20px;
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

export const SiteInfoCardContainer = styled(Tile)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 20px;
  margin-horizontal: 0px;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export const FavouriteIcon = styled.Image`
  width: 22px;
  height: 20px;
`;
