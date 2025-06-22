import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Header from "../components/Header";
import Link from "next/link";
import { createChecklist } from "../actions/checklist";

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
          
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Detail Perjalanan</h2>
              <form action={createChecklist} className="space-y-6">
              {templateType && (
                <input type="hidden" name="templateType" value={templateType} />
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Nama Perjalanan
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="contoh: Liburan ke Bali"
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  defaultValue={templateType === 'gunung' ? 'Pendakian Gunung' : 
                               templateType === 'pantai' ? 'Liburan ke Pantai' :
                               templateType === 'antarkota' ? 'Perjalanan Antar Kota' :
                               templateType === 'luarnegeri' ? 'Perjalanan Luar Negeri' : ''}
                />
              </div>
              
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-1">
                  Tujuan
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="contoh: Bali, Indonesia"
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="season" className="block text-sm font-medium text-slate-700 mb-1">
                    Musim
                  </label>
                  <select
                    id="season"
                    name="season"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Pilih Musim</option>
                    <option value="summer">Panas</option>
                    <option value="winter">Dingin</option>
                    <option value="rainy">Hujan</option>
                    <option value="dry">Kemarau</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-1">
                    Durasi (hari)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    min="1"
                    placeholder="contoh: 7"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="preferences" className="block text-sm font-medium text-slate-700 mb-1">
                  Preferensi Tambahan
                </label>
                <textarea
                  id="preferences"
                  name="preferences"
                  rows={3}
                  placeholder="Masukkan preferensi atau catatan khusus untuk perjalanan ini"
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition-colors"
                >
                  Buat Checklist
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
