import styled from 'styled-components/native';

import ColorMap from '../../../../styles/Color';

export const Container = styled.View`
  background-color: ${ColorMap['grey'].light};
  with: 100%;
  height: 46px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

export const CategoryTitle = styled.View`
  background-color: ${ColorMap['grey'].light};
  font-size: 16px;
  font-weight: bold;
  margin-left: 12px;
`;
