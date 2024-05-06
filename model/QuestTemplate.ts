import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  immutableRelation,
  text,
} from "@nozbe/watermelondb/decorators";

export default class QuestTemplate extends Model {
  static table = "quest_templates";

  @text("type") type!: string;
  @text("title") title!: string;
  @text("description") description!: string;

  @field("goal") goal!: number | null;
  @field("min_progress") minProgress!: number | null;

  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date;

  @immutableRelation("users", "user_id") user!: string;
}
