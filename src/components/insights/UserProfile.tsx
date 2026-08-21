import { useClerk, useUser } from "@clerk/expo";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const UserProfile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const displayName = user?.fullName || email?.split("@")[0];
  const initial = (displayName?.[0] ?? "?").toUpperCase();

  return (
    <View
      className="rounded-3xl bg-green-800 p-5"
      style={{
        shadowColor: "#14532d",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
      }}
    >
      <View className="flex-row items-center gap-3">
        <View className="size-12 items-center justify-center overflow-hidden rounded-xl bg-blue-600 border border-green-800/10">
          <Text className="text-3xl font-bold text-white">{initial}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xs uppercase tracking-[1px] text-green-100/70">
            Signed in as
          </Text>
          <Text
            className="mt-1 text-lg font-bold text-green-100"
            numberOfLines={1}
          >
            {displayName}
          </Text>
          <Text className="text-sm text-green-100/70" numberOfLines={1}>
            {email}
          </Text>
        </View>
        <Pressable
          onPress={() => signOut()}
          className="h-12 w-12 items-center justify-center rounded-xl bg-white/15 border border-white/20 active:bg-white/50"
          hitSlop={4}
        >
          <FontAwesome6 name="right-from-bracket" size={15} color="#f0fdf4" />
        </Pressable>
      </View>
    </View>
  );
};
export default UserProfile;
