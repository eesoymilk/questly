// model/schema.js
import { appSchema, tableSchema } from "@nozbe/watermelondb";

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "users",
      columns: [{ name: "username", type: "string" }],
    }),
    tableSchema({
      name: "quest_templates",
      columns: [
        { name: "type", type: "string" },
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "goal", type: "number", isOptional: true },
        { name: "min_progress", type: "number", isOptional: true },
        // Associations
        { name: "user_id", type: "string" },
      ],
    }),
    tableSchema({
      name: "quests",
      columns: [
        { name: "type", type: "string" },
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "goal", type: "number", isOptional: true },
        { name: "min_progress", type: "number", isOptional: true },
        { name: "progress", type: "number", isOptional: true },
        // Associations
        { name: "user_id", type: "string" },
        { name: "quest_template_id", type: "string" },
      ],
    }),
  ],
});

export default schema;
