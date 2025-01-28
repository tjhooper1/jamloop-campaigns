import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { CampaignList } from "./campaign-list"
import { unstable_cache } from 'next/cache'

const getCampaigns = unstable_cache(
    async (userId: string) => {
        return await prisma.campaign.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
    },
    ['campaigns'],
    { tags: ['campaigns'], revalidate: 60 }
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