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
    <View
      className="rounded-3xl bg-green-800 p-5"
      style={{
        shadowColor: "#14532d",
        shadowOpacity: 0.25,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-green-100/70">
          Today
        </Text>
        <View className="rounded-full bg-white/15 px-3 py-1">
          <Text className="text-xs font-bold text-green-100">
            {completionRate}% done
          </Text>
        </View>
      </View>

      <Text className="mt-1 text-3xl font-extrabold text-green-100">
        Your Grocery Board
      </Text>

      <Text className="mt-1 text-sm text-green-100/70">
        {items.length
          ? `${pendingCount} pending · ${completedCount} completed`
          : "Nothing on your list yet"}
      </Text>

      <View className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
        <View
          className="h-2 rounded-full bg-green-300"
          style={{ width: `${completionRate}%` }}
        />
      </View>
    </View>
  );
};

export default ListHeroCard;
