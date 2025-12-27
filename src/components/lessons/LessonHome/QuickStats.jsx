import { Card, CardContent } from '@/components/ui/card.jsx';
import { TrendingUp, Award, Zap, Target } from 'lucide-react';



export const QuickStats = ({ stats }) => {
    const progress = Math.round((stats.completedLessons / stats.totalLessons) * 100);

    const statCards = [
        {
            title: 'Learning Progress',
            value: `${progress}%`,
            icon: <Target className="w-6 h-6" />,
            gradient: 'from-primary to-emerald-400',
            description: `${stats.completedLessons} of ${stats.totalLessons} lessons`
        },
        {
            title: 'Avg. Score',
            value: `${stats.averageScore}%`,
            icon: <Award className="w-6 h-6" />,
            gradient: 'from-amber-400 to-orange-400',
            description: 'Exam performance'
        },
        {
            title: 'Streak',
            value: `${stats.streakDays} days`,
            icon: <TrendingUp className="w-6 h-6" />,
            gradient: 'from-violet-400 to-purple-400',
            description: 'Daily consistency'
        },
        {
            title: 'Total XP',
            value: `${stats.totalXP}`,
            icon: <Zap className="w-6 h-6" />,
            gradient: 'from-cyan-400 to-blue-400',
            description: 'Earned points'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => (
                <Card
                    key={index}
                    className="bg-surface-dark border-surface-darker hover:border-primary/30 transition-colors rounded-2xl overflow-hidden group"
                >
                    <CardContent className="p-6">
                        <div className="relative z-10">
                            {/* Icon with Gradient Background */}
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-4`}>
                                <div className="text-white">
                                    {stat.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <p className="text-text-secondary text-sm mb-1">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-xs text-white">{stat.description}</p>
                            </div>
                        </div>

                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-current to-transparent rounded-full" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};