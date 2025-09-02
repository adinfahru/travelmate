import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function TemplateDetailPage({ params }: { params: { id: string } }) {
  // Check if user is authenticated
  const session = await getSession();
  
  // If not authenticated, redirect to home page
  if (!session) {
    redirect("/");
  }
  
  // Sample template data
  const templateData = {
    gunung: {
      id: 'gunung',
      name: 'Gunung',
      description: 'Template untuk pendakian gunung dengan item penting untuk aktivitas outdoor.',
      categories: [
        {
          name: 'Perlengkapan Dasar',
          items: [
            'Ransel', 'Sepatu Hiking', 'Jaket Tahan Air', 'Celana Trekking', 
            'Kaos Kering', 'Kaus Kaki', 'Topi', 'Senter Kepala'
          ]
        },
        {
          name: 'Perlengkapan Menginap',
          items: [
            'Tenda', 'Matras', 'Sleeping Bag', 'Kompor Portabel', 
            'Alat Masak', 'Makanan Instan', 'Air'
          ]
        },
        {
          name: 'Perlengkapan Pribadi',
          items: [
            'Sunblock', 'Obat-obatan Pribadi', 'Toiletries', 'Handuk Kecil'
          ]
        },
        {
          name: 'Dokumen',
          items: [
            'KTP', 'SIMAKSI (Surat Izin Masuk Kawasan Konservasi)', 
            'Uang Tunai', 'Asuransi'
          ]
        }
      ]
    },
    pantai: {
      id: 'pantai',
      name: 'Pantai',
      description: 'Template untuk liburan ke pantai dengan item untuk berenang dan bersantai.',
      categories: [
        {
          name: 'Perlengkapan Pantai',
          items: [
            'Baju Renang', 'Handuk Pantai', 'Kacamata Hitam', 'Sunblock', 
            'Sandal', 'Topi Pantai', 'Pakaian Ganti'
          ]
        },
        {
          name: 'Aksesori',
          items: [
            'Tas Tahan Air', 'Tikar Piknik', 'Payung Pantai', 'Snorkel Kit'
          ]
        },
        {
          name: 'Perlengkapan Pribadi',
          items: [
            'Toiletries', 'Obat-obatan Pribadi', 'After-sun Lotion'
          ]
        }
      ]
    },
    antarkota: {
      id: 'antarkota',
      name: 'Antar Kota',
      description: 'Template untuk perjalanan antar kota dengan segala kebutuhan di perjalanan.',
      categories: [
        {
          name: 'Pakaian',
          items: [
            'Baju Harian', 'Jaket', 'Celana', 'Pakaian Dalam', 
            'Kaus Kaki', 'Sepatu'
          ]
        },
        {
          name: 'Dokumen',
          items: [
            'KTP', 'Tiket Perjalanan', 'Konfirmasi Penginapan', 'Uang Tunai'
          ]
        },
        {
          name: 'Elektronik',
          items: [
            'Handphone', 'Charger', 'Powerbank', 'Earphone'
          ]
        },
        {
          name: 'Peralatan Pribadi',
          items: [
            'Toiletries', 'Obat-obatan', 'Masker', 'Hand Sanitizer'
          ]
        }
      ]
    },
    luarnegeri: {
      id: 'luarnegeri',
      name: 'Luar Negeri',
      description: 'Template untuk perjalanan internasional termasuk dokumen dan kebutuhan khusus.',
      categories: [
        {
          name: 'Dokumen Penting',
          items: [
            'Paspor', 'Visa', 'Tiket Pesawat', 'Asuransi Perjalanan', 
            'Konfirmasi Hotel', 'Fotokopi Dokumen'
          ]
        },
        {
          name: 'Pakaian',
          items: [
            'Pakaian sesuai musim', 'Pakaian Dalam', 'Jaket', 'Sepatu', 
            'Sandal', 'Kaus Kaki'
          ]
        },
        {
          name: 'Elektronik',
          items: [
            'Handphone', 'Kamera', 'Adaptor Universal', 'Powerbank', 
            'Charger', 'Earphone'
          ]
        },
        {
          name: 'Kebutuhan Pribadi',
          items: [
            'Toiletries', 'Obat-obatan', 'First Aid Kit', 'Kacamata/Lensa Kontak'
          ]
        },
        {
          name: 'Lain-lain',
          items: [
            'Kamus/Aplikasi Bahasa', 'Uang Lokal', 'Tas Kecil Harian', 
            'Gembok Koper', 'Tag Nama Koper'
          ]
        }
      ]
    }
  };
  
  const template = templateData[params.id as keyof typeof templateData];
  
  if (!template) {
    redirect('/templates');
  }
  
  return (
    <>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/templates" className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Kembali ke Template
            </Link>
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Template {template.name}</h1>
              <p className="text-slate-600">{template.description}</p>
            </div>
            <Link 
              href={`/new-checklist?template=${template.id}`}
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              Gunakan Template
            </Link>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Item Checklist</h2>
            
            <div className="space-y-8">
              {template.categories.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-medium mb-4 pb-2 border-b border-slate-100">
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.items.map((item, itemIdx) => (
                      <div 
                        key={itemIdx}
                        className="flex items-center gap-2 p-3 rounded-lg bg-slate-50"
                      >
                        <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center bg-white">
                          <svg className="w-4 h-4 text-slate-200" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
