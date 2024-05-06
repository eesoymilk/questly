import { Model } from "@nozbe/watermelondb";
import { children, date, readonly, text } from "@nozbe/watermelondb/decorators";

import { QuestTemplate, Quest } from "@/types";

export default class User extends Model {
  static table = "users";

  static associations = {
    quests: { type: "has_many", foreignKey: "user_id" },
    quest_templates: { type: "has_many", foreignKey: "user_id" },
  } as const; // Add `as const` since this.associations is readonly

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
  @text("name") name!: string;

  @children("quests") quests!: Quest[];
  @children("quest_templates") questTemplates!: QuestTemplate[];
}
