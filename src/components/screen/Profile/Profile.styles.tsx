import styled from 'styled-components/native';

import { Tile } from '../../common-styles/CommonStyles';

export const Container = styled.View`
  flex: 1;
  margin-vertical: 40px;
  background-color: #f0f0f7;
`;

export const PersonalInfoContainer = styled.View``;
export const Section = styled(Tile)`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 16px;
`;

export const NameLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const EditNameButton = styled.Pressable`
  margin-right: 10px;
`;

export const Label = styled.Text`
  font-size: 18px;
  padding-vertical: 4px;
  font-weight: bold;
`;

export const ProfileText = styled.Text`
  font-size: 20px;
  padding-vertical: 4px;
`;

export const AuthContainer = styled.View`
  padding: 20px;
`;
