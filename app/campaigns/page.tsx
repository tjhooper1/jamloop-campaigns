import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export default async function CampaignPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const campaigns = await prisma.campaign.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <section className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl text-black font-bold mb-8">Your Campaigns</h1>
            {campaigns.length === 0 ? (
                <p className="text-gray-600">You haven't created any campaigns yet.</p>
            ) : (
                <ul className="space-y-4">
                    {campaigns.map((campaign) => (
                        <li key={campaign.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                            <h2 className="text-xl text-black font-semibold mb-2">{campaign.name}</h2>
                            <p className="text-gray-600">Budget Goal: ${campaign.budgetGoal.toFixed(2)}</p>
                            <p className="text-gray-600">Start Date: {campaign.startDate.toLocaleDateString()}</p>
                            <p className="text-gray-600">End Date: {campaign.endDate.toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}