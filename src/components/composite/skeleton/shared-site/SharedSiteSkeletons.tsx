import SharedSiteTileSkeleton from '../../../atomic/skeleton/shared-site/SharedSiteTileSkeleton';
import * as S from './SharedSiteSkeletons.styles';

const SharedSiteSkeletons = () => {
  return (
    <S.SkeletonContainer>
      <SharedSiteTileSkeleton />
      <SharedSiteTileSkeleton />
      <SharedSiteTileSkeleton />
      <SharedSiteTileSkeleton />
    </S.SkeletonContainer>
  );
};

export default SharedSiteSkeletons;
