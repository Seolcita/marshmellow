import styled from 'styled-components/native';

import { StickyButton } from '../../common-styles/CommonStyles';

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  padding-vertical: 15px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
  padding-top: 70px;
  padding-bottom: 20px;
  background-color: white;
  elevation: 5;
`;

export const BackButton = styled.Pressable``;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

export const CreateButton = styled(StickyButton)`
  position: absolute;
  bottom: 0px;
  right: 20px;
  z-index: 1;
`;
