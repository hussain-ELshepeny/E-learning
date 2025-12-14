export default function QuestionCard() {
    const type = 'short'; // mcq | boolean | short


    return (
        <div className="bg-[var(--color-surface-darker)] rounded-xl p-6 space-y-6">
            <div className="text-sm text-textSecondary">Question 3 of 10</div>


            <p className="text-lg">
                Which of the following is NOT a JavaScript data type?
            </p>


            {type === 'mcq' && (
                <div className="space-y-3">
                    {['String', 'Number', 'Boolean', 'Character'].map(option => (
                        <label
                            key={option}
                            className="flex items-center gap-3 p-3 rounded-xl bg-surfaceDark cursor-pointer hover:bg-white/5"
                        >
                            <input type="radio" name="q1" className="accent-primary" />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            )}


            {type === 'boolean' && (
                <div className="flex gap-4">
                    {['True', 'False'].map(option => (
                        <label key={option} className="flex items-center gap-2">
                            <input type="radio" name="q1" className="accent-primary" />
                            {option}
                        </label>
                    ))}
                </div>
            )}


            {type === 'short' && (
                <input
                    type="text"
                    placeholder="Type your answer..."
                    className="w-full bg-surfaceDark rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
            )}
        </div>
    );
}