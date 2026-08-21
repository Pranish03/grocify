import useSocialAuth from "@/hooks/useSocialAuth";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isGithubClicked = loadingStrategy === "oauth_github";

  const isLoading = isGoogleClicked || isGithubClicked;

  return (
    <SafeAreaView className="flex-1 bg-green-800" edges={["top"]}>
      {/* Decorative background blobs */}
      <View className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-green-50/10" />
      <View className="absolute right-[-80px] top-36 h-72 w-72 rounded-full bg-green-50/10" />
      <View className="absolute left-10 top-52 h-16 w-16 rounded-full bg-green-50/[0.06]" />

      <View className="px-6 pt-10">
        {/* Logo mark */}
        <View className="self-center h-14 w-14 items-center justify-center rounded-2xl bg-green-50/15 border border-green-50/20">
          <FontAwesome name="shopping-basket" size={24} color="#dcfce7" />
        </View>

        <Text className="mt-4 text-center text-5xl font-extrabold tracking-tight text-green-100 uppercase font-mono">
          Grocify
        </Text>

        <Text className="mt-1 text-center text-[14px] text-green-100/70">
          Plan smarter. Shop happier.
        </Text>

        <View
          className="mt-6 rounded-[30px] border border-green-100/20 bg-green-100/10 p-3"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
          }}
        >
          <Image
            source={require("../../../assets/images/auth.png")}
            style={{ width: "100%", height: 230, resizeMode: "contain" }}
          />
        </View>
      </View>

      <View
        className="mt-6 flex-1 rounded-t-[36px] bg-green-50 px-6 pb-8 pt-7"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: -4 },
        }}
      >
        <View className="self-center rounded-full bg-green-200 px-3 py-1">
          <Text className="text-sm font-semibold uppercase tracking-[1px] text-green-900">
            Welcome Back
          </Text>
        </View>

        <Text className="mt-2.5 text-center text-sm leading-6 text-green-800/80 px-2">
          Choose a social provider and jump right into your personalized grocery
          experience
        </Text>

        <View className="mt-7 gap-3">
          <Pressable
            className={`h-14 flex-row items-center rounded-2xl border border-green-800/15 bg-white px-4 active:opacity-80 ${
              isLoading ? "opacity-60" : ""
            }`}
            style={{
              shadowColor: "#14532d",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 1,
            }}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_google")}
          >
            <View>
              {isGoogleClicked ? (
                <ActivityIndicator size="small" color="#14532d" />
              ) : (
                <Image
                  source={require("../../../assets/images/google.png")}
                  className="h-[20px] w-[20px]"
                />
              )}
            </View>
            <Text className="ml-3 flex-1 text-[15px] font-semibold text-green-900">
              {isGoogleClicked ? "Connecting..." : "Continue with Google"}
            </Text>
            {!isGoogleClicked && (
              <FontAwesome name="angle-right" size={18} color="#14532d" />
            )}
          </Pressable>

          <Pressable
            className={`h-14 flex-row items-center rounded-2xl border border-green-800/15 bg-white px-4 active:opacity-80 ${
              isLoading ? "opacity-60" : ""
            }`}
            style={{
              shadowColor: "#14532d",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 1,
            }}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_github")}
          >
            <View>
              {isGithubClicked ? (
                <ActivityIndicator size="small" color="#14532d" />
              ) : (
                <FontAwesome name="github" size={22} color="#111" />
              )}
            </View>
            <Text className="ml-3 flex-1 text-[15px] font-semibold text-green-900">
              {isGithubClicked ? "Connecting..." : "Continue with GitHub"}
            </Text>
            {!isGithubClicked && (
              <FontAwesome name="angle-right" size={18} color="#14532d" />
            )}
          </Pressable>
        </View>

        <Text className="mt-5 text-center text-xs leading-5 text-green-800/60 px-4">
          By continuing, you agree to our Terms and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}
