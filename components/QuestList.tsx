import { useTheme } from "@react-navigation/native";
import { useAtom } from "jotai";
import { StyleSheet } from "react-native";

import QuestItem from "@/components/QuestItem";
import { Text, View } from "@/components/Themed";
import { questsAtom } from "@/stores";

const QuestList = () => {
  const { colors } = useTheme();

  const [quests] = useAtom(questsAtom);
  const completedQuests = quests.filter((quest) => quest.completed);
  const incompleteQuests = quests.filter((quest) => !quest.completed);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <Text style={styles.title}>Incomplete Quests</Text>
      {incompleteQuests.map((quest) => (
        <QuestItem key={quest.id} quest={quest} />
      ))}
      <Text style={styles.title}>Complete Quests</Text>
      {completedQuests.map((quest) => (
        <QuestItem key={quest.id} quest={quest} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default QuestList;
