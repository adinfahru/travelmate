import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AIChecklistForm from "./AIChecklistForm";

export default async function AIChecklistPage() {
  const session = await getSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Packing List Generator</h1>
      <p className="mb-6 text-gray-600">
        Let AI help you create a comprehensive packing list for your trip based on your destination, duration, and preferences.
      </p>
      <AIChecklistForm />
    </div>
  );
}
