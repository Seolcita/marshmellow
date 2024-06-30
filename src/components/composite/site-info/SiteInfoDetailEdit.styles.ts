import styled from 'styled-components/native';

import ColorMap from '../../../styles/Color';

export const SectionContainer = styled.View`
  background-color: ${ColorMap['white'].main};
  margin-top: 5px;
`;

export const UploadImageContainer = styled.View`
  align-items: center;
  margin-vertical: 30px;
`;

export const DefaultImage = styled.Image`
  width: 170px;
  height: 160px;
  margin-bottom: 20px;
`;

export const UploadedImage = styled.Image`
  width: 300px;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const UploadImageButton = styled.Pressable`
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  background-color: ${ColorMap['grey'].extraLight};
  padding: 10px;
  width: 200px;
  border-radius: 5px;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
