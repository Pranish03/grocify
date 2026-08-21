import ClearCompletedButton from "@/components/insights/ClearCompletedButton";
import InsightsCategorySection from "@/components/insights/InsightsCategorySection";
import InsightsPrioritySection from "@/components/insights/InsightsPrioritySection";
import InsightsStatsSection from "@/components/insights/InsightsStatsSection";
import SentryFeedbackButton from "@/components/insights/SentryFeedbackButton";
import UserProfile from "@/components/insights/UserProfile";
import TabScreenBackground from "@/components/TabScreenBackground";
import { ScrollView, View } from "react-native";

const InsightsScreen = () => {
  return (
    <View className="flex-1 bg-green-50 pt-10">
      <TabScreenBackground />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 14 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <UserProfile />
        <InsightsStatsSection />
        <InsightsCategorySection />
        <InsightsPrioritySection />
        <ClearCompletedButton />
      </ScrollView>

      <SentryFeedbackButton />
    </View>
  );
};

export default InsightsScreen;
