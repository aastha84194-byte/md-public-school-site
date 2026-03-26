"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-hooks";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { TeacherModal } from "@/components/admin/teacher-modal";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    try {
      const token = storage.getToken();
      const data = await apiRequest("/teachers/", "GET", null, token);
      setTeachers(data);
    } catch (err) {
      console.error("Failed to fetch teachers", err);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredTeachers = teachers.filter(t => 
    t.user?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    t.employee_id?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    try {
      const token = storage.getToken();
      await apiRequest(`/teachers/${id}`, "DELETE", null, token);
      setTeachers(teachers.filter(t => t.id !== id));
    } catch (err) {
      alert("Failed to delete teacher");
    }
  }

  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50">
      <Navbar />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Manage Teachers</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or employee ID..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button 
              className="w-full md:w-auto gap-2 bg-primary text-white hover:opacity-90"
              onClick={() => { setSelectedTeacher(null); setIsModalOpen(true); }}
            >
              <Plus className="h-4 w-4" /> Add New Teacher
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Salary (Base)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Loading...</TableCell></TableRow>
                ) : filteredTeachers.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10 text-slate-400">No teachers found.</TableCell></TableRow>
                ) : filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.employee_id}</TableCell>
                    <TableCell>{teacher.user?.full_name}</TableCell>
                    <TableCell>{teacher.department || "N/A"}</TableCell>
                    <TableCell>₹{teacher.salary}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 border-blue-100 hover:bg-blue-50"
                          onClick={() => { setSelectedTeacher(teacher); setIsModalOpen(true); }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 border-red-100 hover:bg-red-50"
                          onClick={() => handleDelete(teacher.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <TeacherModal 
          teacher={selectedTeacher} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchTeachers} 
        />
      )}
    </div>
  );
}
