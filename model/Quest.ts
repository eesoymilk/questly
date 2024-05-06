import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  immutableRelation,
  text,
} from "@nozbe/watermelondb/decorators";

export default class Quest extends Model {
  static table = "quests";

  @text("type") type!: string;
  @text("title") title!: string;
  @text("description") description!: string;

  @field("goal") goal!: number | null;
  @field("min_progress") minProgress!: number | null;
  @field("progress") progress!: number | null;

  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date;
  @date("completed_at") completedAt!: Date | null;

  get isCompleted() {
    return !!this.completedAt;
  }

  @immutableRelation("users", "user_id") user!: string;
  @immutableRelation("quest_templates", "quest_template_id")
  questTemplate!: string;
}
