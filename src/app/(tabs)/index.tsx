import CompletedItems from "@/components/list/CompletedItems";
import ListHeroCard from "@/components/list/ListHeroCard";
import PendingItemCard from "@/components/list/PendingItemCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { ScrollView, Text, View } from "react-native";

export default function ListScreen() {
  const { items } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased);

  return (
    <ScrollView
      className="flex-1 bg-green-50 p-[20px] pt-14"
      showsVerticalScrollIndicator={false}
    >
      <TabScreenBackground />

      <ListHeroCard />

      <View className="flex-row items-center justify-between px-1 mt-4 mb-2">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-green-800">
          Shopping items
        </Text>
        <Text className="text-sm text-green-800">
          {pendingItems.length} active
        </Text>
      </View>

      <View className="mb-20">
        {pendingItems.map((item) => (
          <PendingItemCard key={item.id} item={item} />
        ))}

        <CompletedItems />
      </View>
    </ScrollView>
  );
}
