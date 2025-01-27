import { CreateCampaignForm } from "./create-campaign-form"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CreateCampaignPage() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")
    }
    return <CreateCampaignForm userId={session.user.id} />
}