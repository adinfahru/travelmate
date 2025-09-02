import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Import client components
import { ChecklistItem } from "./ChecklistItem";
import { AddItemForm } from "./AddItemForm";

export default async function ChecklistDetailPage({
  params,
  searchParams
}: {
  params: { id: string },
  searchParams: { fallback?: string }
}) {
  // Check if user is authenticated
  const session = await getSession();
  
  // If not authenticated, redirect to home page
  if (!session) {
    redirect("/");
  }
  
  // Check if this is a fallback-generated list
  const usedFallback = searchParams.fallback === 'true';
  
  // Get checklist data
  const checklist = await prisma.checklist.findUnique({
    where: { id: params.id },
    include: {
      trip: true,
      items: {
        include: {
          item: {
            include: {
              category: true
            }
          }
        }
      }
    }
  });
  
  if (!checklist) {
    redirect("/checklists");
  }

  // Get all categories for the add item form
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
  // Group items by category
  const groupedItems: Record<string, typeof checklist.items[number][]> = {};
  checklist.items.forEach(checklistItem => {
    const categoryName = checklistItem.item.category.name;
    if (!groupedItems[categoryName]) {
      groupedItems[categoryName] = [];
    }
    groupedItems[categoryName].push(checklistItem);
  });
  
  // If no items, show empty state
  const isEmpty = checklist.items.length === 0;
  
  return (
    <>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/checklists" className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Kembali ke Daftar Checklist
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{checklist.trip.name}</h1>
            <div className="flex items-center gap-3 text-slate-600">
              <span>{checklist.trip.destination}</span>
              {checklist.trip.startDate && checklist.trip.endDate && (
                <>
                  <span>•</span>
                  <span>
                    {new Date(checklist.trip.startDate).toLocaleDateString()} - {new Date(checklist.trip.endDate).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
            
            {usedFallback && (
              <div className="mt-4 bg-yellow-50 border border-yellow-100 text-yellow-800 p-4 rounded-md">
                <p className="font-medium">Daftar Fallback Digunakan</p>
                <p className="mt-1 text-sm">
                  Daftar barang ini dibuat menggunakan daftar dasar karena OpenRouter API sedang dibatasi (rate-limited).
                  Silakan tambahkan item yang diperlukan secara manual.
                </p>
              </div>
            )}
          </div>
          
          {isEmpty ? (
            <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="M9 14h6" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Checklist Kosong</h2>
              <p className="text-slate-600 mb-6 text-center max-w-md">
                Checklist ini belum memiliki item. Tambahkan item untuk memulai.
              </p>              <AddItemForm checklistId={checklist.id} categories={categories} />
            </div>
          ) : (
            <>
              {/* Add form at the top of the page */}
              <div className="mb-8">
                <AddItemForm checklistId={checklist.id} categories={categories} />
              </div>
              
              {Object.keys(groupedItems).map((categoryName) => (
                <div key={categoryName} className="mb-8">
                  <h2 className="text-xl font-bold mb-4">{categoryName}</h2>
                  <div className="bg-white rounded-xl border border-slate-100 p-1 shadow-sm">
                    {groupedItems[categoryName].map((checklistItem) => (
                      <ChecklistItem key={checklistItem.id} item={checklistItem} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
