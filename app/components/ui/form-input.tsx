interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type?: string;
}

export function FormInput({ label, name, type = "text", ...props }: FormInputProps) {
    const today = new Date().toISOString().split('T')[0]
    const dateProps = type === 'date' ? { min: today } : {}

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors"
                {...dateProps}
                {...props}
            />
        </div>
    )
} 