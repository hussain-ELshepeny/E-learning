import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useQuestions from "@/hooks/useQuestions";
import { Button } from "../ui/button";
import useDeleteQuestion from "@/hooks/useDeleteQuestion";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";

export function AccordionDemo() {
  const { data, isLoading, isError } = useQuestions();
  const { mutateAsync: deleteQuestion, isPending: isDeleting } =
    useDeleteQuestion();
  if (isLoading) return <div>Loading...</div>;
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
                <Button variant="secondary">Edit</Button>
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
