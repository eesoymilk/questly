import { Text } from "@rneui/themed";
import { StyleSheet, ScrollView } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NewQuestTemplate, QuestTemplateList } from "@/components";
import Account from "@/components/Account";
import useSession from "@/hooks/useAuth";

const HomeTabScreen = () => {
  // const insets = useSafeAreaInsets();
  const session = useSession();

  return (
    <ScrollView
      style={{
        ...styles.container,
        // paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        // paddingLeft: insets.left,
        // paddingRight: insets.right,
      }}>
      <Account />
      <NewQuestTemplate />
      <QuestTemplateList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeTabScreen;
