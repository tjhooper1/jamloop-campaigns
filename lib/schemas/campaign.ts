import { z } from "zod"
import { PUBLISHERS, SCREENS, GENDERS } from "../publishers"

const publisherIds = PUBLISHERS.map(p => p.id)
const screenIds = SCREENS.map(s => s.id)
const genderIds = GENDERS.map(g => g.id)

const today = new Date()
today.setHours(0, 0, 0, 0)

export const createCampaignSchema = z.object({
    name: z.string().min(1, "Campaign name is required"),
    budgetGoal: z.number().positive("Budget must be greater than 0"),
    startDate: z.coerce.date().refine(date => {
        const d = new Date(date)
        d.setHours(0, 0, 0, 0)
        return d >= today
    }, {
        message: "Start date must be today or later"
    }),
    endDate: z.coerce.date().refine(date => {
        const d = new Date(date)
        d.setHours(0, 0, 0, 0)
        return d >= today
    }, {
        message: "End date must be today or later"
    }),
    targetAge: z.string().min(1, "Target age is required"),
    targetGender: z.enum(genderIds as [string, ...string[]], {
        errorMap: () => ({ message: "Please select a valid gender" })
    }),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    publishers: z.array(z.enum(publisherIds as [string, ...string[]])).min(1, "Select at least one publisher"),
    screens: z.array(z.enum(screenIds as [string, ...string[]])).min(1, "Select at least one screen")
})

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>