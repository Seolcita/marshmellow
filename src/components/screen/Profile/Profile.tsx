import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import * as S from './Profile.styles';
import { Profile } from '../../../types';
import { signOut } from '../../../api/auth';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import { useProfile } from '../../../api/profile';
import { useAuth } from '../../../providers/AuthProvider';
import EditNameModal from '../../composite/profile/EditNameModal';

const ProfileScreen = () => {
  const { session } = useAuth();
  const userId = session?.user?.id;

  if (!userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const [profile, setProfile] = useState<Profile | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: profileData, isLoading, isError } = useProfile(userId);

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    profileData && setProfile(profileData);
  }, [profileData, profile]);

  return (
    <>
      {userId && (
        <S.Container>
          <S.PersonalInfoContainer>
            <S.Section>
              <S.NameLabelContainer>
                <S.Label>Name</S.Label>
                <S.EditNameButton onPress={() => setIsModalOpen(true)}>
                  <AntDesign name='edit' size={24} color='black' />
                </S.EditNameButton>
              </S.NameLabelContainer>
              <S.ProfileText>{profile?.name ?? 'N/A'}</S.ProfileText>
            </S.Section>
            <S.Section>
              <S.Label>Email</S.Label>
              <S.ProfileText>{profile?.email}</S.ProfileText>
            </S.Section>
          </S.PersonalInfoContainer>
          <S.AuthContainer>
            <Button
              text='Sign Out'
              onPress={() => handleLogout()}
              bgColor={ColorMap['grey'].dark}
              marginVertical={10}
              borderRadius={5}
              paddingVertical={12}
            />
          </S.AuthContainer>
          <EditNameModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            userId={userId}
            initialValue={profile?.name}
          />
        </S.Container>
      )}
    </>
  );
};

export default ProfileScreen;
