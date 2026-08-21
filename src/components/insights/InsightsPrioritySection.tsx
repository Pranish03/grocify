import { useGroceryStore } from "@/store/grocery-store";
import { Text, View } from "react-native";

export default function InsightsPrioritySection() {
  const { items } = useGroceryStore();
  const highPriority = items.filter(
    (item) => item.priority === "high" && !item.purchased,
  ).length;

  const highPriorityTone =
    highPriority === 0
      ? "Everything critical is covered."
      : "Handle these first for a smoother trip.";

  return (
    <View
      className="rounded-3xl border border-green-800/10 bg-white p-4"
      style={{
        shadowColor: "#14532d",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-green-900">
          High priority remaining
        </Text>
        <View
          className={`rounded-full px-3 py-1 ${
            highPriority ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <Text
            className={`text-xs font-bold uppercase ${
              highPriority ? "text-red-600" : "text-green-700"
            }`}
          >
            {highPriority ? "Action" : "Clear"}
          </Text>
        </View>
      </View>
      <Text className="mt-1 text-3xl font-extrabold text-green-900">
        {highPriority}
      </Text>
      <Text className="mt-1 text-sm text-green-700/70">{highPriorityTone}</Text>
    </View>
  );
}
