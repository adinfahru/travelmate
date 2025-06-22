"use client";

import { useState } from "react";
import { addItemToChecklist } from "@/app/actions/checklistItem";

interface Category {
  id: string;
  name: string;
}

interface AddItemFormProps {
  checklistId: string;
  categories: Category[];
}

export function AddItemForm({ checklistId, categories }: AddItemFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsAdding(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("checklistId", checklistId);
      
      const result = await addItemToChecklist(formData);
      
      if (result.success) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        // Reset success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError(result.error || "Failed to add item");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-3">Tambahkan Item Baru</h3>
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md text-sm">
          Item berhasil ditambahkan!
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-slate-700 mb-1">
              Nama Item
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              placeholder="Contoh: Payung lipat"
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700 mb-1">
              Kategori
            </label>
            <select
              id="categoryId"
              name="categoryId"
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isAdding}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isAdding ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menambahkan...
              </>
            ) : (
              'Tambahkan Item'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
