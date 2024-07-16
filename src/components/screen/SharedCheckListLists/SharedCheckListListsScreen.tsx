import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, ScrollView } from 'react-native';

import {
  MySharedCheckList,
  useMySharedCheckList,
} from '../../../api/my-shared-check-list';
import Button from '../../atomic/button/Button';
import { useAuth } from '../../../providers/AuthProvider';
import * as S from './SharedCheckListListsScreen.styles';
import SharedCheckListFormModal from '../../composite/create-shared-check-list/SharedCheckListFormModal';

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

  const { data, error } = useMySharedCheckList(userId);

  useEffect(() => {
    data && setMySharedCheckList(data);
  }, [mySharedCheckList, data]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.Container>
      {/* // TODO: Update UI */}

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
        }}
      >
        {mySharedCheckList?.map((list) => (
          <Pressable
            onPress={() =>
              router.push(`/(user)/check-list/shared/${list.sharedCheckListId}`)
            }
          >
            <S.MySharedCheckListTile>
              <S.Text>{list.name}</S.Text>
              <MaterialIcons
                name='keyboard-arrow-right'
                size={24}
                color='black'
              />
            </S.MySharedCheckListTile>
          </Pressable>
        ))}
      </ScrollView>

      <SharedCheckListFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </S.Container>
  );
};

export default SharedCheckListListsScreen;
