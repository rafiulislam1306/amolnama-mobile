import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { useAppInit } from "../src/hooks/useAppInit";

export default function RootLayout() {
  const isReady = useAppInit();

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-blue-600">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}