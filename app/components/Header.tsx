import Link from "next/link";
import { getSession } from "@/lib/session";
import AuthButton from "./LoginButton";

export default async function Header() {
  const session = await getSession();
  const isLoggedIn = !!session;

  return (
    <header className="border-b border-slate-100 py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="text-xl font-medium">
            Travelmate
          </Link>
          
          {isLoggedIn && (
            <nav className="hidden sm:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Dashboard
              </Link>
              <Link href="/checklists" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Checklist Saya
              </Link>
              <Link href="/templates" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Template
              </Link>
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </header>
  );
}