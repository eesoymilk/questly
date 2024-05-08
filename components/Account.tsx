import { Button, Input } from "@rneui/themed";
import { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { supabase } from "@/db/supabase";
import useAuth from "@/hooks/useAuth";

const profileTableName = "profiles";

const Account = () => {
  const { session, profile, loading, updateProfile } = useAuth();

  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setAvatarUrl(profile.avatar_url);
    }
  }, [session, profile]);

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Input
          label="Avatar URL"
          value={avatarUrl || ""}
          onChangeText={(text) => setAvatarUrl(text)}
        />
      </View>

      <View style={[styles.verticallySpaced]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() => updateProfile({ username, avatar_url: avatarUrl })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});

export default Account;
