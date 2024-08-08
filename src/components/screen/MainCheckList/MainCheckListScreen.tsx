import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import {
  useInvitationSubscription,
  useInvitationWithUserEmail,
} from '../../../api/invitation';
import * as S from './MainCheckListScreen.styles';
import { InvitationStatus } from '../../../types';
import { useAuth } from '../../../providers/AuthProvider';
import ImageTile from '../../atomic/image-tile/ImageTile';

export const MainCheckListScreen = () => {
  const [hasPendingInvitations, setHasPendingInvitations] = useState(false);
  const [numPendingInvitations, setNumPendingInvitations] = useState(0);

  const { session } = useAuth();
  const userEmail = session?.user.email;

  if (!userEmail) {
    Alert.alert('Session is not valid, please login again');
    console.log('User not found');
    router.push('/(auth)/sign-in');
    return;
  }

  const { data: myInvitations, isError } =
    useInvitationWithUserEmail(userEmail);

  useEffect(() => {
    if (myInvitations) {
      const pendingInvitations = myInvitations?.filter(
        (invitation) => invitation.status === InvitationStatus.PENDING
      );

      if (pendingInvitations.length > 0) {
        setHasPendingInvitations(true);
        setNumPendingInvitations(pendingInvitations.length);
      }
    }
  }, [myInvitations]);

  const invitationSubscription = useInvitationSubscription(userEmail);

  useEffect(() => {
    return () => {
      invitationSubscription.unsubscribe();
    };
  }, [numPendingInvitations]);

  return (
    <ScrollView
      style={{ padding: 0, margin: 0, width: '100%', marginTop: 10 }}
      overScrollMode='auto'
      showsVerticalScrollIndicator={false}
    >
      <S.Container>
        <ImageTile
          title='My Check List'
          pushTo='/(user)/check-list/mine'
          imageSource={require('../../../../assets/images/tent.png')}
          imgWidth={200}
          imgHeight={200}
          absBottom={-70}
          absRight={-38}
        />
        <ImageTile
          title='Shared Check List'
          pushTo='/(user)/check-list/shared'
          imageSource={require('../../../../assets/images/camper.png')}
          bgColor='green'
          imgWidth={180}
          imgHeight={160}
          absBottom={-55}
          absRight={-35}
        />
        <ImageTile
          title='Invitations'
          pushTo='/(user)/check-list/invitations'
          imageSource={require('../../../../assets/images/campfire.png')}
          bgColor='red'
          imgWidth={150}
          imgHeight={130}
          absBottom={-30}
          absRight={-20}
          hasNotification={hasPendingInvitations}
          numNotification={numPendingInvitations}
        />
        <ImageTile
          title='Park Passes'
          pushTo='/(user)/check-list/park-pass'
          imageSource={require('../../../../assets/images/park.png')}
          bgColor='yellow'
          imgWidth={130}
          imgHeight={140}
          absBottom={-30}
          absRight={-20}
        />
      </S.Container>
    </ScrollView>
  );
};

export default MainCheckListScreen;
