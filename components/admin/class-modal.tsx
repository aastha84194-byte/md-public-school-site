"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";

interface ClassModalProps {
  cls?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function ClassModal({ cls, onClose, onSuccess }: ClassModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const token = storage.getToken();
      if (cls) {
        await apiRequest(`/academic/classes/${cls.id}`, "PUT", data, token);
      } else {
        await apiRequest("/academic/classes/", "POST", data, token);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">{cls ? "Edit Class" : "Add New Class"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Class Name</Label>
            <Input name="name" defaultValue={cls?.name} placeholder="e.g. 10-A" required />
          </div>
          <div className="space-y-2">
            <Label>Section</Label>
            <Input name="section" defaultValue={cls?.section} placeholder="e.g. Science" />
          </div>
          <div className="space-y-2">
            <Label>Room Number</Label>
            <Input name="room_number" defaultValue={cls?.room_number} placeholder="e.g. 101" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-primary text-white">
              {loading ? "Saving..." : "Save Class"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
