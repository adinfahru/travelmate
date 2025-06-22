import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Header from "../components/Header";
import Link from "next/link";

export default async function DashboardPage() {
  // Check if user is authenticated
  const session = await getSession();
  
  // If not authenticated, redirect to home page
  if (!session) {
    redirect("/");
  }
  
  // Get user's checklists with progress information
  const checklists = await prisma.checklist.findMany({
    where: {
      trip: {
        userId: session.user?.id
      }
    },
    include: {
      trip: true,
      items: {
        select: {
          id: true,
          isChecked: true
        }
      },
      _count: {
        select: {
          items: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="max-w-4xl mx-auto mt-5">
          <h1 className="text-2xl font-bold mb-8">Selamat Datang, {session.user?.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Checklist Saya</h2>
                <Link href="/checklists" className="text-sm text-slate-600 hover:text-slate-900">
                  Lihat Semua
                </Link>
              </div>
              
              {checklists.length === 0 ? (
                <div className="mb-6 text-slate-600">
                  <p>Anda belum memiliki checklist perjalanan.</p>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {checklists.slice(0, 3).map(checklist => {
                    const totalItems = checklist._count.items;
                    const completedItems = checklist.items.filter(item => item.isChecked).length;
                    const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
                    
                    return (
                      <Link 
                        key={checklist.id}
                        href={`/checklists/${checklist.id}`} 
                        className="block bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{checklist.trip.name}</h3>
                          <span className="text-sm text-slate-600">{percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-black h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">
                          {checklist.trip.destination}{checklist.trip.startDate ? ` • ${new Date(checklist.trip.startDate).toLocaleDateString()}` : ''}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              )}
              
              <Link href="/new-checklist" className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-slate-800 transition-colors inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Buat Checklist
              </Link>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Template Populer</h2>
              <Link href="/templates" className="text-sm text-slate-600 hover:text-slate-900">
                Lihat Semua
              </Link>
            </div>
            
            <div className="rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'gunung', name: 'Gunung', icon: '⛰️' },
                { id: 'pantai', name: 'Pantai', icon: '🏖️' },
                { id: 'antarkota', name: 'Antar Kota', icon: '🏙️' },
                { id: 'luarnegeri', name: 'Luar Negeri', icon: '🌎' },
              ].map((template) => (
                <Link 
                  href={`/templates/${template.id}`}
                  key={template.name}
                  className="bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-200 transition-colors"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <span className="text-slate-600">{template.icon}</span>
                    </div>
                    <span className="font-medium text-slate-800">{template.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          </div>

        </div>
      </main>
    </>
  );
}
