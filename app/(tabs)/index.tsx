import { StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NewQuestTemplate, QuestTemplateList } from "@/components";

const HomeTabScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
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
