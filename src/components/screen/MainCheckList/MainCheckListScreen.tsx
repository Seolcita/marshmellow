import * as S from './MainCheckListScreen.styles';
import ImageTile from '../../atomic/image-tile/ImageTile';
import { ScrollView } from 'react-native';

export const MainCheckListScreen = () => {
  return (
    <ScrollView
      style={{ padding: 0, margin: 0, width: '100%', marginTop: 10 }}
      overScrollMode='auto'
      showsVerticalScrollIndicator={false}
    >
      <S.Container>
        <ImageTile
          title='My Check List'
          pushTo='/(user)/check-list/mine'
          imageSource={require('../../../../assets/images/tent.png')}
          imgWidth={200}
          imgHeight={200}
          absBottom={-70}
          absRight={-38}
        />
        <ImageTile
          title='Shared Check List'
          pushTo='/(user)/check-list/shared'
          imageSource={require('../../../../assets/images/camper.png')}
          bgColor='green'
          imgWidth={180}
          imgHeight={160}
          absBottom={-55}
          absRight={-35}
        />
        <ImageTile
          title='Invitations'
          pushTo='/(user)/check-list/invitations'
          imageSource={require('../../../../assets/images/campfire.png')}
          bgColor='red'
          imgWidth={150}
          imgHeight={130}
          absBottom={-30}
          absRight={-20}
        />
        <ImageTile
          title='Park Passes'
          pushTo='/(user)/check-list/park-pass'
          imageSource={require('../../../../assets/images/park.png')}
          bgColor='yellow'
          imgWidth={130}
          imgHeight={140}
          absBottom={-30}
          absRight={-20}
        />
      </S.Container>
    </ScrollView>
  );
};

export default MainCheckListScreen;
