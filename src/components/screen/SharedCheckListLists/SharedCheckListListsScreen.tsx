import { router } from 'expo-router';
import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import {
  MySharedCheckList,
  useMySharedCheckList,
} from '../../../api/my-shared-check-list';
import ColorMap from '../../../styles/Color';
import * as S from './SharedCheckListListsScreen.styles';
import { useAuth } from '../../../providers/AuthProvider';
import IconButton from '../../atomic/icon-button/IconButton';
import TileSkeletons from '../../composite/skeleton/tiles/TileSkeletons';
import SharedCheckListTile from '../../composite/shared-check-list/SharedCheckListTile';
import SharedCheckListFormModal from '../../composite/create-shared-check-list/SharedCheckListFormModal';
import { View } from '../../Themed';

const SharedCheckListListsScreen = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  if (!userId) {
    router.push('/(auth)/sign-in');
    return;
  }

  const [mySharedCheckList, setMySharedCheckList] = useState<
    MySharedCheckList[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    error,
    isLoading: isCheckListLoading,
  } = useMySharedCheckList(userId);

  useEffect(() => {
    data && setMySharedCheckList(data);
    if (!isCheckListLoading) {
      setIsLoading(false);
    }
  }, [data, isCheckListLoading]);

  return (
    <>
      <S.Header>
        <S.BackButton onPress={() => router.push('/(user)/check-list')}>
          <MaterialCommunityIcons name='arrow-left' size={24} color='black' />
        </S.BackButton>
        <S.Title>Shared Check List</S.Title>
      </S.Header>
      <S.Container>
        <ScrollView
          style={{ padding: 0, margin: 0, width: '100%', flex: 1 }}
          overScrollMode='auto'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 2,
            paddingBottom: 80,
          }}
        >
          {!isLoading && mySharedCheckList ? (
            mySharedCheckList.map((list) => (
              <SharedCheckListTile
                key={list.id}
                sharedCheckListId={list.sharedCheckListId}
                sharedChckListName={list.name}
                userId={userId}
              />
            ))
          ) : (
            <TileSkeletons />
          )}

          <SharedCheckListFormModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </ScrollView>
        <IconButton
          icon={
            <FontAwesome5 name='plus' size={16} color={ColorMap['grey'].dark} />
          }
          text='Create Shared Check List'
          hasShadow
          onPress={() => setIsModalOpen(true)}
        />
      </S.Container>
    </>
  );
};

export default SharedCheckListListsScreen;
