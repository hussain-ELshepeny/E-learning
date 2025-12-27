import React from 'react'

const ErrorCard = ({error}) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500 text-center">
                {error?.response?.data?.message || error?.message || "Something went wrong"}
            </p>
        </div>
    )
}
export default ErrorCard
