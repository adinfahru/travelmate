import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  // Check if user is authenticated
  const session = await getSession();
  
  // If authenticated, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  }
  
  return (
    <>
      {/* Hero Section */}
      <section className="container pt-20 md:pt-32 pb-16">
        <div className="max-w-4xl py-32 mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
            Travelmate
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 font-medium mb-8">
            Packing Tanpa Cemas, Berangkat dengan Tenang
          </p>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Lupakan ribetnya daftar manual. Dengan TravelMate, siapkan checklist perjalanan 
            dalam hitungan detik—cukup login, atur tujuan & durasi, dan checklist siap pakai!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/api/auth/signin?provider=google&callbackUrl=/dashboard"
              className="rounded-md bg-indigo-900 px-5 py-3 text-base font-medium text-white hover:bg-black/90 transition-colors flex items-center gap-2"
            >
              Buat Checklist Sekarang
            </Link>
          </div>
        </div>
      </section>
      
      {/* Problem Section */}
      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Masalah yang Kami Selesaikan</h2>
            <p className="text-xl text-slate-700 font-medium">Merasa khawatir lupa barang penting?</p>
            <p className="text-lg text-slate-600 mt-4">
              Banyak traveler menghabiskan waktu berjam-jam membuat daftar barang, 
              hanya untuk akhirnya masih ragu apakah semua sudah tercantum. 
              TravelMate menghilangkan kebingungan itu.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Fitur Unggulan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="flex flex-col">
              <div className="bg-black/5 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Login Sekejap dengan Google</h3>
              <p className="text-slate-600">
                Mulai packing tanpa registrasi panjang — cukup satu klik, dashboard Anda langsung tampil.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-black/5 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20h4" />
                  <path d="M14 20v-8h3l-6-8-6 8h3v8Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Buat Checklist Instan</h3>
              <p className="text-slate-600">
                Masukkan tujuan & durasi perjalanan, pilih musim atau preferensi khusus, dan template packing langsung muncul. Hemat waktu & tenaga!
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-black/5 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="9" x2="15" y1="9" y2="9" />
                  <line x1="9" x2="15" y1="15" y2="15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tagging Kategori Pintar</h3>
              <p className="text-slate-600">
                Kategorikan item ke Pakaian, Dokumen, Elektronik, Makanan, Kesehatan, dan Lainnya. Semua terorganisir, tidak ada yang terlewat.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-black/5 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Kelola & Sinkronisasi</h3>
              <p className="text-slate-600">
                Tambah, edit, atau hapus item sesuai kebutuhan. Semua perubahan tersimpan otomatis di server—akses dari mana saja.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">Segera Hadir: Auto-Generate by AI</h3>
              <p className="text-slate-600 mb-4">
                Hanya dengan satu tombol, biarkan AI Gemini kami membuat checklist optimal berdasarkan tujuan dan durasi Anda. 
                Canggih, akurat, hemat waktu!
              </p>
              <div className="inline-block bg-black/10 rounded-full px-4 py-1 text-sm text-slate-700 font-medium">
                Coming Soon
              </div>
            </div>
            <div className="md:w-1/3 flex items-center justify-center">
              <div className="bg-white p-4 rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a5 5 0 1 0 5 5" />
                  <path d="M16 8v3a4 4 0 0 1-4 4h-1.5" />
                  <path d="m5 15 5 5" />
                  <path d="m10 20 5-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="bg-slate-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Kenapa Harus TravelMate?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2">Cepat & Mudah</h3>
                <p className="text-slate-600 text-sm">Proses pembuatan checklist hanya dalam 3 langkah.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2">Terstruktur</h3>
                <p className="text-slate-600 text-sm">Tag kategori membantu Anda packing dengan rapi.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2">Fleksibel</h3>
                <p className="text-slate-600 text-sm">Tambah atau hapus item kapan saja.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2">Terpercaya</h3>
                <p className="text-slate-600 text-sm">Data Anda tersimpan aman di PostgreSQL, dengan autentikasi Google.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2">Inovatif</h3>
                <p className="text-slate-600 text-sm">Integrasi AI untuk pengalaman packing tanpa repot (segera hadir!).</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2">Gratis</h3>
                <p className="text-slate-600 text-sm">Semua fitur tersedia tanpa biaya apapun.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Mulai Packing dengan Teratur Sekarang</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Siapkan perjalanan Anda dengan TravelMate dan rasakan pengalaman packing tanpa stress
          </p>
          <Link
            href="/api/auth/signin?provider=google&callbackUrl=/dashboard"
            className="inline-flex rounded-md bg-black px-5 py-3 text-base font-medium text-white hover:bg-black/90 transition-colors items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Buat Checklist dengan Google
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-50 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-slate-700 font-medium mb-2">TravelMate – Teman setia saat packing, sahabat perjalanan Anda.</p>
            <p className="text-slate-500 text-sm mb-6">© 2025 TravelMate. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="mailto:support@travelmate.id" className="hover:text-black transition-colors">Kontak: support@travelmate.id</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
