import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';

import { Invitation } from '../../../types';
import * as S from './InvitationStatusList.styles';
import InvitationStatusItem from './InvitationStatusItem';
import { useAuth } from '../../../providers/AuthProvider';
import { useInvitationWithSharedCheckListId } from '../../../api/invitation';
import InvitationStatusSkeletons from '../skeleton/invitation-status/InvitationStatusSkeletons';

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
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: invitationInfo,
    error,
    isLoading: isInvitationLoading,
  } = useInvitationWithSharedCheckListId(sharedCheckListId);

  useEffect(() => {
    if (invitationInfo) {
      const filteredAdmin = invitationInfo.filter((invitation) => {
        return invitation.inviteeEmail !== userEmail;
      });

      setInvitations(filteredAdmin);
      setIsLoading(false);
    }
  }, [invitationInfo]);

  return (
    <S.Container>
      {!isLoading && invitations ? (
        invitations.map((invitation) => (
          <InvitationStatusItem key={invitation.id} invitation={invitation} />
        ))
      ) : (
        <InvitationStatusSkeletons />
      )}
    </S.Container>
  );
};

export default InvitationStatusList;
