import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addQuestion } from "@/services/questions.services";
export default function useAddQuestion() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (data) => addQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
      toast.success("Question Added successfully! ");
    },
  });
  return { mutateAsync, isPending, isError };
}
