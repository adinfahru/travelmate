import Link from "next/link";
import AuthButton from "./LoginButton";

export default function Header() {
  return (
    <header className="border-b border-slate-100 py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-medium">
          Travelmate
        </Link>
        <nav className="flex items-center gap-6">
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}