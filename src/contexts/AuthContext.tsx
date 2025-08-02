import React from "react";
import { useContext, useState, createContext, ReactNode } from "react";
import { supabase } from "../../supabase";

type AuthContextType = {
  userId: string | null;
  signIn: (input: SignInInput) => void;
  signUp: (input: SignUpInput) => void;
  signOut: () => void;
};

type SignInInput = {
  email: string;
  password: string;
};
type SignUpInput = {
  name: string;
  email: string;
  password: string;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const signIn = async ({ email, password }: SignInInput) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    setUserId(data.user.id);
  };

  const signUp = async ({ name, email, password }: SignUpInput) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    const user = data.user;

    if (!user) {
      throw new Error("Error signing up, please try again.");
    }
    const { error: insertError } = await supabase
      .from("user_information")
      .insert([{ id: user.id, name }]);

    if (insertError) {
      throw new Error(insertError.message);
    }
    setUserId(user.id);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserId(null);
  };
  return (
    <AuthContext.Provider value={{ userId, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
