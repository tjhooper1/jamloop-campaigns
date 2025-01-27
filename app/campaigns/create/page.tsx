import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { CreateCampaignForm } from "./create-campaign-form"

export default async function CreateCampaignPage() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")
    }

    return <CreateCampaignForm />
}