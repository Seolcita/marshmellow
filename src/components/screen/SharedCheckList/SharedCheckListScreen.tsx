import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { View } from '../../Themed';
import { Category } from '../../../types';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as s from './SharedCheckListScreen.styles';
import * as S from '../CheckList/CheckListScreen.styles';
import { useAuth } from '../../../providers/AuthProvider';
import { useSharedCategories } from '../../../api/shared-category';
import { useClearSharedCheckList } from '../../../api/shared-check-list-item';
import InvitationStatus from '../../composite/invitation/InvitationStatusList';
import SharedCategories from '../../composite/shared-category/SharedCategories';
import { useMySharedCheckListForAdmin } from '../../../api/my-shared-check-list';
import CreateInvitationForm from '../../composite/invitation/CreateInvitationForm';
import InvitationAcceptedMembers from '../../composite/invitation/InvitationAcceptedMembers';
import CreateSharedCategoryModal from '../../composite/shared-category/CreateSharedCategoryModal';

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
  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
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
    useMySharedCheckListForAdmin({ id, userId });

  const {
    data: existSharedCategories,
    error: fetchingExistSharedCategoriesError,
  } = useSharedCategories(id);
  const { mutate: clearCheckList } = useClearSharedCheckList();

  useEffect(() => {
    if (adminInfo?.isAdmin) {
      setIsAdmin(adminInfo.isAdmin);
      setSharedCheckListName(adminInfo.name);
    }
  }, [adminInfo]);

  useEffect(() => {
    if (existSharedCategories) {
      setCategories(existSharedCategories);
    }
  }, [existSharedCategories]);

  const handleClearCheckList = () => {
    clearCheckList(id);
  };

  return (
    <>
      {userId && (
        <S.ScrollViewContainer>
          {isAdmin && (
            <>
              <s.Accordion
                onPress={() => setIsCreateInvitationOpen((prev) => !prev)}
              >
                <s.CreaeteInvitationText>
                  Create Invitation
                </s.CreaeteInvitationText>
                <FontAwesome
                  name={isCreateInvitationOpen ? 'caret-up' : 'caret-down'}
                  size={24}
                  color='black'
                />
              </s.Accordion>
              {isCreateInvitationOpen && (
                <CreateInvitationForm
                  inviterId={userId}
                  sharedCheckListName={sharedCheckListName}
                  sharedCheckListId={id}
                />
              )}
            </>
          )}

          {isAdmin && (
            <>
              <s.Accordion
                $marginTop={isCreateInvitationOpen ? 48 : 0}
                onPress={() => setIsInvitationStatusListOpen((prev) => !prev)}
              >
                <s.CreaeteInvitationText>
                  Invitation Status
                </s.CreaeteInvitationText>

                <FontAwesome
                  name={isInvitationStatusListOpen ? 'caret-up' : 'caret-down'}
                  size={24}
                  color='black'
                />
              </s.Accordion>
              {isInvitationStatusListOpen && (
                <InvitationStatus sharedCheckListId={id} />
              )}
            </>
          )}

          {!isAdmin && (
            <s.Accordion onPress={() => setIsMembersOpen((prev) => !prev)}>
              <s.CreaeteInvitationText>Members</s.CreaeteInvitationText>
              <FontAwesome
                name={isMembersOpen ? 'caret-up' : 'caret-down'}
                size={24}
                color='black'
              />
            </s.Accordion>
          )}

          {!isAdmin && isMembersOpen && (
            <InvitationAcceptedMembers sharedCheckListId={id} />
          )}

          <S.ContentsContainer>
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
            {categories && (
              <SharedCategories
                categories={categories}
                sharedCheckListId={id}
                isEditMode={isEditMode}
                isClearCheckList={isClearCheckList}
                setIsClearCheckList={setIsClearCheckList}
              />
            )}
          </S.ContentsContainer>
        </S.ScrollViewContainer>
      )}
      <S.CreateCategoryStickyButton>
        <Button
          text='+  Add Category'
          onPress={() => setIsCreateCategoryModalOpen(true)}
          paddingVertical={16}
          paddingHorizontal={24}
        />
      </S.CreateCategoryStickyButton>
      <CreateSharedCategoryModal
        isModalOpen={isCreateCategoryModalOpen}
        setIsModalOpen={setIsCreateCategoryModalOpen}
        sharedCheckListId={id}
      />
    </>
  );
};

export default SharedCheckListScreen;
