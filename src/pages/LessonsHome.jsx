import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '@/components/lessons/LessonHome/SearchBar.jsx';
import LessonFilters from '@/components/lessons/LessonHome/LessonFilters.jsx';
import { lessonsData } from '@/components/lessons/data.js';
import {
    BookOpen,
    TrendingUp,
} from 'lucide-react';
import CourseHeader from "@/components/lessons/LessonHome/CourseHeader.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Loader from "@/components/lessons/Loader.jsx";
import CourseCard from "@/components/lessons/LessonHome/CourseCard.jsx";

const LessonsHome = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchInput, setSearchInput] = useState(searchParams.get('title') || '');
    const [filteredLessons, setFilteredLessons] = useState(lessonsData);
    const [isLoading, setIsLoading] = useState(false);

    // Get query parameters
    const classLevel = searchParams.get('classLevel') || 'Grade 1 Secondary';
    const isPaid = searchParams.get('isPaid') || 'true';
    const title = searchParams.get('title') || '';
    const sortBy = searchParams.get('sortBy') || 'scheduledDate';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const category = searchParams.get('category') || '';

    // Stats
    const stats = {
        totalLessons: lessonsData.length,
        enrolledLessons: lessonsData.filter(l => l.isEnrolled).length,
        completedLessons: lessonsData.filter(l => l.isEnrolled && l.progress === 100).length,
        totalSpent: lessonsData.filter(l => l.isEnrolled && l.price > 0)
            .reduce((sum, lesson) => sum + lesson.price, 0),
        averageScore: 85,
        streakDays: 7,
        totalXP: 1245,
    };

    const overallProgress = Math.round((stats.enrolledLessons / stats.totalLessons) * 100);

    useEffect(() => {
        setIsLoading(true);

        let result = [...lessonsData];

        // Apply filters
        if (classLevel) {
            result = result.filter(lesson => lesson.classLevel === classLevel);
        }

        if (isPaid) {
            const isPaidBool = isPaid === 'true';
            result = result.filter(lesson => lesson.price > 0 === isPaidBool);
        }

        if (title) {
            result = result.filter(lesson =>
                lesson.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        if (category) {
            result = result.filter(lesson => lesson.category === category);
        }

        // Apply sorting
        result.sort((a, b) => {
            if (sortBy === 'scheduledDate') {
                const dateA = new Date(a.scheduledDate).getTime();
                const dateB = new Date(b.scheduledDate).getTime();
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
            if (sortBy === 'title') {
                return sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            return 0;
        });

        setFilteredLessons(result);
        setTimeout(() => setIsLoading(false), 300);
    }, [classLevel, isPaid, title, sortBy, sortOrder, category]);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchInput) {
            params.set('title', searchInput);
        } else {
            params.delete('title');
        }
        navigate(`/lessons?${params.toString()}`);
    };

    const handleFilterChange = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        navigate(`/lessons?${params.toString()}`);
    };

    const clearAllFilters = () => {
        navigate('/lessons');
    };

    const activeFiltersCount = Array.from(searchParams.entries())
        .filter(([key]) => !['sortBy', 'sortOrder'].includes(key))
        .length;

    return (
        <main className="min-h-screen bg-gradient-to-b from-dark-background to-dark-surfaceDarker">
            <CourseHeader/>

            <section className="px-4 py-8">

                <div className="bg-surface-darker border border-primary/20 rounded-xl p-4 pt-7 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
                        <div className="flex-1 w-full">
                            <div className="relative max-w-xl">
                                <SearchBar
                                    value={searchInput}
                                    onChange={setSearchInput}
                                    onSearch={handleSearch}
                                    placeholder="Search lessons by title..."
                                />
                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-text-secondary">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="bg-dark-surfaceDarker border border-dark-surfaceDarker rounded-lg sm:px-3 px-2 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                >
                                    <option value="scheduledDate">Date</option>
                                    <option value="title">Title</option>
                                    <option value="rating">Rating</option>
                                </select>
                                {/*<Select>*/}
                                {/*    <SelectTrigger className="w-[120px] dark:bg-dark-surfaceDarker border border-dark-surfaceDarker text-white text-sm focus:outline-none focus:border-primary">*/}
                                {/*        <SelectValue placeholder="Short By" />*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent>*/}
                                {/*        <SelectItem value="scheduledDate">Date</SelectItem>*/}
                                {/*        <SelectItem value="title">Title</SelectItem>*/}
                                {/*        <SelectItem value="rating">Rating</SelectItem>*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}
                                {/*<Select>*/}
                                {/*    <SelectTrigger className="w-[120px] dark:bg-dark-surfaceDarker border border-dark-surfaceDarker  text-sm focus:outline-none focus:border-primary">*/}
                                {/*        <SelectValue placeholder="Order By" />*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent*/}

                                {/*    >*/}
                                {/*        <SelectItem value="asc">Ascending</SelectItem>*/}
                                {/*        <SelectItem value="desc">Descending</SelectItem>*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}
                                <select
                                    value={sortOrder}
                                    onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                                    className="bg-dark-surfaceDarker border border-dark-surfaceDarker rounded-lg sm:px-3 px-2 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                >
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>

                            <LessonFilters
                                activeFilters={Object.fromEntries(searchParams.entries())}
                                onFilterChange={handleFilterChange}
                                onClearAll={clearAllFilters}
                            />
                        </div>
                    </div>

                    {/* Active Filters */}
                    {activeFiltersCount > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-dark-surfaceDarker">
                            {Array.from(searchParams.entries()).map(([key, value]) => (
                                key !== 'sortBy' && key !== 'sortOrder' && (
                                    <div key={key} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center gap-1">
                                        {key}: {value}
                                        <button
                                            onClick={() => handleFilterChange(key, '')}
                                            className="ml-1 hover:text-red-400"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )
                            ))}
                            <button
                                onClick={clearAllFilters}
                                className="px-3 py-1 text-gray-400 hover:text-white text-sm"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>

                <div id={`lessons`} className="mb-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">Available Lessons</h2>
                        <p className="text-text-secondary">
                            {filteredLessons.length} lessons found
                        </p>
                    </div>

                    {isLoading ? (
                       <Loader/>
                    ) : filteredLessons.length === 0 ? (
                        <div className="bg-dark-surface rounded-xl">
                            <div className="py-12 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-dark-surfaceDarker rounded-full flex items-center justify-center">
                                    <BookOpen className="w-8 h-8 text-text-secondary" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No lessons found</h3>
                                <p className="text-text-secondary mb-6">
                                    Try adjusting your filters or search terms
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredLessons.map(lesson => (
                                <CourseCard
                                    key={lesson.title}
                                    id={lesson.id}
                                    imageUrl={lesson.video}
                                    title={lesson.title}
                                    desc={lesson.description}
                                    rate={lesson.rating}
                                    classLevel={lesson.classLevel}
                                    category={lesson.category}
                                    duration={lesson.duration}
                                    price={lesson.price}
                                    scheduledDate={lesson.scheduledDate}
                                    IsEnroll={lesson.isEnrolled}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-surface-darker text-white  border border-primary rounded-xl p-6">
                    <div className="flex items-center mb-6">
                        <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                        <h3 className="text-xl font-bold">Your Learning Journey</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-white">Overall Progress</h4>
                                <p className="text-sm text-gray-500">
                                    {stats.completedLessons} of {stats.totalLessons} lessons completed
                                </p>
                            </div>
                            <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                                {overallProgress}% Complete
                            </div>
                        </div>

                        <div className="h-2 bg-dark-surfaceDarker rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                                style={{ width: `${overallProgress}%` }}
                            />
                        </div>

                        <div className="pt-4 border-t border-dark-surfaceDarker" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-dark-surfaceDarker rounded-lg">
                                <div className="text-2xl font-bold text-primary mb-2">
                                    {stats.enrolledLessons}
                                </div>
                                <div className="text-sm text-gray-500">Lessons Enrolled</div>
                            </div>
                            <div className="text-center p-4 bg-dark-surfaceDarker rounded-lg">
                                <div className="text-2xl font-bold text-emerald-400 mb-2">
                                    {stats.completedLessons}
                                </div>
                                <div className="text-sm text-gray-500">Completed</div>
                            </div>
                            <div className="text-center p-4 bg-dark-surfaceDarker rounded-lg">
                                <div className="text-2xl font-bold text-amber-400 mb-2">
                                    {stats.totalLessons - stats.enrolledLessons}
                                </div>
                                <div className="text-sm text-gray-500">Available to Enroll</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default LessonsHome;
