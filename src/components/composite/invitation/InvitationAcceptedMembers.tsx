import { useEffect, useState } from 'react';

import { Invitation } from '../../../types';
import * as S from './InvitationAcceptedMembers.styles';
import { useInvitationAcceptedMembers } from '../../../api/invitation';

interface InvitationAcceptedMemebersProps {
  sharedCheckListId: number;
}

const InvitationAcceptedMembers = ({
  sharedCheckListId,
}: InvitationAcceptedMemebersProps) => {
  const [members, setMembers] = useState<Invitation[]>([]);

  const { data: invitationAcceptedMembers, error } =
    useInvitationAcceptedMembers(sharedCheckListId);

  useEffect(() => {
    if (invitationAcceptedMembers) {
      setMembers(invitationAcceptedMembers);
    }
  }, [members]);

  return (
    <S.Container>
      {members.map((member) => (
        <S.Name>{member.inviteeName}</S.Name>
      ))}
    </S.Container>
  );
};

export default InvitationAcceptedMembers;
