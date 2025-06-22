import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Header from "../components/Header";
import Link from "next/link";

export default async function ChecklistsPage() {
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Checklist Saya</h1>
            <Link 
              href="/new-checklist" 
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Buat Checklist
            </Link>
          </div>
          
          {checklists.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Belum Ada Checklist</h2>
              <p className="text-slate-600 mb-6 text-center max-w-md">
                Buat checklist perjalanan untuk memastikan Anda tidak melupakan barang penting saat bepergian.
              </p>
              <Link 
                href="/new-checklist" 
                className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-slate-800 transition-colors"
              >
                Buat Checklist Pertama Anda
              </Link>
            </div>
          ) : (            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {checklists.map(checklist => {
                const totalItems = checklist._count.items;
                const completedItems = checklist.items.filter(item => item.isChecked).length;
                const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
                
                return (
                  <Link 
                    key={checklist.id}
                    href={`/checklists/${checklist.id}`}
                    className="block bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="font-semibold text-xl">{checklist.trip.name}</h2>
                      <span className="text-sm font-medium">
                        {completedItems}/{totalItems} selesai
                      </span>
                    </div>
                    
                    <p className="text-slate-600 mb-4">
                      {checklist.trip.destination}
                      {checklist.trip.startDate && checklist.trip.endDate && (
                        <>
                          <span> • </span>
                          <span>
                            {new Date(checklist.trip.startDate).toLocaleDateString()} - {new Date(checklist.trip.endDate).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </p>
                    
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                      <div 
                        className="bg-black h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-right text-sm text-slate-600">
                      {percentage}% selesai
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
