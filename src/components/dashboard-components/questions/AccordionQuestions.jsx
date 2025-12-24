import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useQuestions from "@/hooks/useQuestions";
import { Button } from "../../ui/button";
import useDeleteQuestion from "@/hooks/useDeleteQuestion";
import { Badge } from "../../ui/badge";
import { Spinner } from "../../ui/spinner";
import EditQuestionForm from "./EditQuestionForm";

export default function AccordionQuestions() {
  const { data, isLoading, isError } = useQuestions();
  const { mutateAsync: deleteQuestion, isPending: isDeleting } =
    useDeleteQuestion();
  if (isLoading)
    return (
      <div className="flex gap-4 text-white items-center justify-center h-60 text-2xl ">
        <Spinner className="text-primary size-10" />
        <span className="text-text-secondary">Loading Questions...</span>
      </div>
    );
  if (isError) return <div>Error loading questions.</div>;
  return (
    <Accordion type="single" collapsible className="w-full">
      {data?.data?.map((q, i) => {
        return (
          <AccordionItem value={String(i)} key={i}>
            <AccordionTrigger className="text-primary tracking-wider text-xl flex cursor-pointer">
              <span>{q.text}</span>
              <Badge className="ml-auto">{q.type}</Badge>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance text-slate-400">
              <p>{q.correctAnswer}</p>
              <div className="flex justify-end gap-2">
                <EditQuestionForm question={q} />
                <Button
                  variant="destructive"
                  onClick={() => deleteQuestion(q._id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Spinner />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
