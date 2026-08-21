import { useClerk, useUser } from "@clerk/expo";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

const UserProfile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const displayName = user?.fullName || email?.split("@")[0];
  const initial = (displayName?.[0] ?? "?").toUpperCase();

  return (
    <View
      className="rounded-3xl border border-green-800/10 bg-white p-4"
      style={{
        shadowColor: "#14532d",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 1,
      }}
    >
      <View className="flex-row items-center gap-3">
        <View className="size-12 items-center justify-center overflow-hidden rounded-full bg-green-100">
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text className="text-lg font-bold text-green-800">{initial}</Text>
          )}
        </View>
        <View className="flex-1">
          <Text className="text-xs uppercase tracking-[1px] text-green-700/60">
            Signed in as
          </Text>
          <Text
            className="mt-1 text-lg font-bold text-green-900"
            numberOfLines={1}
          >
            {displayName}
          </Text>
          <Text className="text-sm text-green-700/70" numberOfLines={1}>
            {email}
          </Text>
        </View>
        <Pressable
          onPress={() => signOut()}
          className="h-9 w-9 items-center justify-center rounded-xl bg-red-50 active:bg-red-100"
          hitSlop={4}
        >
          <FontAwesome6 name="right-from-bracket" size={13} color="#dc2626" />
        </Pressable>
      </View>
    </View>
  );
};
export default UserProfile;
