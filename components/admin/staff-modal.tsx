"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";
import { useToast } from "@/components/ui/toast";

interface StaffModalProps {
  staff?: any;
  onClose: () => void;
  onSuccess: () => void;
}

const AVAILABLE_PERMISSIONS = [
  { id: "students", label: "Manage Students" },
  { id: "teachers", label: "Manage Teachers" },
  { id: "fees", label: "Fee Management" },
  { id: "exams", label: "Exam Management" },
  { id: "attendance", label: "Attendance Control" },
  { id: "staff", label: "Staff Management" },
];

export function StaffModal({ staff, onClose, onSuccess }: StaffModalProps) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(staff?.role?.name || "incharge");
  const [permissions, setPermissions] = useState<string[]>(staff?.incharge_profile?.permissions || []);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    
    // Add permissions if role is incharge
    if (role === "incharge") {
        data.permissions = permissions;
    }
    
    try {
      const token = storage.getToken();
      if (staff) {
        await apiRequest(`/admin/staff/${staff.id}`, "PUT", data, token);
        toast("Staff member updated successfully", "success");
      } else {
        await apiRequest("/admin/staff", "POST", data, token);
        toast("Staff member registered successfully", "success");
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      let errorMsg = err.message;
      try {
          if (err.message.includes("[object Object]")) {
              errorMsg = "Validation Error: Please check all fields.";
          }
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

  const togglePermission = (id: string) => {
    setPermissions(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b bg-zinc-50/50 flex justify-between items-center">
          <h2 className="text-xl font-bold">{staff ? "Edit Staff Details" : "New Staff Registration"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">✕</Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Full Name *</Label>
            <Input name="full_name" defaultValue={staff?.full_name} placeholder="e.g. S.K. Verma" required minLength={3} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Username *</Label>
              <Input name="username" defaultValue={staff?.username} placeholder="skverma" required minLength={3} disabled={!!staff} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" type="email" defaultValue={staff?.email} placeholder="staff@school.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Employee ID *</Label>
                <Input name="employee_id" defaultValue={staff?.teacher_profile?.employee_id || staff?.incharge_profile?.employee_id} placeholder="EMP001" required />
            </div>
            <div className="space-y-2">
                <Label>Department</Label>
                <Input name="department" defaultValue={staff?.teacher_profile?.department || staff?.incharge_profile?.department} placeholder="e.g. Admin, Office" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Assign Role *</Label>
                <select 
                    name="role" 
                    className="w-full px-4 py-2 border rounded-lg bg-zinc-50 text-sm focus:ring-2 focus:ring-primary outline-none"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="incharge">Incharge</option>
                    <option value="teacher">Teacher</option>
                    <option value="financial_admin">Financial Admin</option>
                </select>
            </div>
            <div className="space-y-2">
                <Label>Monthly Salary (₹) *</Label>
                <Input name="salary" type="number" defaultValue={staff?.teacher_profile?.salary || staff?.incharge_profile?.salary} placeholder="20000" required />
            </div>
          </div>

          {role === "incharge" && (
            <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                <Label className="text-primary font-bold">Incharge Authorities (Granular Access)</Label>
                <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_PERMISSIONS.map(p => (
                        <div key={p.id} className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id={`perm-${p.id}`}
                                checked={permissions.includes(p.id)}
                                onChange={() => togglePermission(p.id)}
                                className="h-4 w-4 rounded border-zinc-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor={`perm-${p.id}`} className="text-xs text-zinc-600 cursor-pointer">{p.label}</label>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {!staff && (
            <div className="space-y-2">
              <Label>Initial Password *</Label>
              <PasswordInput name="password" placeholder="••••••••" required minLength={4} />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-primary text-white px-8">
              {loading ? "Processing..." : staff ? "Update Staff" : "Add Staff Member"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
