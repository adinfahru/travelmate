"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-700">
          {session.user.name}
        </span>
        <button 
          onClick={() => signOut()}
          className="px-4 py-2 text-sm text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => signIn("google")}
      className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-slate-800 transition-colors"
    >
      Sign in
    </button>
  );
}
