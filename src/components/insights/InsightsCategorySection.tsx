import { useGroceryStore } from "@/store/grocery-store";
import { Text, View } from "react-native";

const categoryColors: Record<string, string> = {
  Produce: "#4ade80",
  Dairy: "#60a5fa",
  Bakery: "#fb923c",
  Pantry: "#a78bfa",
  Snacks: "#f472b6",
};

export default function InsightsCategorySection() {
  const { items } = useGroceryStore();

  const total = items.length;
  const categories = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});
  const categoryEntries = Object.entries(categories).sort(
    (a, b) => b[1] - a[1],
  );

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
          Items by category
        </Text>
        <Text className="text-xs uppercase tracking-[1px] text-green-700/60">
          {categoryEntries.length} groups
        </Text>
      </View>

      {categoryEntries.map(([category, count]) => {
        const widthPercent = total
          ? Math.max(10, Math.round((count / total) * 100))
          : 10;
        return (
          <View key={category} className="mt-3">
            <View className="mb-1 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <View
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: categoryColors[category] ?? "#8aa397",
                  }}
                />
                <Text className="text-sm font-medium text-green-900">
                  {category}
                </Text>
              </View>
              <Text className="text-sm text-green-700/70">{count}</Text>
            </View>
            <View className="h-2 overflow-hidden rounded-full bg-green-100">
              <View
                className="h-2 rounded-full"
                style={{
                  width: `${widthPercent}%` as `${number}%`,
                  backgroundColor: categoryColors[category] ?? "#8aa397",
                }}
              />
            </View>
          </View>
        );
      })}

      {categoryEntries.length === 0 ? (
        <View className="mt-3 rounded-2xl bg-green-50 px-4 py-3">
          <Text className="text-sm text-green-700/70">
            Add items to reveal your category mix.
          </Text>
        </View>
      ) : null}
    </View>
  );
}
