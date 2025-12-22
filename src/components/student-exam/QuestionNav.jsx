export default function QuestionNav() {
    return (
        <div className="flex justify-between">
            <button className="px-6 py-2 rounded-xl bg-surfaceDark border text-textSecondary hover:bg-[var(--color-primary)] hover:text-bgDark hover:border-none ">
                Previous
            </button>
            <button className="px-6 py-2 rounded-xl bg-primary text-bgDark hover:bg-[var(--color-surface-darker)] hover:border">
                Next
            </button>
        </div>
    );
}