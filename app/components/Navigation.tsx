"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Don't show navigation on the root page (landing page)
  if (pathname === "/") return null;
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-indigo-800 font-bold text-xl">
          TravelMate
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4 text-sm">
          {session ? (
            <>
              <Link 
                href="/new-checklist" 
                className={`px-3 py-1 rounded-md ${pathname === '/new-checklist' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                New Checklist
              </Link>
              <Link 
                href="/ai-checklist" 
                className={`px-3 py-1 rounded-md ${pathname === '/ai-checklist' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                AI Packing List
              </Link>
              <Link 
                href="/checklists" 
                className={`px-3 py-1 rounded-md ${pathname === '/checklists' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                My Checklists
              </Link>
              <button 
                onClick={() => signOut()}
                className="px-3 py-1 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google')} 
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
