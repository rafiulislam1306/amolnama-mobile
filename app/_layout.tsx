import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { useAppInit } from "../src/hooks/useAppInit";
import { useAppStore } from "../src/store/useAppStore";

export default function RootLayout() {
  const isReady = useAppInit();
  const user = useAppStore((state) => state.user);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;

    // Check if we are currently inside the (tabs) folder
    const inTabsGroup = segments[0] === "(tabs)";

    if (!user && inTabsGroup) {
      // Not logged in? Go to login.
      router.replace("/login");
    } else if (user && !inTabsGroup) {
      // Logged in? Go to the POS.
      router.replace("/(tabs)");
    }
  }, [user, isReady, segments]);

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-600">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}