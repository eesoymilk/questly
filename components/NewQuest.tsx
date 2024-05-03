import { useAtom } from "jotai";
import { StyleSheet, TextInput, Button } from "react-native";

import { View } from "@/components/Themed";
import { newQuestAtom, addQuestAtom } from "@/stores";

const NewQuest = () => {
  const [newQuest, setNewQuest] = useAtom(newQuestAtom);
  const [, addQuest] = useAtom(addQuestAtom);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Quest Title"
        value={newQuest.title}
        onChangeText={(text) => setNewQuest({ ...newQuest, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Quest Description"
        value={newQuest.description}
        onChangeText={(text) => setNewQuest({ ...newQuest, description: text })}
      />
      <Button
        onPress={() => addQuest(newQuest)}
        title="Add Quest"
        color="#0070f3"
        accessibilityLabel="Add a new quest."
        disabled={!newQuest.title || !newQuest.description}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  input: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
});

export default NewQuest;
