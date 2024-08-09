import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

export const ScrollViewContainer = styled.ScrollView`
  width: 100%;
`;

export const ContentsContainer = styled.View`
  width: 100%;
  padding-horizontal: 10px;
  margin-top: 20px;
  padding-bottom: 80px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${ColorMap['white'].main};
  background-color: ${ColorMap['black'].main};
  padding-horizontal: 10px;
  font-weight: bold;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  gap: 8px;
`;

export const Button = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  background-color: lightgrey;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

export const ClearButtonContainer = styled.View`
  width: 49%;
  align-items: center;
  justify-content: center;
`;

export const ToggleContainer = styled.View`
  width: 49%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 4px;
  gap: 10px;
  background-color: ${ColorMap['blue'].dark};
  border-radius: 5px;
`;

export const ToggleText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${ColorMap['white'].main};
`;
