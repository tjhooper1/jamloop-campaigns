import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { unstable_cache } from 'next/cache'
import { CampaignList } from "./campaign-list"

const getCampaigns = unstable_cache(
    async (userId: string) => {
        return await prisma.campaign.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
    },
    ['campaigns'], // cache key
    { tags: ['campaigns'], revalidate: 60 } // revalidate every 60 seconds
)

export default async function CampaignsPage() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")
    }

    const campaigns = await getCampaigns(session.user.id)

    return (
        <div className="max-w-7xl mx-auto p-6">
            <CampaignList campaigns={campaigns} />
        </div>
    )
}