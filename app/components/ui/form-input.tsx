interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type?: string;
    error?: string;
    onErrorClear?: () => void;
}

export function FormInput({
    label,
    name,
    type = "text",
    error,
    onErrorClear,
    onChange,
    ...props
}: FormInputProps) {
    const today = new Date().toISOString().split('T')[0]
    const dateProps = type === 'date' ? { min: today } : {}

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onErrorClear) {
            onErrorClear()
        }
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-semibold text-gray-700 mb-2"
            >
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                onChange={handleChange}
                className={`block w-full rounded-lg border px-4 py-3 text-gray-800 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-opacity-20 transition-colors ${error
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                {...dateProps}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm font-medium text-red-600">{error}</p>
            )}
        </div>
    )
} 