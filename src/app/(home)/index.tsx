import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Link href={"/(auth)/sign-in"}>Sign in</Link>
    </SafeAreaView>
  );
}
