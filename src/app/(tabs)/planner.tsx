import PlannerFormCard from "@/components/planner/PlannerFormCard";
import PlannerHeroImage from "@/components/planner/PlannerHeroImage";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

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
  iconColor: string;
  label: string;
  labelColor?: string;
  value: number;
};

const StatCard = ({
  icon,
  iconBg,
  iconColor,
  label,
  labelColor = "text-green-700/70",
  value,
}: StatCardProps) => (
  <View
    className="flex-1 rounded-2xl border border-green-800/10 bg-white p-3.5"
    style={cardShadow}
  >
    <View
      className="h-7 w-7 items-center justify-center rounded-full"
      style={{ backgroundColor: iconBg }}
    >
      <FontAwesome6 name={icon} size={11} color={iconColor} />
    </View>
    <Text
      className={`mt-2 text-[11px] font-semibold uppercase tracking-[1px] ${labelColor}`}
    >
      {label}
    </Text>
    <Text className="mt-0.5 text-2xl font-extrabold text-green-900">
      {value}
    </Text>
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
    <View className="bg-green-50 pt-6 flex-1">
      <TabScreenBackground />

      <KeyboardAwareScrollView
        bottomOffset={80}
        contentContainerStyle={{ padding: 20, gap: 14 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-background py-4"
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

        <View>
          <Text className="mb-2 ml-1 text-xs font-semibold uppercase tracking-[1px] text-green-800/50">
            Overview
          </Text>
          <View className="flex-row gap-3">
            <StatCard
              icon="clipboard-list"
              iconBg="#dcfce7"
              iconColor="#166534"
              label="Pending"
              value={pendingCount}
            />
            <StatCard
              icon="bolt"
              iconBg="#fee2e2"
              iconColor="#dc2626"
              label="High"
              labelColor="text-red-500/80"
              value={highPriorityCount}
            />
            <StatCard
              icon="layer-group"
              iconBg="#dcfce7"
              iconColor="#166534"
              label="Units"
              value={totalQuantity}
            />
          </View>
        </View>

        <PlannerHeroImage />

        <PlannerFormCard />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default PlannerScreen;
