export default function ExamSidebar() {
    const timeLeft = '12:45';
    const status = 'In Progress'; // Submitted | Time Expired
    const answered = 6;
    const total = 10;


    return (
        <aside className=" max-h-screen bg-surfaceDark p-6 space-y-6 border-l border-[var(--color-primary)]">
            {/* Timer */}
            <div className="text-center">
                <div className="text-4xl font-bold text-primary">{timeLeft}</div>
                <span className="inline-block mt-3 px-4 py-1 rounded-full text-sm bg-primary/20 text-primary">
                    {status}
                </span>
            </div>


            {/* Progress */}
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-textSecondary">Answered</span>
                    <span>{answered} / {total}</span>
                </div>
                <div className="w-full h-2 bg-surfaceDarker rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary"
                        style={{ width: `${(answered / total) * 100}%` }}
                    />
                </div>
            </div>


            {/* Submit */}
            <button
                disabled={status !== 'In Progress'}
                className="w-full py-3 rounded-xl font-medium bg-primary text-bgDark disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Submit Exam
            </button>
        </aside>
    );
}