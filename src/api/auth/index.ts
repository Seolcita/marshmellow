import { Alert } from 'react-native';
import { router } from 'expo-router';
import { makeRedirectUri } from 'expo-auth-session';

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

interface ResetPasswordForEmail {
  email: string;
  redirectTo: string;
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

export const sendMagicLink = async (email: string) => {
  const redirectTo = makeRedirectUri();

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    Alert.alert('Error:', 'Failed to send magic link. Please try again.');
  }

  if (data) {
    Alert.alert(
      'Success:',
      'The link sent to your email. Please check your email to login.'
    );
  }
};

export const signOut = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) {
    Alert.alert('Error logging out:', error.message);
  }
  Alert.alert('Logged out');
  router.push('/(auth)/sign-in');
};

export const resetPasswordForEmail = async ({
  email,
  redirectTo,
}: ResetPasswordForEmail) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  return { data, error };
};

export const updatePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.log('Error updating password:', error.message);
    Alert.alert(
      'Error',
      'Password reset failed. Please request a reset password link again.'
    );
  } else {
    Alert.alert('Success', 'Password has been reset');
    router.push('/(user)/shared-site-info');
  }
};
