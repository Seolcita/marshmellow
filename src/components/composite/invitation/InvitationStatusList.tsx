import { useEffect, useState } from 'react';

import { useInvitationWithSharedCheckListId } from '../../../api/invitation';
import * as S from './InvitationStatusList.styles';
import InvitationStatusItem from './InvitationStatusItem';
import { Invitation } from '../../../types';
import { useAuth } from '../../../providers/AuthProvider';
import { Alert } from 'react-native';
import { router } from 'expo-router';

interface InvitationStatusProps {
  sharedCheckListId: number;
}

const InvitationStatusList = ({ sharedCheckListId }: InvitationStatusProps) => {
  const { session } = useAuth();
  const userEmail = session?.user.email;

  if (!userEmail) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const { data: invitationInfo, error } =
    useInvitationWithSharedCheckListId(sharedCheckListId);

  useEffect(() => {
    if (invitationInfo) {
      const filteredAdmin = invitationInfo.filter((invitation) => {
        return invitation.inviteeEmail !== userEmail;
      });

      setInvitations(filteredAdmin);
    }
  }, [invitationInfo]);

  return (
    <S.Container>
      {invitations?.map((invitation) => (
        <InvitationStatusItem key={invitation.id} invitation={invitation} />
      ))}
    </S.Container>
  );
};

export default InvitationStatusList;
