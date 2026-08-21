import PlannerFormCard from "@/components/planner/PlannerFormCard";
import PlannerHeroImage from "@/components/planner/PlannerHeroImage";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

const cardShadow = {
  shadowColor: "#14532d",
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 1,
};

type StatCardProps = {
  icon: React.ComponentProps<typeof FontAwesome6>["name"];
  iconBg: string;
  label: string;
  value: number;
};

const StatCard = ({ icon, iconBg, label, value }: StatCardProps) => (
  <View
    className="flex-1 rounded-3xl border border-green-800/10 bg-white p-4"
    style={cardShadow}
  >
    <View
      className="h-8 w-8 items-center justify-center rounded-xl"
      style={{ backgroundColor: iconBg }}
    >
      <FontAwesome6 name={icon} size={16} color="#fff" />
    </View>
    <Text className="mt-3 text-xs uppercase tracking-[1px] text-green-700/60">
      {label}
    </Text>
    <Text className="mt-1 text-3xl font-extrabold text-green-900">{value}</Text>
  </View>
);

const PlannerScreen = () => {
  const { items } = useGroceryStore();

  const pendingCount = items.filter((item) => !item.purchased).length;
  const highPriorityCount = items.filter(
    (item) => !item.purchased && item.priority === "high",
  ).length;
  const totalQuantity = items
    .filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View className="flex-1 bg-green-50 pt-10">
      <TabScreenBackground />

      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 14 }}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
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
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-green-100/70">
                Grocery planner
              </Text>
              <Text className="mt-1 text-3xl font-extrabold leading-9 text-green-100">
                Plan smarter, shop calmer.
              </Text>
              <Text className="mt-2 text-sm leading-5 text-green-100/70">
                Organize your next grocery run with categories, quantities, and
                priority in one place.
              </Text>
            </View>

            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/15 border border-white/20">
              <FontAwesome6
                name="wand-magic-sparkles"
                size={18}
                color="#f0fdf4"
              />
            </View>
          </View>
        </View>

        <View className="flex-row gap-3">
          <StatCard
            icon="clipboard-list"
            iconBg="#f59e0b"
            label="Pending"
            value={pendingCount}
          />
          <StatCard
            icon="bolt"
            iconBg="#dc2626"
            label="High"
            value={highPriorityCount}
          />
          <StatCard
            icon="layer-group"
            iconBg="#166534"
            label="Units"
            value={totalQuantity}
          />
        </View>

        <PlannerHeroImage />

        <PlannerFormCard />
      </ScrollView>
    </View>
  );
};

export default PlannerScreen;
