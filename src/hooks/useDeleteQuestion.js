import { deleteQuestion } from "@/services/questions.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteQuestion() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (id) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allQuestions"] });
    },
  });
  return { mutateAsync, isPending, isError };
}
