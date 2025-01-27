import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { EditCampaignForm } from "./edit-campaign-form"

export default async function EditCampaignPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")
    }

    const campaign = await prisma.campaign.findUnique({
        where: {
            id: params.id,
            userId: session.user.id
        }
    })

    if (!campaign) {
        notFound()
    }

    return <EditCampaignForm campaign={campaign} />
} 