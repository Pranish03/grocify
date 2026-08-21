import CompletedItems from "@/components/list/CompletedItems";
import ListHeroCard from "@/components/list/ListHeroCard";
import PendingItemCard from "@/components/list/PendingItemCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

export default function ListScreen() {
  const { items } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased);

  return (
    <ScrollView
      className="flex-1 bg-green-50 p-[20px] pt-12"
      showsVerticalScrollIndicator={false}
    >
      <TabScreenBackground />

      <ListHeroCard />

      <View className="flex-row items-center justify-between px-1 mt-5 mb-2">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-green-800">
          Shopping items
        </Text>
        <Text className="text-sm font-medium text-green-700">
          {pendingItems.length} active
        </Text>
      </View>

      <View className="mb-20">
        {pendingItems.length ? (
          pendingItems.map((item) => (
            <PendingItemCard key={item.id} item={item} />
          ))
        ) : (
          <View className="items-center rounded-3xl border border-dashed border-green-800/20 bg-white/60 py-10 px-6">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <FontAwesome6 name="basket-shopping" size={18} color="#166534" />
            </View>
            <Text className="mt-3 text-base font-semibold text-green-900">
              Your list is empty
            </Text>
            <Text className="mt-1 text-center text-sm text-green-800/60">
              Add items to start building your grocery run.
            </Text>
          </View>
        )}

        <CompletedItems />
      </View>
    </ScrollView>
  );
}
