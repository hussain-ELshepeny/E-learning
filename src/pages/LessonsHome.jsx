import React, { useRef, useState,useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import SearchBar from '@/components/lessons/LessonHome/SearchBar.jsx';
import LessonFilters from '@/components/lessons/LessonHome/LessonFilters.jsx';
import {
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
import CardLoader from "@/components/lessons/CardLoader.jsx";
import CourseCard from "@/components/lessons/LessonHome/CourseCard.jsx";
import {useGetLessons, useGetMyPurchasedLessons} from "@/hooks/useLessons.js";
import LessonNotFound from "@/components/lessons/LessonHome/LessonNotFound.jsx";
import Loader from "@/components/lessons/Loader.jsx";
import ErrorCard from "@/components/lessons/ErrorCard.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExamDetails from "@/components/lessons/lessondetails/ExamDetails.jsx";
import {useGetExams} from "@/hooks/useExams.js";

const LessonsHome = () => {
    const [filters, setFilters] = useState(() => {
        const savedFilters = localStorage.getItem('lessonFilters');
        return savedFilters ? JSON.parse(savedFilters) : {
            classLevel: "",
            isPaid: "",
            title: "",
            sortBy: "",
            sortOrder: "",
        };
    });
    // const [filters, setFilters] = useState({
    //     classLevel: "",
    //     isPaid: "",
    //     title: "",
    //     sortBy: "",
    //     sortOrder: "",
    // });
    const { data: lessons, isLoading:lessonLoading, error } = useGetLessons(filters);
    const { data: Purchasedlessons, isLoading:PurchasedlessonLoading, error:Purchasederror } = useGetMyPurchasedLessons();
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const {data:exams,isLoading:ExamLoading,error:examerror}=useGetExams();
    const [searchInput, setSearchInput] = useState(filters.title || '');
    useEffect(() => {
        localStorage.setItem('lessonFilters', JSON.stringify(filters));
    }, [filters]);
    if(lessonLoading ||PurchasedlessonLoading) return <Loader/>;
    if(error){
        return (
            <ErrorCard error={error}/>
        );
    }

    const stats = {
        totalLessons: lessons.data.length,
        enrolledLessons: Purchasedlessons.data.length,
        completedLessons: lessons.data.filter(l => l.isEnrolled && l.progress === 100).length,
        totalSpent: lessons.data.filter(l => l.isEnrolled && l.price > 0)
            .reduce((sum, lesson) => sum + lesson.price, 0),
        averageScore: 85,
        streakDays: 7,
        totalXP: 1245,
    };
    const classLevel = filters.classLevel || '';

    const overallProgress = Math.round((stats.enrolledLessons / stats.totalLessons) * 100);

    const handleFilterChange = (key, value) => {
        if (key === "title" && !value) {
            setSearchInput("");
            searchRef.current?.focus(); // optional
        }
        if (value) {
            if (value === 'all') value = '';
            setFilters((prev) => ({
                ...prev,
                [key]: value,
            }));
        } else {
            setFilters((prev) => {
                const updated = { ...prev };
                delete updated[key];
                return updated;
            });
        }
    };

    const clearAllFilters = () => {
        setFilters({
            classLevel: "",
            isPaid: "",
            title: "",
            sortBy: "",
            sortOrder: "",
        });
    };

    const activeFiltersCount = Object.keys(filters).filter(
        key => filters[key] && !['sortBy', 'sortOrder'].includes(key)
    ).length;

    const filterNotMyLessons = () => {
        if (!lessons || !Purchasedlessons) return [];

        const purchasedLessonIds = Purchasedlessons.data.map(lesson => lesson?lesson?._id || lesson.id:null);

        const notMyLessons = lessons.data.filter(lesson => {
            const lessonId = lesson._id || lesson.id;
            return !purchasedLessonIds.includes(lessonId);
        });

        return notMyLessons;
    };
    const notMyLessons = filterNotMyLessons();
    // Stats


    return (
        <section className="min-h-dvh bg-gradient-to-b from-dark-background to-dark-surfaceDarker">
            <CourseHeader classLevel={classLevel} lessons={lessons} Purchasedlessons={Purchasedlessons}/>
            <div className="px-4 py-8">
                {/* Filters */}
                <div className="bg-surface-darker border border-primary/20 rounded-xl p-4 pt-7 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
                        <div className="flex-1 w-full">
                            <div className="relative max-w-xl">
                                <SearchBar
                                    ref={searchRef}
                                    value={searchInput}
                                    onChange={setSearchInput}
                                    onSearch={() => handleFilterChange("title", searchInput)}
                                    placeholder="Search lessons by title..."
                                />
                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-text-secondary">Sort by:</span>
                                <Select onValueChange={(value) => handleFilterChange('sortBy',value)}>
                                    <SelectTrigger className="w-[120px] data-[placeholder]:text-white [&_svg:not([class*='text-'])]:text-white focus:ring-0 dark:hover:bg-dark-surfaceDarker dark:bg-dark-surfaceDarker border border-dark-surfaceDarker text-white text-sm focus:outline-none focus:border-primary">
                                        <SelectValue placeholder="Short By" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Default</SelectItem>
                                        <SelectItem value="title">Title</SelectItem>
                                        <SelectItem value="price">Price</SelectItem>
                                        <SelectItem value="scheduledDate">Scheduled Date</SelectItem>
                                        <SelectItem value="createdAt">Created Date</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={(value) => handleFilterChange('sortOrder',value)}>
                                    <SelectTrigger className="w-[120px] data-[placeholder]:text-white [&_svg:not([class*='text-'])]:text-white dark:hover:bg-dark-surfaceDarker focus:ring-0 dark:bg-dark-surfaceDarker border border-dark-surfaceDarker  text-sm focus:outline-none focus:border-primary">
                                        <SelectValue placeholder="sort Order" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asc">Ascending</SelectItem>
                                        <SelectItem value="desc">Descending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <LessonFilters
                                activeFilters={filters}
                                onFilterChange={handleFilterChange}
                                onClearAll={clearAllFilters}
                            />
                        </div>
                    </div>

                    {/* Active Filters */}
                    {activeFiltersCount > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-dark-surfaceDarker">
                            {Object.entries(filters).map(([key, value]) => (
                                key !== 'sortBy' && key !== 'sortOrder' && value && (
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

                <Tabs defaultValue="lessons" className="w-full">
                    <TabsList className={`bg-transparent my-2 font-bold`}>
                        <TabsTrigger value="lessons" className={`font-bold text-lg dark:text-white dark:data-[state=active]:bg-primary dark:data-[state=active]:border-none dark:data-[state=active]:text-white`}>Lessons</TabsTrigger>
                        <TabsTrigger value="exams" className={`font-bold text-lg dark:text-white dark:data-[state=active]:bg-primary dark:data-[state=active]:border-none dark:data-[state=active]:text-white`}>Exams</TabsTrigger>
                    </TabsList>
                    <TabsContent value="exams">
                        {ExamLoading ? (
                            <CardLoader />
                        ) : examerror ? (
                            <ErrorCard error={examerror} />
                        ) : (
                            <ExamDetails exams={exams} classlevel={classLevel}/>
                        )}

                    </TabsContent>
                    <TabsContent value="lessons">
                        {/* Lessons */}
                        {lessonLoading ? (
                            <CardLoader />
                        ) : error ? (
                            <ErrorCard error={error} />
                        ) :(
                            <div className="mb-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-white">Available Lessons</h2>
                                    <p className="text-text-secondary">
                                        {lessons.data.length} lessons found
                                    </p>
                                </div>

                                {lessonLoading ? (
                                    <CardLoader/>
                                ) : lessons.data.length === 0 ? (
                                    <LessonNotFound clearAllFilters={clearAllFilters} Purchasedlessons={false}/>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {lessons.data.map(lesson => (
                                            <CourseCard
                                                key={lesson.title}
                                                id={lesson._id}
                                                video={lesson.video}
                                                title={lesson.title}
                                                desc={lesson.description}
                                                classLevel={lesson.classLevel}
                                                createdAt={lesson.createdAt}
                                                price={lesson.price}
                                                scheduledDate={lesson.scheduledDate}
                                                isPaid={lesson.isPaid}
                                                Purchasedlessons={false}
                                                notMyLessons={notMyLessons}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <Separator/>

                        {/*Purchased Lessons */}
                        {PurchasedlessonLoading ? (
                            <CardLoader />
                        ) : Purchasederror ? (
                            <ErrorCard error={Purchasederror} />
                        ) : (
                            <div className="my-8">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-white">My Purchased Lessons</h2>
                                    {
                                        Purchasedlessons?<p className="text-text-secondary">
                                            {Purchasedlessons.data.length} lessons found
                                        </p>:""
                                    }
                                </div>

                                {PurchasedlessonLoading ? (
                                    <CardLoader/>
                                ) : Purchasedlessons.data.length === 0 ? (
                                    <LessonNotFound clearAllFilters={clearAllFilters} Purchasedlessons={true}/>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {Purchasedlessons.data.map(lesson => (
                                            lesson?<CourseCard
                                                key={lesson.title}
                                                id={lesson._id}
                                                video={lesson.video}
                                                title={lesson.title}
                                                desc={lesson.description}
                                                classLevel={lesson.classLevel}
                                                createdAt={lesson.createdAt}
                                                price={lesson.price}
                                                scheduledDate={lesson.scheduledDate}
                                                isPaid={lesson.isPaid}
                                                Purchasedlessons={true}
                                                notMyLessons={notMyLessons}
                                            />:''
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Progress */}
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
            </div>


        </section>
    );
};

export default LessonsHome;
