import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider as JotaiProvider } from "jotai";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Auth from "@/components/Auth";
import useAuth from "@/hooks/useAuth";
import { theme } from "@/utils/theme";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayoutNav = () => (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="modal" options={{ presentation: "modal" }} />
  </Stack>
);

const RootLayout = () => {
  const { session } = useAuth();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <JotaiProvider>
          {session && session.user ? <RootLayoutNav /> : <Auth />}
        </JotaiProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
