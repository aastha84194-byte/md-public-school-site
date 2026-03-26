"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";

interface FeeStructureModalProps {
  structure?: any;
  classes: any[];
  onClose: () => void;
  onSuccess: () => void;
}

export function FeeStructureModal({ structure, classes, onClose, onSuccess }: FeeStructureModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const token = storage.getToken();
      if (structure) {
        await apiRequest(`/fees/structures/${structure.id}`, "PUT", data, token);
      } else {
        await apiRequest("/fees/structures", "POST", data, token);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const feeTypes = ["tuition", "exam", "transport", "hostel", "other"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b bg-zinc-50/50">
          <h2 className="text-xl font-bold">{structure ? "Edit Structure" : "Define Fee"}</h2>
          <p className="text-xs text-slate-500 mt-1">Set the standard amount for a class and month.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Apply to Class</Label>
            <select 
                name="class_id" 
                className="w-full px-4 py-2 border rounded-lg bg-zinc-50 text-sm"
                defaultValue={structure?.class_id}
                required
            >
                <option value="">Select Class</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Month</Label>
                <select 
                    name="month" 
                    className="w-full px-4 py-2 border rounded-lg bg-zinc-50 text-sm"
                    defaultValue={structure?.month || months[new Date().getMonth()]}
                    required
                >
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Fee Type</Label>
                <select 
                    name="fee_type" 
                    className="w-full px-4 py-2 border rounded-lg bg-zinc-50 text-sm capitalize"
                    defaultValue={structure?.fee_type || "tuition"}
                    required
                >
                    {feeTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
          </div>

          <div className="space-y-2">
            <Label>Standard Amount (₹)</Label>
            <Input name="amount" type="number" defaultValue={structure?.amount} placeholder="5000" required />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-primary text-white px-8">
              {loading ? "Saving..." : structure ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
