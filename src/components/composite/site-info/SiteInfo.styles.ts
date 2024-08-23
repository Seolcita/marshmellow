import styled from 'styled-components/native';

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const AddSiteMessageContainer = styled.View`
  width: 94%;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-vertical: 24px;
  padding-horizontal: 20px;
  border-radius: 5px;
`;

export const AddSiteMessageTextTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const AddSiteMessageTextSubTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
  line-height: 20px;
`;

export const AddSiteMessageTextDescription = styled.Text`
  font-size: 16px;
  margin-bottom: 24px;
  line-height: 20px;
`;
