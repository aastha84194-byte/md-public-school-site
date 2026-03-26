"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";
import { useToast } from "@/components/ui/toast";
import { PasswordInput } from "@/components/ui/password-input";

interface TeacherModalProps {
  teacher?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function TeacherModal({ teacher, onClose, onSuccess }: TeacherModalProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const token = storage.getToken();
      if (teacher) {
        await apiRequest(`/teachers/${teacher.id}`, "PUT", data, token);
        toast("Teacher updated successfully", "success");
      } else {
        await apiRequest("/teachers/", "POST", data, token);
        toast("Teacher created successfully", "success");
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      // Better error parsing for FastAPI 422 errors
      let errorMsg = err.message;
      try {
          if (err.message.includes("[object Object]")) {
              // This usually means the Error object stringified an array/object
              errorMsg = "Validation Error: Please check all fields.";
          }
          // If we can get more details from the message if it's a JSON string
          if (err.message.startsWith("{") || err.message.startsWith("[")) {
              const details = JSON.parse(err.message);
              errorMsg = details.detail?.[0]?.msg || details.detail || err.message;
          }
      } catch (e) {}
      
      toast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b bg-zinc-50/50 flex justify-between items-center">
          <h2 className="text-xl font-bold">{teacher ? "Edit Teacher Details" : "Add New Teacher"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">✕</Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Username *</Label>
              <Input name="username" defaultValue={teacher?.user?.username} placeholder="e.g. jdoe123" required minLength={3} disabled={!!teacher} />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input name="email" type="email" defaultValue={teacher?.user?.email} placeholder="jdoe@school.com" required />
            </div>
          </div>
          {!teacher && (
            <div className="space-y-2">
              <Label>Password *</Label>
              <PasswordInput name="password" placeholder="••••••••" required minLength={4} />
            </div>
          )}
          <div className="space-y-2">
            <Label>Full Name (as per ID) *</Label>
            <Input name="full_name" defaultValue={teacher?.user?.full_name} placeholder="e.g. John Doe" required minLength={3} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Employee ID *</Label>
              <Input name="employee_id" defaultValue={teacher?.employee_id} placeholder="EMP001" required />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input name="department" defaultValue={teacher?.department} placeholder="e.g. Science, Maths" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Monthly Base Salary (₹) *</Label>
            <Input name="salary" type="number" defaultValue={teacher?.salary} placeholder="25000" required min="0" />
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-primary text-white px-8">
              {loading ? "Processing..." : "Save Teacher Record"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
