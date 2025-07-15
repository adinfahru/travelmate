import Link from "next/link";

export default function AuthError({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error || "An unknown error occurred";
  let errorMessage = "Sorry, there was a problem signing you in.";
  
  // Provide more specific error messages for common errors
  if (error.includes("Callback")) {
    errorMessage = "There was a problem with the login callback. Please try again.";
  } else if (error.includes("OAuthSignin")) {
    errorMessage = "There was a problem starting the Google sign-in process. Please try again.";
  } else if (error.includes("OAuthCallback")) {
    errorMessage = "There was a problem with the Google sign-in callback. Please try again.";
  } else if (error.includes("OAuthCreateAccount")) {
    errorMessage = "There was a problem creating your account. Please try again.";
  } else if (error.includes("EmailCreateAccount")) {
    errorMessage = "There was a problem creating your account with this email. Please try a different login method.";
  } else if (error.includes("Verification")) {
    errorMessage = "The sign-in link has expired or has already been used.";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-sm border border-slate-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Authentication Error</h1>
          <p className="text-slate-600 mb-6">{errorMessage}</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Link 
            href="/api/auth/signin?provider=google&callbackUrl=/dashboard"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-900 text-white rounded-md hover:bg-black/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Try signing in again
          </Link>
          
          <Link 
            href="/" 
            className="w-full flex items-center justify-center py-3 px-4 bg-white text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
