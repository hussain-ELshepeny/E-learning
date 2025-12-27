import React from 'react'

const Loader = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-dark-background to-dark-surfaceDarker flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-gray-400">Loading lesson...</p>
            </div>
        </div>
    )
}
export default Loader
