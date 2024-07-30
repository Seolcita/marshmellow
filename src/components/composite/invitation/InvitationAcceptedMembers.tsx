import { useEffect, useState } from 'react';

import { Invitation } from '../../../types';
import * as S from './InvitationAcceptedMembers.styles';
import MemberSkeletons from '../skeleton/members/MemberSkeletons';
import { useInvitationAcceptedMembers } from '../../../api/invitation';

interface InvitationAcceptedMemebersProps {
  sharedCheckListId: number;
}

const InvitationAcceptedMembers = ({
  sharedCheckListId,
}: InvitationAcceptedMemebersProps) => {
  const [members, setMembers] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: invitationAcceptedMembers,
    error,
    isLoading: isMemberLoading,
  } = useInvitationAcceptedMembers(sharedCheckListId);

  useEffect(() => {
    if (invitationAcceptedMembers) {
      setMembers(invitationAcceptedMembers);
    }
    if (!isMemberLoading) {
      setIsLoading(false);
    }
  }, [isMemberLoading, invitationAcceptedMembers]);

  return (
    <S.Container>
      {!isLoading ? (
        members.map((member) => <S.Name>{member.inviteeName}</S.Name>)
      ) : (
        <MemberSkeletons />
      )}
    </S.Container>
  );
};

export default InvitationAcceptedMembers;
