import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

const PlannerHeroImage = () => {
  return (
    <View
      className="overflow-hidden rounded-3xl bg-white"
      style={{
        shadowColor: "#14532d",
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
      }}
    >
      <Image
        source={require("../../../assets/images/hero.png")}
        className="h-56 w-full"
        resizeMode="cover"
      />

      <LinearGradient
        pointerEvents="none"
        colors={[
          "rgba(5, 46, 22, 0.35)",
          "transparent",
          "transparent",
          "rgba(5, 46, 22, 0.7)",
        ]}
        locations={[0, 0.28, 0.55, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <View className="absolute bottom-0 left-0 right-0 flex-row items-center gap-2 p-4">
        <View className="h-7 w-7 items-center justify-center rounded-full bg-white/20 border border-white/30">
          <FontAwesome6 name="cart-shopping" size={11} color="#f0fdf4" />
        </View>
        <Text className="text-sm font-semibold text-green-50">
          Fresh picks, planned ahead.
        </Text>
      </View>
    </View>
  );
};

export default PlannerHeroImage;
