import { useEffect, useState } from 'react';

import { useInvitationWithSharedCheckListId } from '../../../api/invitation';
import * as S from './InvitationStatusList.styles';
import InvitationStatusItem from './InvitationStatusItem';
import { Invitation } from '../../../types';

interface InvitationStatusProps {
  sharedCheckListId: number;
}

const InvitationStatusList = ({ sharedCheckListId }: InvitationStatusProps) => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const { data: invitationInfo, error } =
    useInvitationWithSharedCheckListId(sharedCheckListId);

  useEffect(() => {
    if (invitationInfo) {
      setInvitations(invitationInfo);
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
