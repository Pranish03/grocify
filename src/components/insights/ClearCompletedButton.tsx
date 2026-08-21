import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export default function ClearCompletedButton() {
  const { items, clearPurchased } = useGroceryStore();
  const hasCompleted = items.some((item) => item.purchased);

  return (
    <Pressable
      className={`flex-row items-center justify-center gap-2 rounded-2xl py-3.5 active:opacity-90 ${
        hasCompleted ? "bg-green-800" : "bg-green-800/20"
      }`}
      style={
        hasCompleted
          ? {
              shadowColor: "#14532d",
              shadowOpacity: 0.2,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
            }
          : undefined
      }
      onPress={clearPurchased}
      disabled={!hasCompleted}
    >
      <FontAwesome6
        name="broom"
        size={13}
        color={hasCompleted ? "#f0fdf4" : "#7a9386"}
      />
      <Text
        className={`text-center text-base font-semibold ${
          hasCompleted ? "text-green-50" : "text-green-800/50"
        }`}
      >
        Clear completed items
      </Text>
    </Pressable>
  );
}
