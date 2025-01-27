'use server'

import { z } from "zod"
import { createCampaignSchema } from "@/lib/schemas/campaign"
import { prisma } from "@/lib/prisma"

type State = {
    errors: Record<string, string> | null;
    message: string | null;
}

export async function createCampaign(userId: string, prevState: State, formData: FormData): Promise<State> {
    try {
        const validatedFields = createCampaignSchema.parse({
            name: formData.get("name"),
            budgetGoal: Number(formData.get("budgetGoal")),
            startDate: new Date(formData.get("startDate") as string),
            endDate: new Date(formData.get("endDate") as string),
            targetAge: formData.get("targetAge"),
            targetGender: formData.get("targetGender"),
            country: formData.get("country"),
            state: formData.get("state"),
            city: formData.get("city"),
            zipCode: formData.get("zipCode"),
            publishers: formData.getAll("publishers"),
            screens: formData.getAll("screens"),
        })

        await prisma.campaign.create({
            data: {
                ...validatedFields,
                publishers: validatedFields.publishers.join(','),
                screens: validatedFields.screens.join(','),
                userId
            }
        })

        return {
            errors: null,
            message: 'success'
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                errors: error.errors.reduce((acc, curr) => ({
                    ...acc,
                    [curr.path[0]]: curr.message
                }), {}),
                message: null
            }
        }
        return {
            errors: null,
            message: 'Something went wrong. Please try again.'
        }
    }
} 