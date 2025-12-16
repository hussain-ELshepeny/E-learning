import QuestionCard from "./QuestionCard";
import QuestionNav from "./QuestionNav";
export default function QuestionArea() {
    return (
        <section className="space-y-6 mx-5 lg:mx-15 max-h-screen max-w-[1200px]">
            <QuestionCard />
            <QuestionNav />
        </section>
    );
}