import * as S from './MainCheckListScreen.styles';
import ImageTile from '../../atomic/image-tile/ImageTile';

export const MainCheckListScreen = () => {
  return (
    <S.Container>
      <ImageTile
        title='My Check List'
        pushTo='/(user)/check-list/mine'
        imageSource={require('../../../../assets/images/check-list.png')}
      />
      <ImageTile
        title='Shared Check List'
        pushTo='/(user)/check-list/shared'
        imageSource={require('../../../../assets/images/check-list.png')}
        bgColor='green'
      />
      <ImageTile
        title='Invitations'
        pushTo='/(user)/check-list/invitations'
        imageSource={require('../../../../assets/images/check-list.png')}
        bgColor='red'
      />
      <ImageTile
        title='Park Passes'
        pushTo='/(user)/check-list/park-pass'
        imageSource={require('../../../../assets/images/check-list.png')}
        bgColor='yellow'
      />
    </S.Container>
  );
};

export default MainCheckListScreen;
