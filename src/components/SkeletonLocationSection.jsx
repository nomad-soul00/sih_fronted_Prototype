import React from 'react'

const SkeletonLocationSection = () => {
    return (
        <>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Header Skeleton */}
                <div className="bg-gray-100 px-6 py-4 flex items-center justify-between animate-pulse">
                    <div className="flex items-center space-x-4">
                        <div className="h-6 bg-gray-300 rounded w-48"></div>
                        <div className="px-3 py-1 rounded-full bg-gray-200 w-24 h-6"></div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SkeletonLocationSection
