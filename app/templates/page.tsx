import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Header from "../components/Header";
import Link from "next/link";

export default async function TemplatesPage() {
  // Check if user is authenticated
  const session = await getSession();
  
  // If not authenticated, redirect to home page
  if (!session) {
    redirect("/");
  }
  
  // Sample templates
  const templates = [
    { 
      id: 'gunung', 
      name: 'Gunung', 
      description: 'Template untuk pendakian gunung dengan item penting untuk aktivitas outdoor.',
      items: 42
    },
    { 
      id: 'pantai', 
      name: 'Pantai', 
      description: 'Template untuk liburan ke pantai dengan item untuk berenang dan bersantai.',
      items: 28
    },
    { 
      id: 'antarkota', 
      name: 'Antar Kota', 
      description: 'Template untuk perjalanan antar kota dengan segala kebutuhan di perjalanan.',
      items: 36
    },
    { 
      id: 'luarnegeri', 
      name: 'Luar Negeri', 
      description: 'Template untuk perjalanan internasional termasuk dokumen dan kebutuhan khusus.',
      items: 54
    }
  ];
  
  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Template Checklist</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold">{template.name}</h2>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                    {template.items} item
                  </span>
                </div>
                <p className="text-slate-600 mb-6">{template.description}</p>
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/templates/${template.id}`}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Lihat Detail
                  </Link>
                  <Link 
                    href={`/new-checklist?template=${template.id}`}
                    className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-slate-800 transition-colors"
                  >
                    Gunakan Template
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
