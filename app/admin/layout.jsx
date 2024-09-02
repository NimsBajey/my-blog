"use client"

import AuthContextProvider, { useAuth } from "@/lib/contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import { useAdmin } from "@/lib/firebase/admin/read";

export default function Layout({ children }) {
    return <AuthContextProvider>
        <InnerLayout>{children}</InnerLayout>
    </AuthContextProvider>
}

function InnerLayout({ children }) {
    const { user, isLoading: authIsLoading } = useAuth();
    const { data, error, isLoading } = useAdmin({ uid: user?.uid })
    if (authIsLoading || isLoading) {
        return (
            <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
                <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                    <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="24"></line>
                    <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                    </line>
                </svg>
                <span className="text-4xl font-medium text-gray-500">Loading...</span>
            </div>
        )
    }
    if (error) {
        return <p>{error}</p>
    }
    if (!data) {
        return <div>
            <h1>You are not admin</h1>
        </div>
    }
    return <>
        <section className="flex">
            <Sidebar />
            {children}
        </section>
    </>
}