import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Input, Button } from "@rneui/themed";
import { useAtom } from "jotai";
import { View, StyleSheet } from "react-native";

import { QuestTemplate } from "@/model";
import {
  newQuestTemplateAtom,
  addQuestTemplateAtom,
} from "@/stores/questTemplate";

const NewQuestTemplate = () => {
  const db = useDatabase();
  const [newQuestTemplate, setNewQuestTemplate] = useAtom(newQuestTemplateAtom);
  const [, addQuestTemplate] = useAtom(addQuestTemplateAtom);

  const questTemplatesCollection =
    db.collections.get<QuestTemplate>("quest_templates");

  const createQuestTemplate = async () => {
    await questTemplatesCollection.create((questTemplate) => {
      questTemplate.type = newQuestTemplate.type;
      questTemplate.title = newQuestTemplate.title;
      questTemplate.description = newQuestTemplate.description;
      questTemplate.goal = newQuestTemplate.goal;
      questTemplate.minProgress = newQuestTemplate.minProgress;
    });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Quest Template Title"
        value={newQuestTemplate.title}
        onChangeText={(text) =>
          setNewQuestTemplate({ ...newQuestTemplate, title: text })
        }
      />
      <Input
        placeholder="Quest Template Description"
        value={newQuestTemplate.description}
        onChangeText={(text) =>
          setNewQuestTemplate({ ...newQuestTemplate, description: text })
        }
      />
      <Button
        onPress={() => addQuestTemplate(newQuestTemplate)}
        title="Add Quest Template"
        color="primary"
        disabled={!newQuestTemplate.title || !newQuestTemplate.description}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default NewQuestTemplate;
