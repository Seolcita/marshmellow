import styled from 'styled-components/native';

import { Tile } from '../../common-styles/CommonStyles';

export const SiteInfoCardContainer = styled(Tile)`
  flex-direction: row;
  margin-vertical: 5px;
  padding: 10px;
  gap: 15px;
  margin-horizontal: 10px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const DetailContainer = styled.View`
  justify-content: space-between;
  flex: 1;
`;
