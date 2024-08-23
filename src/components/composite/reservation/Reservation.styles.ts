import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

export const Container = styled.View`
  flex: 1;
  padding-bottom: 10px;
  background-color: ${ColorMap['grey'].extraLight};
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
  background-color: ${ColorMap['white'].main};
  border-bottom-width: 1px;
  border-bottom-color: ${ColorMap['grey'].light};
`;

export const TripsContainer = styled.View`
  flex: 1;
  margin-horizontal: 0px;
`;

export const Space = styled.View`
  width: 100%;
  height: 80px;
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

export const AddSiteMessageContainer = styled.View`
  margin-horizontal: 10px;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  padding-top: 24px;
  padding-bottom: 10px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

export const AddSiteMessageTextDescription = styled.Text`
  font-size: 16px;
  margin-bottom: 0px;
`;
