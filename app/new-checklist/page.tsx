import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Header from "../components/Header";
import Link from "next/link";
import ChecklistForm from "./ChecklistForm";

export default async function NewChecklistPage({
  searchParams
}: {
  searchParams: { template?: string }
}) {
  // Check if user is authenticated
  const session = await getSession();
  
  // If not authenticated, redirect to home page
  if (!session) {
    redirect("/");
  }
  
  // Get selected template
  const templateType = searchParams.template;
  
  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Kembali ke Dashboard
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-6">Buat Checklist Baru</h1>
          
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Pilih Template</h2>
            <p className="text-slate-600 text-sm mb-6">
              Mulai dengan template yang sudah ada atau buat checklist kosong.
            </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'gunung', name: 'Gunung', icon: '⛰️' },
                { id: 'pantai', name: 'Pantai', icon: '🏖️' },
                { id: 'antarkota', name: 'Antar Kota', icon: '🏙️' },
                { id: 'luarnegeri', name: 'Luar Negeri', icon: '🌎' },
                { id: 'kosong', name: 'Kosong', icon: '📝' }
              ].map((template) => (
                <Link 
                  key={template.id}
                  href={`/new-checklist?template=${template.id}`}
                  className={`bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition-colors border-2 
                    ${templateType === template.id ? 'border-black' : 'border-transparent hover:border-black/10'} 
                    focus:border-black focus:outline-none`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl">
                      {template.icon}
                    </div>
                    <span className="font-medium text-slate-800">{template.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
            <ChecklistForm templateType={templateType} />
        </div>
      </main>
    </>
  );
}
