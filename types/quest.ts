import { SnakeToCamelCase } from "@/types/caseConversion";
import { Tables } from "@/types/supabase";

interface TimeStamp {
  createdAt: Date;
  updatedAt: Date | null;
}

export type QuestTemplate = Omit<
  SnakeToCamelCase<Tables<"quest_templates">>,
  "createdAt" | "updatedAt" | "type"
> & {
  type: "daily" | "weekly" | "monthly";
} & TimeStamp;

export type NewQuestTemplate = Omit<
  QuestTemplate,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export interface Quest extends QuestTemplate {
  completedAt: Date | null;
  progress: number | null;
  questTemplateId: string;
}
