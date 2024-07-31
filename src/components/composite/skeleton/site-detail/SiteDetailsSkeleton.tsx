import { Skeleton } from '@rneui/themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import * as S from './SiteDetailsSkeleton.styles';

const SiteDetailsSkeleton = () => {
  return (
    <S.Container>
      <Skeleton height={200} width={360} animation='wave' />

      <S.SubjectContainer>
        <S.Subject>Review</S.Subject>
      </S.SubjectContainer>
      <S.ReviewContainer>
        <FontAwesome name='star-o' size={24} color='grey' />
        <FontAwesome name='star-o' size={24} color='grey' />
        <FontAwesome name='star-o' size={24} color='grey' />
        <FontAwesome name='star-o' size={24} color='grey' />
        <FontAwesome name='star-o' size={24} color='grey' />
      </S.ReviewContainer>

      <S.SubjectContainer>
        <S.Subject>Campsite Info</S.Subject>
      </S.SubjectContainer>
      <S.QnAContainer>
        <S.QnAContainer>
          <Skeleton height={20} width={20} />
          <S.QnAWrapper>
            <Skeleton height={24} width={200} animation='wave' />
            <Skeleton height={24} width={200} animation='wave' />
          </S.QnAWrapper>
        </S.QnAContainer>
      </S.QnAContainer>
      <S.QnAContainer>
        <S.QnAContainer>
          <Skeleton height={20} width={20} />
          <S.QnAWrapper>
            <Skeleton height={24} width={200} animation='wave' />
            <Skeleton height={24} width={200} animation='wave' />
          </S.QnAWrapper>
        </S.QnAContainer>
      </S.QnAContainer>
      <S.QnAContainer>
        <S.QnAContainer>
          <Skeleton height={20} width={20} />
          <S.QnAWrapper>
            <Skeleton height={24} width={200} animation='wave' />
            <Skeleton height={24} width={200} animation='wave' />
          </S.QnAWrapper>
        </S.QnAContainer>
      </S.QnAContainer>
    </S.Container>
  );
};

export default SiteDetailsSkeleton;
