'use client';

import { useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createChecklist } from '../actions/checklist';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {pending ? (
        <>
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Membuat...
        </>
      ) : (
        'Buat Checklist'
      )}
    </button>
  );
}

export default function ChecklistForm({ templateType }: { templateType?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();
    const handleFormAction = async (formData: FormData) => {
    setError(null);
    
    startTransition(async () => {
      const result = await createChecklist(formData);
      
      if (result.success && result.checklistId) {
        // Redirect to the new checklist
        router.push(`/checklists/${result.checklistId}`);
      } else {
        // Show error
        setError(result.error || "Failed to create checklist");
        // Debug: Let's log the result
        console.error("Checklist creation failed:", result);
      }
    });
  };
  
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Detail Perjalanan</h2>
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-md text-red-800 text-sm">
          {error}
        </div>
      )}
      
      <form action={handleFormAction} className="space-y-6">
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
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
