import { Show, useClerk, useUser } from "@clerk/expo";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  return (
    <SafeAreaView>
      <Text>Welcome!</Text>

      <Show when="signed-in">
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Pressable onPress={() => signOut()}>
          <Text>Sign out</Text>
        </Pressable>
      </Show>
    </SafeAreaView>
  );
}
