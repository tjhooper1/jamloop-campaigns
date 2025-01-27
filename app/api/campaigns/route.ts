import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { createCampaignSchema } from "@/lib/schemas/campaign"
import { authOptions } from "@/lib/auth"
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const data = await request.json()
        const result = createCampaignSchema.safeParse(data)

        if (!result.success) {
            return NextResponse.json({
                error: "Validation failed",
                errors: result.error.flatten().fieldErrors
            }, { status: 400 })
        }

        const campaign = await prisma.campaign.create({
            data: {
                ...result.data,
                publishers: result.data.publishers.join(','),
                screens: result.data.screens.join(','),
                userId: session.user.id
            }
        })

        revalidateTag('campaigns')
        return NextResponse.json(campaign)
    } catch (error) {
        console.error('Campaign creation error:', error)
        return NextResponse.json({
            error: "Failed to create campaign",
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
} 