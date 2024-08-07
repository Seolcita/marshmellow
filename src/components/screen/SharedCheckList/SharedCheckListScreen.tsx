import { Alert, Switch } from 'react-native';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { View } from '../../Themed';
import { Category } from '../../../types';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as s from './SharedCheckListScreen.styles';
import * as S from '../CheckList/CheckListScreen.styles';
import { useAuth } from '../../../providers/AuthProvider';
import { useSharedCategories } from '../../../api/shared-category';
import InvitationStatus from '../../composite/invitation/InvitationStatusList';
import SharedCategories from '../../composite/shared-category/SharedCategories';
import { useMySharedCheckListForAdmin } from '../../../api/my-shared-check-list';
import CreateInvitationForm from '../../composite/invitation/CreateInvitationForm';
import CheckListSkeleton from '../../composite/skeleton/check-list/CheckListSkeleton';
import AccordionSkeletons from '../../composite/skeleton/Accordion/AccordionSkeletons';
import ClearAllCheckBoxModal from '../../composite/shared-check-list/ClearAllCheckBoxModal';
import ClearAllAssigneeModal from '../../composite/shared-check-list/ClearAllAssigneeModal';
import InvitationAcceptedMembers from '../../composite/invitation/InvitationAcceptedMembers';
import CreateSharedCategoryModal from '../../composite/shared-category/CreateSharedCategoryModal';
import IconButton from '../../atomic/icon-button/IconButton';

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
    useState(false);
  const [isAdminSettingOpen, setIsAdminSettingOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [isClearCheckListModalOpen, setIsClearCheckListModalOpen] =
    useState(false);
  const [isClearAssigneesModalOpen, setIsClearAssigneesModalOpen] =
    useState(false);
  const [sharedCheckListName, setSharedCheckListName] = useState('');
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [isExistingCategoriesLoading, setIsExistingCategoriesLoading] =
    useState(true);
  const [isSettingOpen, setIsSettingOpen] = useState(true);

  const { session } = useAuth();
  const userId = session?.user.id;
  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const {
    data: adminInfo,
    error: fetchingAdminInfoError,
    isLoading: isAdminInfoLoading,
  } = useMySharedCheckListForAdmin({ id, userId });

  const {
    data: existSharedCategories,
    error: fetchingExistSharedCategoriesError,
    isLoading: isExistSharedCategoriesLoading,
  } = useSharedCategories(id);

  useEffect(() => {
    if (adminInfo?.isAdmin) {
      setIsAdmin(adminInfo.isAdmin);
      setSharedCheckListName(adminInfo.name);
    }
    if (!isAdminInfoLoading) {
      setIsAdminLoading(false);
    }
  }, [adminInfo]);

  useEffect(() => {
    if (existSharedCategories) {
      setCategories(existSharedCategories);
    }
    if (!isExistSharedCategoriesLoading) {
      setIsExistingCategoriesLoading(false);
    }
  }, [existSharedCategories]);

  return (
    <>
      <Stack.Screen
        options={{
          title: sharedCheckListName
            ? sharedCheckListName
            : 'Shared Check List Detail',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      {userId && (
        <S.ScrollViewContainer>
          {isAdmin && (
            <s.AdminContainer>
              <s.AdminAccordion
                onPress={() => setIsSettingOpen((prev) => !prev)}
                $isSettingOpen={isSettingOpen}
              >
                <s.AdminText>Invitations & Settings</s.AdminText>
                <FontAwesome
                  name={isSettingOpen ? 'caret-up' : 'caret-down'}
                  size={24}
                  color='white'
                />
              </s.AdminAccordion>
              {!isAdminLoading && isSettingOpen && (
                <>
                  <s.Accordion
                    onPress={() => setIsCreateInvitationOpen((prev) => !prev)}
                  >
                    <s.Text>Create Invitation</s.Text>
                    <FontAwesome
                      name={isCreateInvitationOpen ? 'caret-up' : 'caret-down'}
                      size={24}
                      color='white'
                    />
                  </s.Accordion>
                  {isCreateInvitationOpen && (
                    <CreateInvitationForm
                      inviterId={userId}
                      sharedCheckListName={sharedCheckListName}
                      sharedCheckListId={id}
                    />
                  )}
                  <s.Accordion
                    $marginTop={isCreateInvitationOpen ? 48 : 0}
                    onPress={() =>
                      setIsInvitationStatusListOpen((prev) => !prev)
                    }
                  >
                    <s.Text>Invitation Status</s.Text>

                    <FontAwesome
                      name={
                        isInvitationStatusListOpen ? 'caret-up' : 'caret-down'
                      }
                      size={24}
                      color='white'
                    />
                  </s.Accordion>
                  {isInvitationStatusListOpen && (
                    <InvitationStatus sharedCheckListId={id} />
                  )}

                  <s.Accordion
                    $marginTop={isInvitationStatusListOpen ? 48 : 0}
                    onPress={() => setIsAdminSettingOpen((prev) => !prev)}
                  >
                    <s.Text>Admin Settings</s.Text>

                    <FontAwesome
                      name={
                        isInvitationStatusListOpen ? 'caret-up' : 'caret-down'
                      }
                      size={24}
                      color='white'
                    />
                  </s.Accordion>
                  {isAdminSettingOpen && (
                    <s.AdminSettings
                      style={{ paddingHorizontal: 20, marginBottom: 20 }}
                    >
                      <Button
                        text='Clear all Checkbox'
                        onPress={() => {
                          setIsClearCheckListModalOpen(true);
                        }}
                        borderRadius={5}
                        bgColor={ColorMap['white'].main}
                        textColor={ColorMap['grey'].dark}
                        marginVertical={8}
                      />
                      <Button
                        text='Clear all Assignee'
                        onPress={() => setIsClearAssigneesModalOpen(true)}
                        borderRadius={5}
                        bgColor={ColorMap['white'].main}
                        textColor={ColorMap['grey'].dark}
                        marginVertical={8}
                      />
                    </s.AdminSettings>
                  )}
                </>
              )}

              {isAdminLoading && <AccordionSkeletons />}
            </s.AdminContainer>
          )}
          {!isAdmin && !isAdminLoading && (
            <s.MembersContainer>
              <s.MembersAccordion
                onPress={() => setIsMembersOpen((prev) => !prev)}
                $isSettingOpen={isMembersOpen}
              >
                <s.Text>Members</s.Text>
                <FontAwesome
                  name={isMembersOpen ? 'caret-up' : 'caret-down'}
                  size={24}
                  color='white'
                />
              </s.MembersAccordion>
              {isMembersOpen && !isAdminLoading && (
                <InvitationAcceptedMembers sharedCheckListId={id} />
              )}
            </s.MembersContainer>
          )}

          <S.ContentsContainer>
            <s.ToggleWrapper>
              <s.ToggleContainer>
                <s.ToggleText>Check Mode</s.ToggleText>
                <Switch
                  trackColor={{
                    false: ColorMap['grey'].light,
                    true: ColorMap['blue'].extraLight,
                  }}
                  thumbColor={
                    !isEditMode ? ColorMap['blue'].dark : ColorMap['grey'].main
                  }
                  ios_backgroundColor='#3e3e3e'
                  onValueChange={() => setIsEditMode((prev) => !prev)}
                  value={!isEditMode}
                />
              </s.ToggleContainer>
            </s.ToggleWrapper>

            {categories && !isExistingCategoriesLoading ? (
              <SharedCategories
                categories={categories}
                sharedCheckListId={id}
                isEditMode={isEditMode}
                isClearCheckList={isClearCheckList}
                setIsClearCheckList={setIsClearCheckList}
              />
            ) : (
              <CheckListSkeleton />
            )}
          </S.ContentsContainer>
        </S.ScrollViewContainer>
      )}

      <IconButton
        icon={
          <FontAwesome5 name='plus' size={16} color={ColorMap['grey'].dark} />
        }
        text='Add Category'
        hasShadow
        onPress={() => setIsCreateCategoryModalOpen(true)}
      />

      <CreateSharedCategoryModal
        isModalOpen={isCreateCategoryModalOpen}
        setIsModalOpen={setIsCreateCategoryModalOpen}
        sharedCheckListId={id}
      />

      <ClearAllCheckBoxModal
        sharedCheckListid={id}
        isClearAllCheckBoxModalOpen={isClearCheckListModalOpen}
        setIsClearAllCheckBoxModalOpen={setIsClearCheckListModalOpen}
        isClearCheckList={isClearCheckList}
        setIsClearCheckList={setIsClearCheckList}
      />

      <ClearAllAssigneeModal
        sharedCheckListid={id}
        isClearAllAssigneeModalOpen={isClearAssigneesModalOpen}
        setIsClearAllCheckBoxModalOpen={setIsClearAssigneesModalOpen}
      />
    </>
  );
};

export default SharedCheckListScreen;
