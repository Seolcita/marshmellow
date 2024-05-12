import { router } from 'expo-router';
import * as S from './CheckListCard.styles';
import { AntDesign } from '@expo/vector-icons';

const CheckListCard = () => {
  const handlePress = () => {
    router.push('/(user)/check-list');
  };

  return (
    <S.Container>
      <S.Contents onPress={handlePress}>
        <S.Text>Check List</S.Text>
        <AntDesign name='checksquareo' size={24} color='black' />
      </S.Contents>
    </S.Container>
  );
};

export default CheckListCard;
