import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Header from "./components/Header";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";

export default async function Home() {
  // Check if user is authenticated
  const session = await getSession();
  
  // If authenticated, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }
  
  return (
    <>
      <Header />
      <main className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Jangan lupa bawa barang saat traveling
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              TravelMate membantu Anda menyiapkan checklist perjalanan dengan cepat dan mudah.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-black/5 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20h4"></path>
                      <path d="M14 20v-8h3l-6-8-6 8h3v8Z"></path>
                    </svg>
                  </div>
                  <h3 className="font-medium">Checklist Personal</h3>
                </div>
                <p className="text-slate-600 text-sm">Buat checklist perjalanan sesuai kebutuhan Anda.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-black/5 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <line x1="9" x2="15" y1="9" y2="9"></line>
                      <line x1="9" x2="15" y1="15" y2="15"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium">Kategori yang Terorganisir</h3>
                </div>
                <p className="text-slate-600 text-sm">Kelompokkan barang Anda dengan tag kategori.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-black/5 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                      <line x1="8" x2="16" y1="21" y2="21"></line>
                      <line x1="12" x2="12" y1="17" y2="21"></line>
                    </svg>
                  </div>
                  <h3 className="font-medium">Template Siap Pakai</h3>
                </div>
                <p className="text-slate-600 text-sm">Gunakan template untuk gunung, pantai, antar kota, atau antar negara.</p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm aspect-[4/3] bg-slate-50 flex items-center justify-center">
              <p className="text-slate-400">Ilustrasi aplikasi</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
