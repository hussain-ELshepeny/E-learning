import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../../ui/label";
import { useEffect, useState } from "react";
import { useGetExams } from "@/hooks/useExams";
import { Spinner } from "@/components/ui/spinner";
import useEditQuestion from "@/hooks/useEditQuestion";

export default function EditQuestionForm({ question }) {
  console.log(question);
  const [optionInput, setOptionInput] = useState("");
  const [open, setOpen] = useState(false);
  const exams = useGetExams();
  const { mutateAsync: EditQuestion, isPending: isEditting } =
    useEditQuestion();
  const form = useForm({
    defaultValues: {
      text: question?.text || "",
      type: question?.type || "short-answer",
      options: question?.options || [],
      correctAnswer: question?.correctAnswer || "",
      exam: question?.exam || "",
      points: question?.points || 1,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });
  console.log(fields);
  const type = form.watch("type");
  useEffect(() => {
    if (type === "multiple-choice") {
      form.register("options");
    } else {
      form.unregister("options");
    }
  }, [type, form]);

  const onSubmit = async (data) => {
    await EditQuestion({ id: question._id, data });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="ml-auto cursor-pointer  font-medium"
          variant="secondary"
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg animate-in fade-in zoom-in-95 glass-panel text-white border border-surface-dark">
        <DialogHeader className="border-b border-surface-dark pb-4">
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
            {/* Question Text */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Question</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex space-x-4 text-text-secondary"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="short-answer"
                          id="short-answer"
                        />
                        <Label htmlFor="short-answer">Short Answer</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="multiple-choice"
                          id="multiple-choice"
                        />
                        <Label htmlFor="multiple-choice">Multiple Choice</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="true-false" id="true-false" />
                        <Label htmlFor="true-false">True / False</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Options */}
            {type === "multiple-choice" && (
              <FormItem>
                <FormLabel>Options</FormLabel>

                <FormControl>
                  <Input
                    disabled={type !== "multiple-choice"}
                    placeholder="Write option then click ADD"
                    value={optionInput}
                    onChange={(e) => setOptionInput(e.target.value)}
                  />
                </FormControl>

                <Button
                  type="button"
                  onClick={() => {
                    if (!optionInput) return;
                    append({ value: optionInput.trim() });
                    setOptionInput("");
                  }}
                >
                  ADD
                </Button>
              </FormItem>
            )}

            {/* Render options list */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-28">
              {fields.map((item, index) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span>
                      Option
                      {index + 1}:
                    </span>
                    <span>{item.value}</span>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    ✕
                  </Button>
                </li>
              ))}
            </div>

            {/* Correct Answer */}
            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Answer</FormLabel>
                  <FormControl>
                    {type === "true-false" ? (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose True or False" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input {...field} />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Exam */}
            <FormField
              control={form.control}
              name="exam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Exam" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {exams.data?.data?.map((exam) => (
                            <SelectItem key={exam._id} value={exam._id}>
                              {exam.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Points */}
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={isEditting}>
                {isEditting ? (
                  <div className="flex gap-2">
                    <Spinner /> <span>saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
