import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { createCampaignSchema } from "@/lib/schemas/campaign"
import { authOptions } from "@/lib/auth"
import { revalidateTag } from 'next/cache'

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const data = await request.json()
        const validatedFields = createCampaignSchema.parse(data)

        const campaign = await prisma.campaign.update({
            where: {
                id: params.id,
                userId: session.user.id
            },
            data: {
                ...validatedFields,
                publishers: validatedFields.publishers.join(','),
                screens: validatedFields.screens.join(','),
            }
        })

        revalidateTag('campaigns')
        return NextResponse.json(campaign)
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid request data" },
            { status: 400 }
        )
    }
} 