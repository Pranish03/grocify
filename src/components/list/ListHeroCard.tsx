import { useGroceryStore } from "@/store/grocery-store";
import { Text, View } from "react-native";

const ListHeroCard = () => {
  const { items } = useGroceryStore();

  const completedCount = items.filter((item) => item.purchased).length;
  const pendingCount = items.length - completedCount;
  const completionRate = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  return (
    <View className="rounded-3xl bg-green-800 p-5">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-green-100/70">
        Today
      </Text>

      <Text className="mt-1 text-3xl font-extrabold text-green-100">
        Your Grocery Board
      </Text>

      <Text className="mt-1 text-sm text-green-100/70">
        {pendingCount} pending · {completedCount} completed
      </Text>

      <View className="mt-4 overflow-hidden rounded-full bg-white/50">
        <View
          className="h-2 rounded-full bg-green-50"
          style={{ width: `${completionRate}%` }}
        />
      </View>
    </View>
  );
};

export default ListHeroCard;
