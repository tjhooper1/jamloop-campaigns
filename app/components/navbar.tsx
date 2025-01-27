'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export function Navbar() {
    const { data: session } = useSession()

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                href="/"
                                className="text-xl font-bold text-gray-800"
                            >
                                Campaign Manager
                            </Link>
                        </div>
                        {session && (
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/campaigns"
                                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-600"
                                >
                                    Campaigns
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        {session ? (
                            <button
                                onClick={() => signOut()}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
} 