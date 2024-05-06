import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import type { QuestTemplate } from "@/types";

const QuestTemplateItem = ({
  questTemplate,
}: {
  questTemplate: QuestTemplate;
}) => {
  const { colors } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.primary }}>
      <Text style={styles.title}>{questTemplate.title}</Text>
      <Text style={styles.description}>{questTemplate.description}</Text>
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

export default QuestTemplateItem;
