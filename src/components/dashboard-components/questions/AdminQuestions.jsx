import { AccordionDemo } from "./Accordion";
import AddQuestionForm from "./AddQuestionForm";

export default function AdminQuestions() {
  return (
    <div className="flex flex-col gap-4">
      <AddQuestionForm />
      <AccordionDemo />
    </div>
  );
}
