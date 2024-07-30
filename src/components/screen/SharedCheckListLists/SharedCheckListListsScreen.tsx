import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  MySharedCheckList,
  useDeleteMySharedCheckList,
  useMySharedCheckList,
} from '../../../api/my-shared-check-list';
import Button from '../../atomic/button/Button';
import * as S from './SharedCheckListListsScreen.styles';
import { useAuth } from '../../../providers/AuthProvider';
import SharedCheckListFormModal from '../../composite/create-shared-check-list/SharedCheckListFormModal';
import SharedCheckListTileSkeletons from '../../composite/skeleton/shared-check-list-tile/SharedCheckListTileSkeletons';

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
  const { mutate: deleteMySharedCheckList } =
    useDeleteMySharedCheckList(userId);

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
        <S.CreateButton>
          <Button
            text='+ Create'
            marginVertical={20}
            onPress={() => setIsModalOpen(true)}
            borderRadius={50}
            paddingVertical={15}
            width={120}
            textSize={18}
          />
        </S.CreateButton>

        <ScrollView
          style={{ padding: 0, margin: 0, width: '100%' }}
          overScrollMode='auto'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 2,
            flex: 1,
            marginBottom: 40,
          }}
        >
          {!isLoading && mySharedCheckList ? (
            mySharedCheckList.map((list) => (
              <S.MySharedCheckListTile>
                <Pressable
                  onPress={() =>
                    router.push(
                      `/(user)/check-list/shared/${list.sharedCheckListId}`
                    )
                  }
                >
                  <S.Text>{list.name}</S.Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    deleteMySharedCheckList(list.sharedCheckListId)
                  }
                >
                  <MaterialCommunityIcons
                    name='delete-forever-outline'
                    size={24}
                    color='black'
                  />
                </Pressable>
              </S.MySharedCheckListTile>
            ))
          ) : (
            <SharedCheckListTileSkeletons />
          )}
        </ScrollView>

        <SharedCheckListFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </S.Container>
    </>
  );
};

export default SharedCheckListListsScreen;
