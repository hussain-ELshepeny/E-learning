import QuestionNav from "./QuestionNav";

export default function QuestionCard({
    // question,
    answer,
    onAnswer,
    disabled,
    index,
    total,
}) {
     const type = 'mcq'; // mcq | boolean | short


    return (
        <div className="space-y-6 mx-5 lg:mx-15 max-h-screen max-w-[1200px]">
            <div className="bg-[var(--color-surface-darker)] rounded-xl p-6 space-y-6">
                <div className="text-sm text-textSecondary">
                    Question {index + 1} of {total}
                </div>


                <p className="text-lg">
                    {question.text} questionnnnnnn
                </p>


                {question.type === 'mcq' && (
                    <div>
                        {['String', 'Number', 'Boolean', 'Character'].map(option => (
                            <label
                                key={option}
                                className="flex items-center gap-3 p-3 rounded-xl bg-surfaceDark cursor-pointer hover:bg-white/5"
                            >
                                <input
                                    type="radio"
                                    name={question._id}
                                    disabled={disabled}
                                    checked={answer === option}
                                    onChange={() => onAnswer(question._id, option)}
                                    className="accent-primary" />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                )}


                {question.type === 'boolean' && (
                    <div className="flex gap-4">
                        {['True', 'False'].map(option => (
                            <label key={option} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name={question._id}
                                    disabled={disabled}
                                    checked={answer === option}
                                    onChange={() => onAnswer(question._id, option)}
                                    className="accent-primary"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                )}


                {question.type === 'short' && (
                    <input
                        type="text"
                        value={answer || ""}
                        disabled={disabled}
                        onChange={(e) =>
                            onAnswer(question._id, e.target.value)
                        }
                        placeholder="Type your answer..."
                        className="w-full bg-surfaceDark rounded px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
            </div>
            <QuestionNav />
        </div>
    );
}