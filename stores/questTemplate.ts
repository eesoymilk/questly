import { atom } from "jotai";

import { QuestTemplate } from "@/types";

type NewQuestTemplate = Omit<
  QuestTemplate,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

const blankQuestTemplate: NewQuestTemplate = {
  type: "daily",
  title: "",
  description: "",
  goal: null,
  minProgress: null,
};

export const newQuestTemplateAtom = atom<NewQuestTemplate>(blankQuestTemplate);

export const questTemplatesAtom = atom<QuestTemplate[]>([]);

export const addQuestTemplateAtom = atom(
  null,
  (get, set, newQuestTemplate: NewQuestTemplate) => {
    const questTemplates = get(questTemplatesAtom);
    set(questTemplatesAtom, [
      ...questTemplates,
      {
        ...newQuestTemplate,
        id: String(questTemplates.length),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "1",
      },
    ]);
    set(newQuestTemplateAtom, blankQuestTemplate);
  },
);

// export const toggleQuestAtom = atom(null, (get, set, id: string) => {
//   const quests = get(newQuestTemplateAtom);
//   const updatedQuests = quests.map((quest) =>
//     quest.id === id ? { ...quest, completed: !quest.completed } : quest,
//   );
//   set(newQuestTemplateAtom, updatedQuests);
// });
