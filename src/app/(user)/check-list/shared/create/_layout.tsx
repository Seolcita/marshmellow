import { Stack } from 'expo-router';

const CreateSharedCheckListLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CreateSharedCheckListLayout;
