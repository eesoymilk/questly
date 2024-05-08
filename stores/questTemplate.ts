import { atom } from "jotai";

import { NewQuestTemplate, QuestTemplate } from "@/types/quest";

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
        id: questTemplates.length,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "1",
      },
    ]);
    set(newQuestTemplateAtom, blankQuestTemplate);
  },
);
