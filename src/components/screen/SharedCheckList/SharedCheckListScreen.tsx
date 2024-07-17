import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { View } from '../../Themed';
import { Category } from '../../../types';
import ColorMap from '../../../styles/Color';
import * as S from '../CheckList/CheckListScreen.styles';
import * as s from './SharedCheckListScreen.styles';
import Button from '../../atomic/button/Button';
import { useCategories } from '../../../api/category';
import { useAuth } from '../../../providers/AuthProvider';
import { useClearCheckList } from '../../../api/check-list';
import AddSharedCategory from '../../composite/shared-category/AddSharedCategory';
import SharedCategories from '../../composite/shared-category/SharedCategories';
import {
  useMySharedCheckList,
  useMySharedCheckListForAdmin,
} from '../../../api/my-shared-check-list';
import CreateInvitationForm from '../../composite/invitation/CreateInvitationForm';
import InvitationStatus from '../../composite/invitation/InvitationStatusList';

interface SharedCheckListScreenProps {
  id: number;
}

const SharedCheckListScreen = ({ id }: SharedCheckListScreenProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isClearCheckList, setIsClearCheckList] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCreateInvitationOpen, setIsCreateInvitationOpen] = useState(false);
  const [isInvitationStatusListOpen, setIsInvitationStatusListOpen] =
    useState(true);
  const [sharedCheckListName, setSharedCheckListName] = useState('');

  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { data: adminInfo, error: fetchingAdminInfoError } =
    useMySharedCheckListForAdmin(id);

  const { error, data: existCategories } = useCategories(userId);
  const { mutate: clearCheckList } = useClearCheckList();

  useEffect(() => {
    if (adminInfo?.isAdmin) {
      setIsAdmin(adminInfo.isAdmin);
      setSharedCheckListName(adminInfo.name);
    }
  }, [existCategories]);

  useEffect(() => {
    if (existCategories) {
      const formattedCategories = existCategories.map((category) => ({
        name: category.name,
        id: category.id,
      }));
      setCategories(formattedCategories);
    }
  }, [existCategories]);

  const handleClearCheckList = () => {
    clearCheckList(userId);
  };

  return (
    <>
      {userId && (
        <S.ScrollViewContainer>
          <s.Accordion
            onPress={() => setIsCreateInvitationOpen((prev) => !prev)}
          >
            <s.CreaeteInvitationText>Create Invitation</s.CreaeteInvitationText>
            <FontAwesome
              name={isCreateInvitationOpen ? 'caret-up' : 'caret-down'}
              size={24}
              color='black'
            />
          </s.Accordion>

          {isAdmin && isCreateInvitationOpen && (
            <CreateInvitationForm
              inviterId={userId}
              sharedCheckListName={sharedCheckListName}
              sharedCheckListId={id}
            />
          )}

          <s.Accordion
            $marginTop={isCreateInvitationOpen ? 48 : 0}
            onPress={() => setIsInvitationStatusListOpen((prev) => !prev)}
          >
            <s.CreaeteInvitationText>Invitation Status</s.CreaeteInvitationText>

            <FontAwesome
              name={isCreateInvitationOpen ? 'caret-up' : 'caret-down'}
              size={24}
              color='black'
            />
          </s.Accordion>
          {isAdmin && isInvitationStatusListOpen && (
            <InvitationStatus sharedCheckListId={id} />
          )}
          <S.ContentsContainer>
            <AddSharedCategory userId={userId} />
            <S.ButtonsContainer>
              <View style={{ width: '49%' }}>
                <Button
                  text='Clear all Checkbox'
                  onPress={() => {
                    setIsClearCheckList((prev) => !prev);
                    handleClearCheckList();
                  }}
                  borderRadius={5}
                  bgColor={ColorMap['blue'].dark}
                  textColor={ColorMap['white'].main}
                />
              </View>
              <View style={{ width: '49%' }}>
                {isEditMode ? (
                  <Button
                    text='Check Mode'
                    onPress={() => setIsEditMode((prev) => !prev)}
                    borderRadius={5}
                    bgColor={ColorMap['blue'].dark}
                  />
                ) : (
                  <Button
                    text='Manage Mode'
                    onPress={() => setIsEditMode((prev) => !prev)}
                    borderRadius={5}
                    bgColor={ColorMap['blue'].main}
                  />
                )}
              </View>
            </S.ButtonsContainer>
            <SharedCategories
              categories={categories}
              userId={userId}
              isEditMode={isEditMode}
              isClearCheckList={isClearCheckList}
              setIsClearCheckList={setIsClearCheckList}
            />
          </S.ContentsContainer>
        </S.ScrollViewContainer>
      )}
    </>
  );
};

export default SharedCheckListScreen;
