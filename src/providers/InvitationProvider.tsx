import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Invitation, InvitationStatus } from '../types';
import { supabase } from '../lib/supabase';

type InvitationContextType = {
  invitations: Invitation[] | null;
  hasPendingInvitations: boolean;
  numPendingInvitations: number;
};

const InvitationContext = createContext<InvitationContextType>({
  invitations: null,
  hasPendingInvitations: false,
  numPendingInvitations: 0,
});

export const InvitationProvider = ({ children }: PropsWithChildren) => {
  const [invitations, setInvitations] = useState<Invitation[] | null>(null);
  const [hasPendingInvitations, setHasPendingInvitations] = useState(false);
  const [numPendingInvitations, setNumPendingInvitations] = useState(0);

  useEffect(() => {
    const fetchInvitations = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        const { error, data: invitationsInfo } = await supabase
          .from('invitation')
          .select('*')
          .eq('invitee_email', session.user.email);

        if (invitationsInfo) {
          const invitations: Invitation[] = invitationsInfo.map((info) => {
            return {
              id: info.id,
              inviterId: info.inviter_id,
              inviteeEmail: info.invitee_email,
              inviteeName: info.invitee_name,
              sharedCheckListId: info.shared_check_list_id,
              sharedCheckListName: info.shared_check_list_name,
              status: info.status,
              isHidden: info.is_hidden,
            };
          });

          setInvitations(invitations);

          const pendingInvitations = invitations?.filter(
            (invitation) => invitation.status === InvitationStatus.PENDING
          );

          if (pendingInvitations.length > 0) {
            setHasPendingInvitations(true);
            setNumPendingInvitations(pendingInvitations.length);
          }
        }
      }
    };

    fetchInvitations();
  }, []);

  return (
    <InvitationContext.Provider
      value={{ invitations, hasPendingInvitations, numPendingInvitations }}
    >
      {children}
    </InvitationContext.Provider>
  );
};

export default InvitationProvider;

export const useInvitation = () => useContext(InvitationContext);
