import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const LessonFilters = ({ activeFilters, onFilterChange, onClearAll }) => {
    const [isOpen, setIsOpen] = useState(false);

    const classLevels = ['Grade 1 Secondary', 'Grade 2 Secondary', 'Grade 3 Secondary'];
    const paymentTypes = [
        { label: 'All', value: '' },
        { label: 'Paid Only', value: 'true' },
        { label: 'Free Only', value: 'false' }
    ];

    const activeFiltersCount = Object.keys(activeFilters).filter(key =>
        key !== 'sortBy' && key !== 'sortOrder' && activeFilters[key]
    ).length;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-1.5 bg-dark-surface border border-dark-surfaceDarker text-white hover:text-white hover:border-primary/30 rounded-lg flex items-center gap-2 transition-colors"
            >
                <Filter className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                    <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
            {activeFiltersCount}
          </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full mt-2 right-0 bg-background-dark border border-dark-surfaceDarker rounded-lg p-4 w-64 z-50 shadow-xl">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-white mb-2">Payment Type</h4>
                                <div className="space-y-1">
                                    {paymentTypes.map((type) => (
                                        <button
                                            key={type.label}
                                            onClick={() => onFilterChange('isPaid', type.value)}
                                            className={`block w-full text-left px-3 py-2 text-sm rounded ${
                                                activeFilters.isPaid === type.value
                                                    ? 'bg-primary/20 text-primary'
                                                    : 'text-gray-300 hover:bg-dark-surfaceDarker'
                                            }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-white mb-2">Class Level</h4>
                                <div className="space-y-1">
                                    {classLevels.map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => onFilterChange('classLevel', level)}
                                            className={`block w-full text-left px-3 py-2 text-sm rounded ${
                                                activeFilters.classLevel === level
                                                    ? 'bg-primary/20 text-primary'
                                                    : 'text-gray-300 hover:bg-dark-surfaceDarker'
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={() => {
                                        onClearAll();
                                        setIsOpen(false);
                                    }}
                                    className="w-full px-3 py-2 text-red-400 hover:text-red-300 text-sm flex items-center justify-center gap-2 border border-red-400/30 rounded hover:bg-red-400/10"
                                >
                                    <X className="w-4 h-4" />
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LessonFilters;