import { ScrollView } from 'react-native';

import * as S from './MainScreen.styles';
import ParkPass from '../../../components/composite/park-pass/ParkPass';
import CheckListCard from '../../../components/composite/check-list/CheckListCard';

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
        <ParkPass />
        <CheckListCard />
      </ScrollView>
    </S.Container>
  );
};

export default MainScreen;
