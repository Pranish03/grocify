import useSocialAuth from "@/hooks/useSocialAuth";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isGithubClicked = loadingStrategy === "oauth_github";

  const isLoading = isGoogleClicked || isGithubClicked;

  return (
    <SafeAreaView className="flex-1 bg-green-800" edges={["top"]}>
      <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-green-50/10" />

      <View className="absolute right-[-74px] top-40 h-72 w-72 rounded-full bg-green-50/10" />

      <View className="px-6 pt-12">
        <Text className="text-center text-5xl font-extrabold tracking-tight text-green-100 uppercase font-mono">
          Grocify
        </Text>

        <Text className="text-center text-[14px] text-green-100/70">
          Plan smarter. shop happier
        </Text>

        <View className="mt-6 rounded-[30px] border border-green-100/20 bg-green-100/10 p-3">
          <Image
            source={require("../../../assets/images/auth.png")}
            style={{ width: "100%", height: 250, resizeMode: "contain" }}
          />
        </View>
      </View>

      <View className="mt-8 flex-1 rounded-t-[36px] bg-green-50 px-6 pb-8 pt-6">
        <View className="self-center rounded-full bg-green-200 px-3 py-1">
          <Text className="text-sm font-semibold uppercase tracking-[1px] text-green-900">
            Welcome Back
          </Text>
        </View>

        <Text className="mt-2 text-sm text-center leading-6 text-green-800">
          Choose a social provider and jump right into your personalized grocery
          experience
        </Text>

        <View className="mt-6">
          <Pressable
            className={`
              mb-3 h-14 flex-row items-center rounded-2xl border border-green-800/50 bg-green-50 px-4 active:opacity-90 
              ${isLoading ? "opacity-70" : ""} 
            `}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_google")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-green-50">
              <Image
                source={require("../../../assets/images/google.png")}
                className="h-[20px] w-[20px]"
              />
            </View>
            <Text className="ml-3 flex-1 text-lg font-semibold text-green-900">
              {isGoogleClicked
                ? "Connecting Google..."
                : "Continue with Google"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#14532d" />
          </Pressable>

          <Pressable
            className={`
              mb-3 h-14 flex-row items-center rounded-2xl border border-green-800/50 bg-green-50 px-4 active:opacity-90 
              ${isLoading ? "opacity-70" : ""} 
            `}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_github")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-green-50">
              <FontAwesome name="github" size={24} color="#111" />
            </View>
            <Text className="ml-3 flex-1 text-lg font-semibold text-green-900">
              {isGithubClicked
                ? "Connecting GitHub..."
                : "Continue with GitHub"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#14532d" />
          </Pressable>
        </View>

        <Text className="mt-3 text-center text-sm text-green-800">
          By continuing, you agree to our Terms and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}
