import { supabase } from '../../lib/supabase';

interface ResetPasswordForEmail {
  email: string;
  redirectTo: string;
}

export const resetPasswordForEmail = async ({
  email,
  redirectTo,
}: ResetPasswordForEmail) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  return { data, error };
};
