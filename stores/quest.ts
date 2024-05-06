import { atom } from "jotai";

import { Quest } from "@/types";

export const newQuestAtom = atom<Omit<Quest, "id">>({
  type: "daily",
  title: "",
  description: "",
  goal: null,
  minProgress: null,
});

export const questsAtom = atom<Quest[]>([]);

export const addQuestAtom = atom(
  null,
  (get, set, newQuest: Omit<Quest, "id" | "completed">) => {
    const quests = get(questsAtom);
    set(questsAtom, [
      ...quests,
      { ...newQuest, id: String(quests.length), completed: false },
    ]);
    set(newQuestAtom, { title: "", description: "" });
  },
);

export const toggleQuestAtom = atom(null, (get, set, id: string) => {
  const quests = get(questsAtom);
  const updatedQuests = quests.map((quest) =>
    quest.id === id ? { ...quest, completed: !quest.completed } : quest,
  );
  set(questsAtom, updatedQuests);
});
