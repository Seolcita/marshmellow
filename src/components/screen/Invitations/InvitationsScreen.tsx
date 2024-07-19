import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import * as S from './InvitationsScreen.styles';
import { useAuth } from '../../../providers/AuthProvider';
import { Invitation, InvitationStatus } from '../../../types';
import * as s from '../SharedCheckList/SharedCheckListScreen.styles';
import { useInvitationWithUserEmail } from '../../../api/invitation';
import InvitationTile from '../../composite/invitation/InvitationTile';
import PendingInvitationTile from '../../composite/invitation/PendingInvitationTile';

export const InvitationsScreen = () => {
  const [myInvitations, setMyInvitations] = useState<Invitation[]>([]);
  const [isPendingOpen, setIsPendingOpen] = useState(true);
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(true);
  const [isRejectedOpen, setIsRejectedOpen] = useState(true);

  const { session } = useAuth();
  const userEmail = session?.user.email;
  const userId = session?.user.id;

  if (!userEmail || !userId) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const {
    data: myInvitationList,
    isLoading,
    isError,
  } = useInvitationWithUserEmail(userEmail);

  useEffect(() => {
    if (myInvitationList) {
      setMyInvitations(myInvitationList);
    }
  }, [myInvitationList]);

  const pending = myInvitations.filter(
    (invitation) => invitation.status === InvitationStatus.PENDING
  );
  const accepted = myInvitations.filter(
    (invitation) =>
      invitation.status === InvitationStatus.ACCEPTED &&
      invitation.isHidden === false
  );
  const rejected = myInvitations.filter(
    (invitation) =>
      invitation.status === InvitationStatus.REJECTED &&
      invitation.isHidden === false
  );

  return (
    <>
      <s.Accordion onPress={() => setIsPendingOpen((prev) => !prev)}>
        <s.CreaeteInvitationText>Pending Invitations</s.CreaeteInvitationText>
        <FontAwesome
          name={isPendingOpen ? 'caret-up' : 'caret-down'}
          size={24}
          color='black'
        />
      </s.Accordion>
      <S.TileContainer>
        {isPendingOpen &&
          pending.map((invitation) => (
            <PendingInvitationTile
              key={invitation.id}
              invitation={invitation}
              userId={userId}
            />
          ))}
      </S.TileContainer>

      <s.Accordion
        $marginTop={isPendingOpen ? 48 : 0}
        onPress={() => setIsAcceptedOpen((prev) => !prev)}
      >
        <s.CreaeteInvitationText>Accepted Invitations</s.CreaeteInvitationText>
        <FontAwesome
          name={isAcceptedOpen ? 'caret-up' : 'caret-down'}
          size={24}
          color='black'
        />
      </s.Accordion>
      <S.TileContainer>
        {isAcceptedOpen &&
          accepted.map((invitation) => (
            <InvitationTile
              key={invitation.id}
              invitation={invitation}
              userId={userId}
            />
          ))}
      </S.TileContainer>

      <s.Accordion
        $marginTop={isAcceptedOpen ? 48 : 0}
        onPress={() => setIsRejectedOpen((prev) => !prev)}
      >
        <s.CreaeteInvitationText>Rejected Invitations</s.CreaeteInvitationText>
        <FontAwesome
          name={isRejectedOpen ? 'caret-up' : 'caret-down'}
          size={24}
          color='black'
        />
      </s.Accordion>
      <S.TileContainer>
        {isRejectedOpen &&
          rejected.map((invitation) => (
            <InvitationTile
              key={invitation.id}
              invitation={invitation}
              userId={userId}
            />
          ))}
      </S.TileContainer>
    </>
  );
};
