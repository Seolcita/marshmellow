import { ScrollView } from 'react-native';

import * as S from './MainScreen.styles';

const MainScreen = () => {
  return (
    <S.Container>
      <ScrollView
        style={{ padding: 0, margin: 0, width: '100%' }}
        overScrollMode='auto'
        showsVerticalScrollIndicator={false}
      >
        <S.ImageContainer>
          <S.ImageBackground
            source={require('../../../../assets/images/main-screen.png')}
          />
        </S.ImageContainer>
      </ScrollView>
    </S.Container>
  );
};

export default MainScreen;
