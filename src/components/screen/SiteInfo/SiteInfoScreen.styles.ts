import styled from 'styled-components/native';

import {
  TopScreenImageBackground,
  TopScreenImageBackgroundContainer,
} from '../../common-styles/CommonStyles';
import ColorMap from '../../../styles/Color';

interface FilterHeaderProps {
  $isFilterOpen: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${ColorMap['white'].main};
`;

export const FilterHeaderContainer = styled.View`
  width: 100%;
  background-color: ${ColorMap['blue'].dark};
  flex-direction: row;
  gap: 10px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  elevation: 5;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${ColorMap['white'].main};
  font-weight: bold;
  align-self: flex-end;
`;

export const FilterHeader = styled.Pressable<FilterHeaderProps>`
  background-color: ${({ $isFilterOpen }) =>
    $isFilterOpen ? ColorMap['white'].main : ColorMap['blue'].dark};
  flex-direction: row;
  gap: 10px;
  margin-top: 4px;
  padding-vertical: 5px;
  padding-horizontal: 15px;
  elevation: 5;
  border-radius: 500px;
  align-items: center;
  border: 1px solid ${ColorMap['white'].main};
`;

export const FilterHeaderText = styled.Text<FilterHeaderProps>`
  color: ${({ $isFilterOpen }) =>
    $isFilterOpen ? ColorMap['blue'].dark : ColorMap['white'].main};
  font-size: 16px;
  font-weight: bold;
`;

export const FilterContainer = styled.View`
  width: 100%;
  background-color: ${ColorMap['blue'].dark};
  padding-horizontal: 20px;
  padding-bottom: 20px;
`;

export const FilterCategoryText = styled.Text`
  color: ${ColorMap['white'].main};
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const ImageBackgroundContainer = styled(
  TopScreenImageBackgroundContainer
)``;

export const ImageBackground = styled(TopScreenImageBackground)``;

export const AddInputContainer = styled.View`
  with: 100%;
`;
export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const RatingContainer = styled.View`
  widht: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
`;
