import { getServerSession } from "next-auth"

export default async function CampaignPage(){
    const session = await getServerSession();

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    return <div>campaigns</div>
}