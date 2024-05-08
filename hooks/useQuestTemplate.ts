import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { supabase } from "@/db/supabase";
import useAuth from "@/hooks/useAuth";
import {
  newQuestTemplateAtom,
  questTemplatesAtom,
} from "@/stores/questTemplate";
import { Tables } from "@/types";
import { NewQuestTemplate } from "@/types/quest";

const loadingAtom = atom(false);

const useQuestTemplate = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useAtom(loadingAtom);
  const [questTemplates, setQuestTemplates] = useAtom(questTemplatesAtom);
  const [newQuestTemplate, setNewQuestTemplate] = useAtom(newQuestTemplateAtom);

  const getQuestTemplates = useCallback(async () => {
    const { data, error } = await supabase
      .from("quest_templates")
      .select("*")
      .eq("user_id", session?.user.id as string);

    if (error) {
      throw error;
    }

    setQuestTemplates(data.map(convertDbQuestTemplate));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const convertDbQuestTemplate = useCallback(
    ({
      user_id,
      type,
      min_progress,
      created_at,
      updated_at,
      ...rest
    }: Tables<"quest_templates">) => ({
      userId: user_id,
      type: type as "daily" | "weekly" | "monthly",
      minProgress: min_progress,
      createdAt: new Date(created_at),
      updatedAt: updated_at ? new Date(updated_at) : null,
      ...rest,
    }),
    [],
  );

  const insertQuestTemplate = async ({
    minProgress,
    ...rest
  }: NewQuestTemplate) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("quest_templates").insert({
        ...rest,
        min_progress: minProgress,
      });

      if (error) {
        throw error;
      }

      await getQuestTemplates();
      await setNewQuestTemplate({
        type: "daily",
        title: "",
        description: "",
        goal: null,
        minProgress: null,
      });
    } catch (error) {
      console.error("Error inserting quest template", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    session && getQuestTemplates();
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    questTemplates,
    newQuestTemplate,
    loading,
    insertQuestTemplate,
    setNewQuestTemplate,
  };
};

export default useQuestTemplate;
