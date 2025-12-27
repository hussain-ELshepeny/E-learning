import React from 'react'
import {BookOpen} from "lucide-react";

const LessonNotFound = ({clearAllFilters,Purchasedlessons}) => {
    return (
        <div className="bg-dark-surface rounded-xl">
            <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-dark-surfaceDarker rounded-full flex items-center justify-center">
                    <BookOpen className="w-9 h-9 text-text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No lessons found</h3>
                {
                    Purchasedlessons
                        ?""
                        :<p className="text-text-secondary mb-6">
                            Try adjusting your filters or search terms
                        </p>
                }
                {
                    Purchasedlessons
                        ?""
                        :<button
                            onClick={clearAllFilters}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                        >
                            Clear Filters
                        </button>
                }
            </div>
        </div>
    )
}
export default LessonNotFound;
