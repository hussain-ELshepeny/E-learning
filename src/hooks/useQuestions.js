import { useQuery } from "@tanstack/react-query";
import { getAllQuestions } from "../services/questions.services";

export default function useQuestions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allQuestions"],
    queryFn: getAllQuestions,
  });
  return { data, isLoading, isError };
}
