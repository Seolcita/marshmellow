import styled from 'styled-components/native';

import { StickyButton, Tile } from '../../common-styles/CommonStyles';

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  padding-vertical: 20px;
`;

export const MySharedCheckListTile = styled(Tile)`
  margin-horizontal: 0px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const CreateButton = styled(StickyButton)`
  position: absolute;
  bottom: 0px;
  right: 20px;
  z-index: 1;
`;
