import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/db/supabase";
import { sessionAtom } from "@/stores/session";
import { Alert } from "react-native";
import { Session } from "@supabase/supabase-js";

interface Profile {
  username: string;
  avatar_url: string;
}

const profileTableName = "profiles";

class NoSessionError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NoSessionError.prototype);
    this.name = "NoSessionError";
  }
}

const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ username: "", avatar_url: "" });

  const updateProfile = async ({ username, avatar_url }: Profile) => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from(profileTableName).upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getSupabaseSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      const { data: listenerData } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        },
      );

      return listenerData.subscription.unsubscribe;
    };
    getSupabaseSession().then((unsubscribe) => {
      return unsubscribe;
    });
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        if (!session?.user) throw new NoSessionError("No user on the session!");

        const { data, error, status } = await supabase
          .from(profileTableName)
          .select(`username, avatar_url`)
          .eq("id", session?.user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setProfile(data);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "NoSessionError") {
          Alert.alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (session) getProfile();
  }, [session]);

  return { session, profile, loading, updateProfile };
};

export default useAuth;
