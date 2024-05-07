import { Input, Button } from "@rneui/themed";
import { useAtom } from "jotai";
import { View, StyleSheet } from "react-native";

import {
  newQuestTemplateAtom,
  addQuestTemplateAtom,
} from "@/stores/questTemplate";

const NewQuestTemplate = () => {
  const [newQuestTemplate, setNewQuestTemplate] = useAtom(newQuestTemplateAtom);
  const [, addQuestTemplate] = useAtom(addQuestTemplateAtom);

  const createQuestTemplate = async () => {};

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
