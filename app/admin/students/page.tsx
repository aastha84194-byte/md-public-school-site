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
import { StudentModal } from "@/components/admin/student-modal";

export default function ManageStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const token = storage.getToken();
      const data = await apiRequest("/students/", "GET", null, token);
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredStudents = students.filter(s => 
    s.user?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.admission_number?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      const token = storage.getToken();
      await apiRequest(`/students/${id}`, "DELETE", null, token);
      setStudents(students.filter(s => s.id !== id));
    } catch (err) {
      alert("Failed to delete student");
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
            <h1 className="text-3xl font-bold text-slate-900">Manage Students</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or admission number..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <div className="relative">
                    <input 
                        type="file" 
                        id="excel-upload" 
                        className="hidden" 
                        accept=".xlsx,.xlsm"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            
                            const formData = new FormData();
                            formData.append("file", file);
                            
                            try {
                                const token = storage.getToken();
                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/students/import`, {
                                    method: "POST",
                                    headers: { "Authorization": `Bearer ${token}` },
                                    body: formData
                                });
                                const result = await res.json();
                                if (res.ok) {
                                    alert(`Successfully imported ${result.imported} of ${result.total} students!`);
                                    fetchStudents();
                                } else {
                                    alert("Import failed: " + result.detail);
                                }
                            } catch (err) {
                                alert("Failed to upload file");
                            }
                        }}
                    />
                    <Button 
                        variant="outline"
                        className="gap-2 border-primary text-primary hover:bg-primary hover:text-white"
                        onClick={() => document.getElementById('excel-upload')?.click()}
                    >
                        Bulk Import (Excel)
                    </Button>
                </div>
                <Button 
                className="gap-2 bg-primary text-white hover:opacity-90"
                onClick={() => { setSelectedStudent(null); setIsModalOpen(true); }}
                >
                <Plus className="h-4 w-4" /> Add New Student
                </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow>
                  <TableHead>Admission No</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Loading...</TableCell></TableRow>
                ) : filteredStudents.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10 text-slate-400">No students found.</TableCell></TableRow>
                ) : filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.admission_number}</TableCell>
                    <TableCell>{student.user?.full_name}</TableCell>
                    <TableCell>{student.class_name}</TableCell>
                    <TableCell>{student.guardian_name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 border-blue-100 hover:bg-blue-50"
                          onClick={() => { setSelectedStudent(student); setIsModalOpen(true); }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 border-red-100 hover:bg-red-50"
                          onClick={() => handleDelete(student.id)}
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
        <StudentModal 
          student={selectedStudent} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchStudents} 
        />
      )}
    </div>
  );
}
