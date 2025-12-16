export default function QuestionNav() {
    return (
        <div className="flex justify-between">
            <button className="px-6 py-2 rounded-xl bg-surfaceDark text-textSecondary hover:bg-[var(--color-surface-darker)] ">
                Previous
            </button>
            <button className="px-6 py-2 rounded-xl bg-primary text-bgDark hover:bg-[var(--color-surface-darker)]">
                Next
            </button>
        </div>
    );
}