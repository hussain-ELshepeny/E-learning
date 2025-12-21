export default function ExamHeader({ title, description }) {
    return (
        <header className="w-full max-w-[1200px] flex flex-col pb-4 lg:pb-8 mb-3 lg:mb-8 mx-3 lg:mx-20 border-b border-[var(--color-primary)]">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-textSecondary mt-1">
                {description}
            </p>
        </header>
    );
}