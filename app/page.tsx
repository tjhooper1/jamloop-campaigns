import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log("we have a user?", session);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to JamLoop
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Logged in as: {session?.user?.email}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/campaigns"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View Campaigns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
