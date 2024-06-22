import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import * as S from './CheckListCard.styles';

const CheckListCard = () => {
  const handlePress = () => {
    router.push('/(user)/check-list');
  };

  return (
    <S.Container onPress={handlePress}>
      <S.Contents>
        <AntDesign name='checksquareo' size={24} color='white' />
        <S.Text>Check List</S.Text>
      </S.Contents>
      <S.Image source={require('../../../../assets/images/check-list.png')} />
    </S.Container>
  );
};

export default CheckListCard;
