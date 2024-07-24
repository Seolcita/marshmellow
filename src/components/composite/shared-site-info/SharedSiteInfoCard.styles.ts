import styled from 'styled-components/native';

import { Tile } from '../../common-styles/CommonStyles';

interface ReservationTypeTextProps {
  bgColor: string;
}

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

export const DefaultImage = styled.Image`
  width: 150px;
  height: 100px;
`;

export const DetailContainer = styled.View`
  justify-content: space-between;
  flex: 1;
`;

export const SiteNameText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export const SiteNumberText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export const ReservationTypeText = styled.Text<ReservationTypeTextProps>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 5px;
  font-weight: bold;
  padding-horizontal: 5px;
  padding-vertical: 2px;
  align-self: flex-start;
  font-size: 12px;
`;

export const WishIconButton = styled.Pressable``;

export const EmptyView = styled.View`
  width: 22px;
  height: 15px;
`;
