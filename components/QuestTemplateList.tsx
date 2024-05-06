import { useTheme } from "@react-navigation/native";
import { useAtom } from "jotai";
import { StyleSheet } from "react-native";

import QuestTemplateItem from "@/components/QuestTemplateItem";
import { Text, View } from "@/components/Themed";
import { questTemplatesAtom } from "@/stores/questTemplate";

const QuestTemplateList = () => {
  const { colors } = useTheme();

  const [questTemplates] = useAtom(questTemplatesAtom);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <Text style={styles.title}>Quest Templates</Text>
      {questTemplates.map((questTemplate) => (
        <QuestTemplateItem
          key={questTemplate.id}
          questTemplate={questTemplate}
        />
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

export default QuestTemplateList;
