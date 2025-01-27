'use client'

import { useActionState, startTransition } from 'react'
import { FormInput } from "@/app/components/ui/form-input"
import { PUBLISHERS, SCREENS, GENDERS } from "@/lib/publishers"
import { CreateCampaignInput, createCampaignSchema } from '@/lib/schemas/campaign'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Campaign } from '@prisma/client'
import { updateCampaign } from './actions'

type State = {
    errors: Record<string, string> | null;
    message: string | null;
}

const initialState: State = {
    errors: {},
    message: null
}

export function EditCampaignForm({ campaign, userId }: { campaign: Campaign, userId: string }) {
    const router = useRouter()
    const [state, dispatch] = useActionState(updateCampaign.bind(null, campaign.id, userId), initialState)
    const [clientErrors, setClientErrors] = useState<Record<string, string[]>>({})
    const hasErrors = (state.errors && Object.keys(state.errors).length > 0) || Object.keys(clientErrors).length > 0

    useEffect(() => {
        if (state.message === 'success') {
            router.push('/campaigns')
        }
    }, [state.message, router])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data: CreateCampaignInput = {
            name: formData.get('name') as string,
            budgetGoal: parseFloat(formData.get('budgetGoal') as string),
            startDate: new Date(formData.get('startDate') as string),
            endDate: new Date(formData.get('endDate') as string),
            targetAge: formData.get('targetAge') as string,
            targetGender: formData.get('targetGender') as string,
            country: formData.get('country') as string,
            state: formData.get('state') as string,
            city: formData.get('city') as string,
            zipCode: formData.get('zipCode') as string,
            publishers: formData.getAll('publishers') as string[],
            screens: formData.getAll('screens') as string[]
        }

        const result = createCampaignSchema.safeParse(data)
        if (!result.success) {
            setClientErrors(result.error.flatten().fieldErrors)
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }

        setClientErrors({})
        const formDataToSend = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => formDataToSend.append(key, v))
            } else {
                formDataToSend.append(key, value as string | Blob)
            }
        })

        startTransition(() => {
            dispatch(formDataToSend)
        })
    }

    return (
        <section className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl text-black font-bold mb-8">Edit Campaign</h1>

            {hasErrors && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                    <h2 className="text-lg font-semibold">Please fix the following errors:</h2>
                    <ul className="mt-2 list-disc list-inside">
                        {state.errors && Object.entries(state.errors).map(([field, error]) => (
                            <li key={field}>{error}</li>
                        ))}
                        {Object.entries(clientErrors).map(([field, errors]) => (
                            errors.map((error, index) => (
                                <li key={`${field}-${index}`}>{error}</li>
                            ))
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>
                    <FormInput
                        label="Campaign Name"
                        name="name"
                        defaultValue={campaign.name}
                        placeholder="Enter campaign name"
                        required
                        error={clientErrors.name?.[0]}
                        onErrorClear={() => {
                            if (clientErrors.name) {
                                setClientErrors(prev => {
                                    const { name, ...rest } = prev
                                    return rest
                                })
                            }
                        }}
                    />
                    <FormInput
                        label="Budget Goal"
                        name="budgetGoal"
                        type="number"
                        defaultValue={campaign.budgetGoal}
                        min="0"
                        step="0.01"
                        placeholder="Enter budget amount"
                        required
                        error={clientErrors.budgetGoal?.[0]}
                    />
                    <FormInput
                        label="Start Date"
                        name="startDate"
                        type="date"
                        defaultValue={campaign.startDate.toISOString().split('T')[0]}
                        required
                        error={clientErrors.startDate?.[0]}
                    />
                    <FormInput
                        label="End Date"
                        name="endDate"
                        type="date"
                        defaultValue={campaign.endDate.toISOString().split('T')[0]}
                        required
                        error={clientErrors.endDate?.[0]}
                    />
                </div>

                {/* Location */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700">Location</h2>
                    <FormInput
                        label="Country"
                        name="country"
                        defaultValue={campaign.country || ''}
                        placeholder="Enter country"
                    />
                    <FormInput
                        label="State"
                        name="state"
                        defaultValue={campaign.state || ''}
                        placeholder="Enter state"
                    />
                    <FormInput
                        label="City"
                        name="city"
                        defaultValue={campaign.city || ''}
                        placeholder="Enter city"
                    />
                    <FormInput
                        label="ZIP Code"
                        name="zipCode"
                        defaultValue={campaign.zipCode || ''}
                        placeholder="Enter ZIP code"
                        error={clientErrors.zipCode?.[0]}
                        onErrorClear={() => {
                            if (clientErrors.zipCode) {
                                setClientErrors(prev => {
                                    const { zipCode, ...rest } = prev
                                    return rest
                                })
                            }
                        }}
                    />
                </div>

                {/* Demographics */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700">Demographics</h2>
                    <FormInput
                        label="Target Age Ranges"
                        name="targetAge"
                        defaultValue={campaign.targetAge}
                        placeholder="e.g., 18-24, 25-34"
                        required
                        error={clientErrors.targetAge?.[0]}
                    />

                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Target Gender
                        </label>
                        <div className="flex gap-4">
                            {GENDERS.map((gender) => (
                                <label
                                    key={gender.id}
                                    className="flex items-center space-x-2"
                                >
                                    <input
                                        type="radio"
                                        name="targetGender"
                                        value={gender.id}
                                        defaultChecked={campaign.targetGender === gender.id}
                                        className="h-4 w-4 border-gray-300"
                                        required
                                    />
                                    <span className="text-gray-800 font-medium">{gender.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Publishers & Screens */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700">Distribution</h2>
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Publishers
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {PUBLISHERS.map((publisher) => (
                                <label
                                    key={publisher.id}
                                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        name="publishers"
                                        value={publisher.id}
                                        defaultChecked={campaign.publishers.split(',').includes(publisher.id)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <span className="ml-3 text-gray-800 font-medium">{publisher.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Screens
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {SCREENS.map((screen) => (
                                <label
                                    key={screen.id}
                                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        name="screens"
                                        value={screen.id}
                                        defaultChecked={campaign.screens.split(',').includes(screen.id)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <span className="ml-3 text-gray-800 font-medium">{screen.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Update Campaign
                </button>
            </form>
        </section>
    )
} 