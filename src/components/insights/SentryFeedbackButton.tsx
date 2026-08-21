import { FontAwesome6 } from "@expo/vector-icons";
import * as Sentry from "@sentry/react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SentryFeedbackButton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        right: 16,
        zIndex: 50,
        bottom: insets.bottom + 90,
      }}
    >
      <Pressable
        onPress={() => Sentry.showFeedbackWidget()}
        className="flex-row items-center gap-2 rounded-full border border-green-800/10 bg-white px-4 py-3 active:opacity-90"
        style={{
          shadowColor: "#14532d",
          shadowOpacity: 0.15,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }}
      >
        <FontAwesome6 name="comment-dots" size={14} color="#166534" />
        <Text className="text-sm font-semibold text-green-900">Feedback</Text>
      </Pressable>
    </View>
  );
};
export default SentryFeedbackButton;
