import styled from 'styled-components/native';

import { Tile } from '../../common-styles/CommonStyles';

interface ReservationTypeTextProps {
  bgColor: string;
}

export const Pressable = styled.Pressable`
  overflow: hidden;
`;

export const SiteInfoCardContainer = styled(Tile)`
  flex-direction: row;
  margin-vertical: 8px;
  margin-horizontal: 10px;
  padding: 0px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 5px 0 0 5px;
  overflow: hidden;
`;

export const DefaultImageContainer = styled.View`
  width: 160px;
  height: 140px;
  background-color: #f7f7f7;
  align-items: center;
  justify-content: center;
`;
export const DefaultImage = styled.Image`
  width: 250px;
  height: 140px;
`;

export const NoImageText = styled.Text``;

export const DetailContainer = styled.View`
  justify-content: space-between;
  padding-vertical: 8px;
  margin-left: 10px;
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
  font-size: 10px;
`;

export const WishIconButton = styled.Pressable`
  margin-top: 8px;
  margin-right: 8px;
`;

export const EmptyView = styled.View`
  width: 22px;
  height: 15px;
`;

export const Location = styled.View`
  flex-direction: row;
  align-items: start;
`;

export const LocationText = styled.Text`
  font-size: 12px;
`;
