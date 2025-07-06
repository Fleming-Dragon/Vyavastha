import SafeScreen from "@/components/SafeScreen";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeScreen>
  );
}
