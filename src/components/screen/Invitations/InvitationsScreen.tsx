import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import * as S from './InvitationsScreen.styles';
import { useAuth } from '../../../providers/AuthProvider';
import { Invitation, InvitationStatus } from '../../../types';
import * as s from '../SharedCheckList/SharedCheckListScreen.styles';
import {
  useInvitationSubscription,
  useInvitationWithUserEmail,
} from '../../../api/invitation';
import InvitationTile from '../../composite/invitation/InvitationTile';
import TileSkeletons from '../../composite/skeleton/tiles/TileSkeletons';
import PendingInvitationTile from '../../composite/invitation/PendingInvitationTile';

export const InvitationsScreen = () => {
  const [myInvitations, setMyInvitations] = useState<Invitation[]>([]);
  const [isPendingOpen, setIsPendingOpen] = useState(true);
  const [isAcceptedOpen, setIsAcceptedOpen] = useState(true);
  const [isRejectedOpen, setIsRejectedOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
    isLoading: isMyInvitationListLoading,
    isError,
  } = useInvitationWithUserEmail(userEmail);

  const invitationSubscription = useInvitationSubscription(userEmail);

  useEffect(() => {
    if (myInvitationList) {
      setMyInvitations(myInvitationList);
    }

    if (!isMyInvitationListLoading) {
      setIsLoading(false);
    }
  }, [myInvitationList, isMyInvitationListLoading]);

  useEffect(() => {
    return () => {
      invitationSubscription.unsubscribe();
    };
  }, []);

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
        <s.Text>Pending Invitations</s.Text>
        <FontAwesome
          name={isPendingOpen ? 'caret-up' : 'caret-down'}
          size={24}
          color='white'
        />
      </s.Accordion>
      <S.TileContainer>
        {!isLoading &&
          isPendingOpen &&
          pending.length > 0 &&
          pending.map((invitation) => (
            <PendingInvitationTile
              key={invitation.id}
              invitation={invitation}
              userId={userId}
            />
          ))}
        {!isLoading && isPendingOpen && pending.length === 0 && (
          <S.NoMatchingResultText>
            No pending invitations
          </S.NoMatchingResultText>
        )}
        {isLoading && isPendingOpen && (
          <S.SkeletonContainer>
            <TileSkeletons />
          </S.SkeletonContainer>
        )}
      </S.TileContainer>

      <s.Accordion
        $marginTop={isPendingOpen ? 48 : 0}
        onPress={() => setIsAcceptedOpen((prev) => !prev)}
      >
        <s.Text>Accepted Invitations</s.Text>
        <FontAwesome
          name={isAcceptedOpen ? 'caret-up' : 'caret-down'}
          size={24}
          color='white'
        />
      </s.Accordion>
      <S.TileContainer>
        {!isLoading &&
          isAcceptedOpen &&
          accepted.map((invitation) => (
            <InvitationTile
              key={invitation.id}
              invitation={invitation}
              userId={userId}
            />
          ))}
        {!isLoading && isAcceptedOpen && accepted.length === 0 && (
          <S.NoMatchingResultText>
            No accepted invitations
          </S.NoMatchingResultText>
        )}
        {isLoading && isAcceptedOpen && (
          <S.SkeletonContainer>
            <TileSkeletons />
          </S.SkeletonContainer>
        )}
      </S.TileContainer>

      <s.Accordion
        $marginTop={isAcceptedOpen ? 48 : 0}
        onPress={() => setIsRejectedOpen((prev) => !prev)}
      >
        <s.Text>Rejected Invitations</s.Text>
        <FontAwesome
          name={isRejectedOpen ? 'caret-up' : 'caret-down'}
          size={24}
          color='white'
        />
      </s.Accordion>
      <S.TileContainer>
        {!isLoading &&
          isRejectedOpen &&
          rejected.map((invitation) => (
            <InvitationTile
              key={invitation.id}
              invitation={invitation}
              userId={userId}
            />
          ))}
        {!isLoading && isRejectedOpen && rejected.length === 0 && (
          <S.NoMatchingResultText>
            No rejected invitations
          </S.NoMatchingResultText>
        )}
        {isLoading && isRejectedOpen && (
          <S.SkeletonContainer>
            <TileSkeletons />
          </S.SkeletonContainer>
        )}
      </S.TileContainer>
    </>
  );
};
