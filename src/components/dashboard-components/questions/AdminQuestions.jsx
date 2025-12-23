import AccordionQuestions from "./AccordionQuestions";
import AddQuestionForm from "./AddQuestionForm";

export default function AdminQuestions() {
  return (
    <div className="flex flex-col gap-4">
      <AddQuestionForm />
      <AccordionQuestions />
    </div>
  );
}
