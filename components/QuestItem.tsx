import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { useAtom } from "jotai";
import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { toggleQuestAtom } from "@/stores";
import type { Quest } from "@/types";

const QuestItem = ({ quest }: { quest: Quest }) => {
  const { colors } = useTheme();

  const [, toggleQuest] = useAtom(toggleQuestAtom);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.primary }}>
      <Text style={styles.title}>{quest.title}</Text>
      <Text style={styles.description}>{quest.description}</Text>
      <Checkbox
        style={styles.checkbox}
        value={quest.completed}
        onValueChange={() => toggleQuest(quest.id)}
        color={quest.completed ? "#4630EB" : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
  checkbox: {
    margin: 8,
  },
});

export default QuestItem;
