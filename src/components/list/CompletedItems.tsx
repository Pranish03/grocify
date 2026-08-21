import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore();
  const completedItems = items.filter((item) => item.purchased);

  if (!completedItems.length) return null;

  return (
    <View className="mt-3 rounded-3xl border border-green-800/50 bg-green-100 p-4">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-green-800">
        Completed
      </Text>

      {completedItems.map((item) => (
        <View
          key={item.id}
          className="mt-3 flex-row items-center justify-between rounded-2xl border border-green-800/50 bg-green-50 px-3 py-2"
        >
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => togglePurchased(item.id)}
              className="h-6 w-6 items-center justify-center rounded-full bg-green-700"
            >
              <FontAwesome6 name="check" size={12} color="#ffffff" />
            </Pressable>
            <Text className="text-base text-green-900 line-through">
              {item.name}
            </Text>
          </View>

          <Pressable
            onPress={() => removeItem(item.id)}
            className="h-8 w-8 items-center justify-center rounded-xl bg-red-100"
          >
            <FontAwesome6 name="trash" size={12} color="#d45f58" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};
export default CompletedItems;
