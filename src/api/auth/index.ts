import { Alert } from 'react-native';
import { router } from 'expo-router';

import { supabase } from '../../lib/supabase';

interface SignUpWithEmailAndPW {
  email: string;
  password: string;
  name: string;
}

interface SignInWithEmailAndPW {
  email: string;
  password: string;
}

export const signUpWithEmailAndPW = async ({
  email,
  password,
  name,
}: SignUpWithEmailAndPW) => {
  const { error, data: createdUser } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) Alert.alert('Fail to sign up. Please try again.');

  if (createdUser && createdUser.user) {
    const { error, data: updatedUserName } = await supabase
      .from('profiles')
      .upsert({ name })
      .eq('id', createdUser.user.id)
      .single();

    if (error) {
      console.log('Fail to add user name:', error.message);
    }
  }
};

export const signInWithEmailAndPW = async ({
  email,
  password,
}: SignInWithEmailAndPW) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) Alert.alert(error.message);
};

export const signOut = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) {
    Alert.alert('Error logging out:', error.message);
  }
  Alert.alert('Logged out');
  router.push('/(auth)');
};
