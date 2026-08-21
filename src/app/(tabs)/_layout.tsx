import { useGroceryStore } from "@/store/grocery-store";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/build/native-tabs";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { loadItems } = useGroceryStore();

  useEffect(() => {
    loadItems();
  }, []);

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-green-50">
        <View className="flex-1" />
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <NativeTabs
      tintColor={"#15803d"}
      backgroundColor={"#f0fdf4"}
      shadowColor={"rgb(22 101 52 / 0.15)"}
      indicatorColor={"rgb(22 101 52 / 0.08)"}
      rippleColor={"rgb(22 101 52 / 0.08)"}
      iconColor={"#6b7280"}
      labelStyle={{ color: "#6b7280" }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: "list.bullet.clipboard",
            selected: "list.bullet.clipboard.fill",
          }}
          md="list"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="planner">
        <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "calendar", selected: "calendar.circle.fill" }}
          md="event"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "chart.bar", selected: "chart.bar.fill" }}
          md="analytics"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
