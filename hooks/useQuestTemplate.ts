// import { Q } from "@nozbe/watermelondb";
// import { useDatabase } from "@nozbe/watermelondb/hooks";
// import { AuthUser } from "@supabase/supabase-js";
// import { useAtom } from "jotai";
// import { useEffect } from "react";

// import { QuestTemplate } from "@/model";
// import { questTemplatesAtom } from "@/stores/questTemplate";

// interface QuestTemplateSelector {
//   user: AuthUser | null;
// }

// const useQuestTemplate = ({ user }: QuestTemplateSelector) => {
//   const database = useDatabase();
//   const [questTemplates, setQuestTemplates] = useAtom(questTemplatesAtom);

//   const questTemplatesCollection =
//     database.collections.get<QuestTemplate>("quest_templates");

//   // Load profile
//   useEffect(() => {
//     // Query profile by user id
//     const questTemplatesQuery = questTemplatesCollection.query([
//       Q.where("user_id", user.id),
//     ]);

//     if (questTemplatesQuery) {
//       const subscription = questTemplatesQuery.observe().subscribe((data) => {
//         setQuestTemplates(data ?? null);
//       });

//       return () => subscription.unsubscribe();
//     }
//   }, [profilesCollection, user, slug]);

//   return { profile, createProfile, stacks, stack, picks };
// };
