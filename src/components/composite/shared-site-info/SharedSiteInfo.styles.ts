import styled from 'styled-components/native';
import ColorMap from '../../../styles/Color';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const FilterHeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 20px;
  elevation: 5;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  background-color: ${ColorMap['white'].main};
`;

export const Filter = styled.Pressable`
  flex-direction: row;
  border-radius: 500px;
  align-items: center;
`;

export const FilterContainer = styled.View`
  width: 100%;
  background-color: ${ColorMap['blue'].dark};
  padding-horizontal: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: ${ColorMap['white'].main};
  elevation: 5;
`;

export const FilterCategoryText = styled.Text`
  color: ${ColorMap['grey'].dark};
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const RatingContainer = styled.View`
  widht: 100%;
  flex-direction: row;
  background-color: transparent;
`;

export const NoDataFoundContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const NoDataFoundText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;
