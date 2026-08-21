import { useClerk } from "@clerk/expo";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InsightsScreen() {
  const { signOut } = useClerk();

  return (
    <SafeAreaView>
      <Text>Insights Screen</Text>
      <Pressable onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}
