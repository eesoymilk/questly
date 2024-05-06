import { User } from "./user";

export interface QuestTemplate {
  id: string;
  userId: string;
  type: "daily" | "weekly" | "monthly";
  title: string;
  description: string;
  goal: number | null;
  minProgress: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestSchedule {
  id: string;
  name: string;
  interval: number;
  duration: number;
}

export interface CustomQuestTemplate extends Omit<QuestTemplate, "type"> {
  schedule: QuestSchedule;
}

export interface Quest extends QuestTemplate {
  completedAt: Date | null;
  progress: number | null;
  questTemplateId: string;
}

export interface CustomQuest extends CustomQuestTemplate {
  completedAt: Date | null;
  progress: number | null;
  questTemplateId: string;
}

export interface Milestone {
  id: string;
  user: Partial<User>;
  quest: Partial<Quest>;
  progress: number;
  createdAt: Date;
}
