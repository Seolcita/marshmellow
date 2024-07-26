import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';
import {
  StickyButton,
  TopScreenImageBackground,
} from '../../common-styles/CommonStyles';

export const ScrollViewContainer = styled.ScrollView`
  width: 100%;
  margin-bottom: 80px;
`;

export const ContentsContainer = styled.View`
  padding-horizontal: 10px;
  margin-top: 20px;
`;

export const ImageBackground = styled(TopScreenImageBackground)`
  width: 100%;
  justify-content: center;
  align-items: center;
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
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
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

export const CreateCategoryStickyButton = styled(StickyButton)`
  margin-bottom: 20px;
`;
