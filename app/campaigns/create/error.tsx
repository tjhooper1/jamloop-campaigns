'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            <h2 className="text-lg font-semibold">Something went wrong!</h2>
            <p className="mt-2">{error.message}</p>
            <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
            >
                Try again
            </button>
        </div>
    )
} 