import React from 'react'

const CardLoader = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-4 border rounded-lg animate-pulse">
                    <span className="block bg-background-dark h-40 w-full mb-3 rounded-md"></span>
                    <span className="block bg-background-dark h-6 w-3/4 mb-2 rounded"></span>
                    <span className="block bg-background-dark h-4 w-full rounded"></span>
                </div>
            ))}
        </div>
    )
}
export default CardLoader
