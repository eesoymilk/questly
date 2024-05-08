import { Input, Button } from "@rneui/themed";
import { View, StyleSheet } from "react-native";

import useQuestTemplate from "@/hooks/useQuestTemplate";

const NewQuestTemplate = () => {
  const {
    newQuestTemplate,
    loading,
    insertQuestTemplate,
    setNewQuestTemplate,
  } = useQuestTemplate();

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
        title={loading ? "Loading ..." : "Add Quest Template"}
        onPress={() => insertQuestTemplate(newQuestTemplate)}
        color="primary"
        disabled={
          loading || !newQuestTemplate.title || !newQuestTemplate.description
        }
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
