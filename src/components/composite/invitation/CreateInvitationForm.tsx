import { useState } from 'react';

import Input from '../../atomic/input/Input';
import ColorMap from '../../../styles/Color';
import Button from '../../atomic/button/Button';
import * as S from './CreateInvitationForm.styles';
import { useInsertInvitation } from '../../../api/invitation';

interface CreateInvitationFormProps {
  inviterId: string;
  sharedCheckListId: number;
  sharedCheckListName: string;
}

const CreateInvitationForm = ({
  inviterId,
  sharedCheckListId,
  sharedCheckListName,
}: CreateInvitationFormProps) => {
  const [inputs, setInputs] = useState({
    email: {
      value: '',
      isValid: true,
      error: '',
    },
    name: {
      value: '',
      isValid: true,
      error: '',
    },
  });

  const { mutate: insertInvitation } = useInsertInvitation({
    sharedCheckListId,
    sharedCheckListName,
  });

  const handleInputChange = (inputIdentifier: string, enteredValue: string) => {
    setInputs((prevState) => ({
      ...prevState,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  const handleSubmit = async () => {
    const rexec = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isEmailValid =
      inputs.email.value.length > 0 && rexec.test(inputs.email.value);
    const isNameValid = inputs.name.value.length > 1;

    if (!isEmailValid || !isNameValid) {
      setInputs((prevState) => ({
        email: {
          value: prevState.email.value,
          isValid: isEmailValid,
          error: !isEmailValid ? 'Please enter a valid email address.' : '',
        },
        name: {
          value: prevState.name.value,
          isValid: isNameValid,
          error: !isNameValid ? 'Name must be at least 2 characters long.' : '',
        },
      }));

      return;
    }

    setInputs((prevState) => ({
      email: {
        value: prevState.email.value,
        isValid: isEmailValid,
        error: '',
      },
      name: {
        value: prevState.name.value,
        isValid: isNameValid,
        error: '',
      },
    }));

    // Send invitation
    insertInvitation({
      inviterId,
      inviteeEmail: inputs.email.value,
      inviteeName: inputs.name.value,
      sharedCheckListName,
      sharedCheckListId,
    });

    setInputs({
      email: {
        value: '',
        isValid: true,
        error: '',
      },
      name: {
        value: '',
        isValid: true,
        error: '',
      },
    });
  };

  return (
    <S.Container>
      <Input
        label='Email'
        labelColor={ColorMap['white'].main}
        isValid={inputs.email.isValid}
        textInputConfig={{
          value: inputs.email.value.trim(),
          onChangeText: handleInputChange.bind(this, 'email'),
          placeholder: 'john@gmail.com',
          placeholderTextColor: ColorMap['grey'].light,
          keyboardType: 'email-address',
        }}
        error={inputs.email.error}
        borderColor={ColorMap['white'].main}
      />
      <Input
        label='Invitee Name'
        labelColor={ColorMap['white'].main}
        isValid={inputs.name.isValid}
        textInputConfig={{
          value: inputs.name.value.trim(),
          onChangeText: handleInputChange.bind(this, 'name'),
          placeholder: 'john',
          placeholderTextColor: ColorMap['grey'].light,
          keyboardType: 'default',
        }}
        error={inputs.name.error}
        borderColor={ColorMap['white'].main}
      />
      <Button
        onPress={handleSubmit}
        text='Invite'
        borderRadius={5}
        textColor={ColorMap['grey'].dark}
        bgColor={ColorMap['white'].main}
        disabled={!!inputs.email.error || !!inputs.name.error}
      />
    </S.Container>
  );
};

export default CreateInvitationForm;
