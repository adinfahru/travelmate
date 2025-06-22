"use client";

import { useState } from "react";
import { toggleChecklistItem, deleteChecklistItem } from "@/app/actions/checklistItem";

interface ChecklistItemProps {
  item: {
    id: string;
    isChecked: boolean;
    item: {
      name: string;
    };
  };
}

export function ChecklistItem({ item }: ChecklistItemProps) {
  const [isChecked, setIsChecked] = useState(item.isChecked);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = async () => {
    try {      const result = await toggleChecklistItem(item.id);
      if (result.success) {
        setIsChecked(result.isChecked || false);
      } else {
        setError("Failed to update item status");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    }
  };
  
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteChecklistItem(item.id);
      if (!result.success) {
        setIsDeleting(false);
        setError("Failed to delete item");
      }
    } catch (err) {
      setIsDeleting(false);
      setError("An error occurred");
      console.error(err);
    }
  };

  if (error) {
    return (
      <div className="p-4 border-b border-slate-100 last:border-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className="h-5 w-5 rounded border-slate-300 text-black focus:ring-black"
          />
          <span className={isChecked ? 'line-through text-slate-500' : ''}>
            {item.item.name}
          </span>
        </div>
        <div className="text-red-500 text-xs">{error}</div>
      </div>
    );
  }

  if (isDeleting) {
    return (
      <div className="p-4 border-b border-slate-100 last:border-0 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <svg className="animate-spin h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Menghapus item...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-slate-100 last:border-0 flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="h-5 w-5 rounded border-slate-300 text-black focus:ring-black"
        />
        <span className={isChecked ? 'line-through text-slate-500' : ''}>
          {item.item.name}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-slate-400 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-red-500 transition-all"
        aria-label="Delete item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
        </svg>
      </button>
    </div>
  );
}
