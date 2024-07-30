import { Skeleton } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';

import * as S from './InvitationStatusSkeletons.styles';

const InvitationStatusSkeletons = () => {
  return (
    <S.Container>
      <S.TileContainer>
        <S.InviteeContainer>
          <S.InviteeInfoContainer>
            <Skeleton width={100} height={20} />
            <Skeleton width={50} height={20} />
          </S.InviteeInfoContainer>
          <Skeleton width={200} height={20} />
        </S.InviteeContainer>
        <AntDesign name='delete' size={24} color='grey' />
      </S.TileContainer>
      <S.TileContainer>
        <S.InviteeContainer>
          <S.InviteeInfoContainer>
            <Skeleton width={100} height={20} />
            <Skeleton width={50} height={20} />
          </S.InviteeInfoContainer>
          <Skeleton width={200} height={20} />
        </S.InviteeContainer>
        <AntDesign name='delete' size={24} color='grey' />
      </S.TileContainer>
    </S.Container>
  );
};

export default InvitationStatusSkeletons;
