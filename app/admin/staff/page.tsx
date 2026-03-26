"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, UserCog, UserCheck, ShieldCheck } from "lucide-react";
import { StaffModal } from "@/components/admin/staff-modal";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";

export default function ManageStaff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  async function fetchStaff() {
    try {
      const token = storage.getToken();
      const data = await apiRequest("/admin/staff", "GET", null, token);
      setStaff(data);
    } catch (err) {
      console.error("Failed to fetch staff", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredStaff = staff.filter(s => 
    s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Staff Management</h1>
            <p className="text-muted-foreground">Manage incharges, teachers, and school administrators.</p>
          </div>
          <Button 
            className="w-full md:w-auto gap-2 bg-primary text-white hover:opacity-90"
            onClick={() => { setSelectedStaff(null); setIsModalOpen(true); }}
          >
            <Plus className="h-4 w-4" /> Add Staff Member
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="p-1 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search staff by name or username..." 
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b bg-zinc-50/50">
                  <th className="p-4 font-semibold text-sm">Staff Member</th>
                  <th className="p-4 font-semibold text-sm">Role</th>
                  <th className="p-4 font-semibold text-sm">Status</th>
                  <th className="p-4 font-semibold text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Loading staff data...</td></tr>
                ) : filteredStaff.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No staff members found.</td></tr>
                ) : filteredStaff.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {s.full_name?.[0] || s.username[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{s.full_name || "N/A"}</p>
                          <p className="text-xs text-muted-foreground">@{s.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        s.role?.name === 'admin' ? 'bg-purple-100 text-purple-700' : 
                        s.role?.name === 'incharge' ? 'bg-blue-100 text-blue-700' : 'bg-zinc-100 text-zinc-700'
                      }`}>
                        {s.role?.name === 'admin' && <ShieldCheck className="h-3 w-3" />}
                        {s.role?.name === 'incharge' && <UserCog className="h-3 w-3" />}
                        {s.role?.name === 'teacher' && <UserCheck className="h-3 w-3" />}
                        {s.role?.name?.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                        <span className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2"></span>
                        <span className="text-xs font-medium text-green-700">Active</span>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedStaff(s); setIsModalOpen(true); }} className="text-primary hover:bg-primary/5">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <StaffModal 
          staff={selectedStaff} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchStaff} 
        />
      )}
    </div>
  );
}
