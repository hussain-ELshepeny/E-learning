import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateQuestion } from "@/services/questions.services";

export default function useEditQuestion() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({ id, data }) => updateQuestion({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
      toast.success("Question Updated successfully! ");
    },
  });
  return { mutateAsync, isPending, isError };
}
