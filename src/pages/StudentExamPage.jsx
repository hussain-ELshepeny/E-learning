import ExamHeader from "../components/student-exam/ExamHeader";
import ExamSidebar from "../components/student-exam/ExamSidebar";
import QuestionArea from "../components/student-exam/QuestionArea";
export default function StudentExamPage() {
    return (
       <main className="flex h-screen w-full max-w-[1200px] flex-col pt-24 lg:pt-32 pb-10">
            <ExamHeader />
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                <QuestionArea />
                <ExamSidebar />
            </div>
        </main>
    );
}