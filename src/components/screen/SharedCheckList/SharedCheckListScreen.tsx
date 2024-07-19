import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { View } from '../../Themed';
import { Category } from '../../../types';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as s from './SharedCheckListScreen.styles';
import { useCategories } from '../../../api/category';
import * as S from '../CheckList/CheckListScreen.styles';
import { useAuth } from '../../../providers/AuthProvider';
import { useClearCheckList } from '../../../api/check-list';
import InvitationStatus from '../../composite/invitation/InvitationStatusList';
import SharedCategories from '../../composite/shared-category/SharedCategories';
import { useMySharedCheckListForAdmin } from '../../../api/my-shared-check-list';
import CreateInvitationForm from '../../composite/invitation/CreateInvitationForm';
import InvitationAcceptedMembers from '../../composite/invitation/InvitationAcceptedMembers';
import CreateCategoryModal from '../../composite/category/CreateCategoryModal';
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
          {isAdmin && isCreateInvitationOpen && (
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

              <CreateInvitationForm
                inviterId={userId}
                sharedCheckListName={sharedCheckListName}
                sharedCheckListId={id}
              />
            </>
          )}

          {isAdmin && isInvitationStatusListOpen && (
            <>
              <s.Accordion
                $marginTop={isCreateInvitationOpen ? 48 : 0}
                onPress={() => setIsInvitationStatusListOpen((prev) => !prev)}
              >
                <s.CreaeteInvitationText>
                  Invitation Status
                </s.CreaeteInvitationText>

                <FontAwesome
                  name={isCreateInvitationOpen ? 'caret-up' : 'caret-down'}
                  size={24}
                  color='black'
                />
              </s.Accordion>
              <InvitationStatus sharedCheckListId={id} />
            </>
          )}

          <s.Accordion onPress={() => setIsMembersOpen((prev) => !prev)}>
            <s.CreaeteInvitationText>Members</s.CreaeteInvitationText>
            <FontAwesome
              name={isMembersOpen ? 'caret-up' : 'caret-down'}
              size={24}
              color='black'
            />
          </s.Accordion>
          {!isAdmin && isMembersOpen && (
            <InvitationAcceptedMembers sharedCheckListId={id} />
          )}
          <S.ContentsContainer>
            {/* <AddSharedCategory userId={userId} /> TODO: Change this to Modal */}
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
        userId={userId}
      />
    </>
  );
};

export default SharedCheckListScreen;
