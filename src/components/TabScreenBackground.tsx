import { View } from "react-native";

export default function TabScreenBackground() {
  return (
    <>
      <View
        pointerEvents="none"
        className="absolute -left-24 top-[40px] h-64 w-64 rounded-full bg-green-500/20"
      />
      <View
        pointerEvents="none"
        className="absolute right-[-80px] top-[250px] h-72 w-72 rounded-full bg-green-500/20"
      />
      <View
        pointerEvents="none"
        className="absolute left-16 top-[300px] h-24 w-24 rounded-full bg-green-500/10"
      />
    </>
  );
}
