"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ArrowLeft, Search, FileText } from "lucide-react";
import Link from 'next/link';
import { ExamModal } from "@/components/admin/exam-modal";

export default function ManageExams() {
  const [exams, setExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  async function fetchExams() {
    try {
      const token = storage.getToken();
      const data = await apiRequest("/exams/", "GET", null, token);
      setExams(data);
    } catch (err) {
      console.error("Failed to fetch exams", err);
      // Fallback/Mock for UI demo
      setExams([
        { id: 1, title: "Half Yearly Examination", class_name: "10-A", date: "2024-09-15" },
        { id: 2, title: "Final Examination", class_name: "12-Science", date: "2024-03-20" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this exam schedule?")) return;
    try {
      const token = storage.getToken();
      await apiRequest(`/exams/${id}`, "DELETE", null, token);
      setExams(exams.filter(e => e.id !== id));
    } catch (err) {
      alert("Failed to delete exam");
    }
  }

  const filtered = exams.filter(e => e.title?.toLowerCase().includes(search.toLowerCase()));

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
            <h1 className="text-3xl font-bold text-slate-900">Exam Schedules</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search exams..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button 
                className="w-full md:w-auto gap-2 bg-primary text-white hover:opacity-90 transition-all shadow-md"
                onClick={() => { setSelectedExam(null); setIsModalOpen(true); }}
            >
              <Plus className="h-4 w-4" /> Schedule New Exam
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                  <p className="text-center col-span-full py-10 text-slate-400">Loading exams...</p>
              ) : filtered.length === 0 ? (
                  <p className="text-center col-span-full py-10 text-slate-400">No exams scheduled.</p>
              ) : filtered.map((exam) => (
                  <div key={exam.id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                              <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-slate-400 hover:text-blue-600"
                                onClick={() => { setSelectedExam(exam); setIsModalOpen(true); }}
                              >
                                  <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-slate-400 hover:text-red-600"
                                onClick={() => handleDelete(exam.id)}
                              >
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                          </div>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{exam.title}</h3>
                      <p className="text-sm text-slate-500 mb-4">Class: {exam.class_name}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{exam.date}</span>
                          <Button variant="link" className="text-primary p-0 h-auto font-bold text-xs uppercase tracking-widest">Details</Button>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </main>
      <Footer />
      {isModalOpen && (
        <ExamModal 
          exam={selectedExam} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchExams} 
        />
      )}
    </div>
  );
}
