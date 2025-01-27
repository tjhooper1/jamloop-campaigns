import { Campaign } from "@prisma/client"

export function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
    return (
        <section>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl text-black font-bold">Your Campaigns</h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <a
                        href="/campaigns/create"
                        className="block px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Create Campaign
                    </a>
                </div>
            </div>

            {campaigns.length === 0 ? (
                <p className="mt-4 text-gray-600">You haven't created any campaigns yet.</p>
            ) : (
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Budget</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dates</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Demographics</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Distribution</th>
                                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {campaigns.map((campaign) => (
                                        <tr key={campaign.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                {campaign.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                ${campaign.budgetGoal.toLocaleString()}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div>{new Date(campaign.startDate).toLocaleDateString()}</div>
                                                <div>{new Date(campaign.endDate).toLocaleDateString()}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div>Age: {campaign.targetAge}</div>
                                                <div>Gender: {campaign.targetGender}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {[
                                                    campaign.country,
                                                    campaign.state,
                                                    campaign.city,
                                                    campaign.zipCode
                                                ].filter(Boolean).join(', ') || '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div>Publishers: {campaign.publishers.split(',').join(', ')}</div>
                                                <div>Screens: {campaign.screens.split(',').join(', ')}</div>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <a
                                                    href={`/campaigns/${campaign.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit<span className="sr-only">, {campaign.name}</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
} 