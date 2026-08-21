import ListHeroCard from "@/components/list/ListHeroCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useClerk, useUser } from "@clerk/expo";
import { ScrollView } from "react-native";

export default function ListScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <ScrollView
      className="flex-1 bg-green-50 p-[20px] pt-14"
      showsVerticalScrollIndicator={false}
    >
      <TabScreenBackground />
      <ListHeroCard />
    </ScrollView>
  );
}
