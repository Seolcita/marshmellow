import styled from 'styled-components/native';

interface AccordionProps {
  $marginTop?: number;
}

export const Accordion = styled.Pressable<AccordionProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 20px;
  margin-horizontal: 20px;
  margin-top: ${({ $marginTop }) => $marginTop ?? 20}px;
`;

export const CreaeteInvitationText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
