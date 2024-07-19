import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Invitation } from '../../../types';
import ColorMap from '../../../styles/Color';
import * as S from './InvitationTile.styles';
import { useHideInvitation } from '../../../api/invitation';

interface InvitationTileProps {
  invitation: Invitation;
  userId: string;
}

const InvitationTile = ({ invitation }: InvitationTileProps) => {
  const { mutate: hideInvitation } = useHideInvitation(
    invitation.sharedCheckListId
  );

  const handleDelete = () => {
    invitation.id && hideInvitation(invitation.id);
  };

  return (
    <S.InvitationTile>
      <S.Title>{invitation.sharedCheckListName}</S.Title>
      <Pressable onPress={handleDelete}>
        <MaterialCommunityIcons
          name='delete-forever-outline'
          size={28}
          color={ColorMap['red'].dark}
        />
      </Pressable>
    </S.InvitationTile>
  );
};

export default InvitationTile;
