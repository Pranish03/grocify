import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function InsightsStatsSection() {
  const { items } = useGroceryStore();

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.purchased).length;
  const pendingItems = totalItems - completedItems;

  const completionRate = totalItems
    ? Math.round((completedItems / totalItems) * 100)
    : 0;

  const cardShadow = {
    shadowColor: "#14532d",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  };

  return (
    <>
      <View className="flex-row gap-3">
        <View
          className="flex-1 rounded-3xl border border-green-800/10 bg-white p-4"
          style={cardShadow}
        >
          <View className="h-8 w-8 items-center justify-center rounded-xl bg-amber-500">
            <FontAwesome6 name="clock" size={16} color="#fff" />
          </View>
          <Text className="mt-3 text-xs uppercase tracking-[1px] text-green-700/60">
            Pending
          </Text>
          <Text className="mt-1 text-3xl font-extrabold text-green-900">
            {pendingItems}
          </Text>
        </View>

        <View
          className="flex-1 rounded-3xl border border-green-800/10 bg-white p-4"
          style={cardShadow}
        >
          <View className="h-8 w-8 items-center justify-center rounded-xl bg-green-800">
            <FontAwesome6 name="check" size={16} color="#fff" />
          </View>
          <Text className="mt-3 text-xs uppercase tracking-[1px] text-green-700/60">
            Completed
          </Text>
          <Text className="mt-1 text-3xl font-extrabold text-green-900">
            {completedItems}
          </Text>
        </View>

        <View
          className="flex-1 rounded-3xl border border-green-800/10 bg-white p-4"
          style={cardShadow}
        >
          <View className="h-8 w-8 items-center justify-center rounded-xl bg-green-600">
            <FontAwesome6 name="layer-group" size={16} color="#fff" />
          </View>
          <Text className="mt-3 text-xs uppercase tracking-[1px] text-green-700/60">
            Total
          </Text>
          <Text className="mt-1 text-3xl font-extrabold text-green-900">
            {totalItems}
          </Text>
        </View>
      </View>

      <View
        className="rounded-3xl border border-green-800/10 bg-white p-4"
        style={cardShadow}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-green-900">
            Completion rate
          </Text>
          <Text className="text-sm font-semibold text-green-700">
            {completionRate}%
          </Text>
        </View>
        <View className="mt-3 h-3 overflow-hidden rounded-full bg-green-100">
          <View
            className="h-3 rounded-full bg-green-600"
            style={{ width: `${Math.max(2, completionRate)}%` }}
          />
        </View>
      </View>
    </>
  );
}
