import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

interface AccordionProps {
  $marginTop?: number;
}

interface AdminAccordionProps {
  $isSettingOpen: boolean;
}

export const AdminContainer = styled.View`
  flex: 1;
  background-color: ${ColorMap['grey'].dark};
`;

export const AdminAccordion = styled.Pressable<AdminAccordionProps>`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px;
  padding-vertical: 16px;
  gap: 16px;
  background-color: ${({ $isSettingOpen }) =>
    $isSettingOpen ? ColorMap['grey'].dark : ColorMap['blue'].dark};
`;

export const AdminText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${ColorMap['white'].main};
`;

export const MembersContainer = styled(AdminContainer)``;

export const MembersAccordion = styled(AdminAccordion)``;

export const Accordion = styled.Pressable<AccordionProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 20px;
  margin-horizontal: 10px;
  margin-top: ${({ $marginTop }) => $marginTop ?? 20}px;
  background-color: ${ColorMap['blue'].dark};
  padding-vertical: 8px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
`;

export const RefreshButtonContainer = styled.View`
  width: 49%;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${ColorMap['white'].main};
  font-weight: bold;
`;

export const ToggleWrapper = styled.View`
  width: 49%;
`;

export const ToggleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 24px;
  padding-right: 8px;
  gap: 4px;
  border-radius: 5px;
  background-color: ${ColorMap['green'].dark};
`;

export const ToggleText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${ColorMap['white'].main};
`;

export const AdminSettings = styled.View`
  padding-bottom: 20px;
`;
