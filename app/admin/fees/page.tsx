"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ArrowLeft, Search, CreditCard, DollarSign } from "lucide-react";
import Link from 'next/link';
import { FeeModal } from "@/components/admin/fee-modal";

export default function ManageFees() {
  const [fees, setFees] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const token = storage.getToken();
      const [paymentsData, studentsData] = await Promise.all([
        apiRequest("/fees/payments/", "GET", null, token),
        apiRequest("/students/", "GET", null, token)
      ]);
      setFees(paymentsData);
      setStudents(studentsData);
    } catch (err) {
      console.error("Failed to fetch data", err);
      // Fallback/Mock for UI demo
      setFees([
        { id: 1, student_name: "John Doe", amount: 5000, status: "paid", date: "2024-03-20" },
      ]);
      setStudents([
        { id: 1, user: { full_name: "John Doe" }, admission_number: "101", school_class: { name: "10-A" } },
        { id: 2, user: { full_name: "Jane Smith" }, admission_number: "102", school_class: { name: "10-B" } },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this payment record?")) return;
    try {
      const token = storage.getToken();
      await apiRequest(`/fees/payments/${id}`, "DELETE", null, token);
      setFees(fees.filter(f => f.id !== id));
    } catch (err) {
      alert("Failed to delete record");
    }
  }

  const filteredFees = fees.filter(f => f.student_name?.toLowerCase().includes(search.toLowerCase()));
  const filteredStudents = students.filter(s => 
    s.user?.full_name?.toLowerCase().includes(studentSearch.toLowerCase()) || 
    s.admission_number?.includes(studentSearch)
  );

  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50">
      <Navbar />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Fee Management</h1>
            <div className="flex-1" />
            <Link href="/admin/fees/structures">
                <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
                    <CreditCard className="h-4 w-4" /> Manage Fee Structures
                </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Student Search & Selection */}
            <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Search className="h-5 w-5 text-primary" /> Select Student for Entry
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search student by name or admission no..."
                            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={studentSearch}
                            onChange={(e) => setStudentSearch(e.target.value)}
                        />
                    </div>
                    <div className="max-h-[400px] overflow-y-auto border rounded-xl divide-y">
                        {filteredStudents.length === 0 ? (
                            <div className="p-10 text-center text-slate-400">No students found</div>
                        ) : filteredStudents.map(s => (
                            <div 
                                key={s.id} 
                                className="p-4 flex items-center justify-between hover:bg-zinc-50 cursor-pointer group transition-colors"
                                onClick={() => { setSelectedStudent(s); setSelectedPayment(null); setIsModalOpen(true); }}
                            >
                                <div>
                                    <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{s.user?.full_name}</p>
                                    <p className="text-xs text-slate-500">Adm No: {s.admission_number} | Class: {s.school_class?.name}</p>
                                </div>
                                <Plus className="h-5 w-5 text-slate-300 group-hover:text-primary" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Recent Payments Table */}
            <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Collected</p>
                        <p className="text-2xl font-bold text-slate-900">₹45,200</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <DollarSign className="h-6 w-6" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                    <div className="p-4 border-b bg-zinc-50/50 flex items-center justify-between">
                        <h3 className="font-bold">Recent Payments</h3>
                        <div className="relative w-48">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Filter records..."
                                className="w-full pl-7 pr-3 py-1 bg-white border rounded-md text-xs"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <Table>
                        <TableHeader className="bg-zinc-50/50">
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right whitespace-nowrap">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow><TableCell colSpan={4} className="text-center py-10">Loading...</TableCell></TableRow>
                            ) : filteredFees.length === 0 ? (
                                <TableRow><TableCell colSpan={4} className="text-center py-10 text-slate-400 text-xs">No records</TableCell></TableRow>
                            ) : filteredFees.map((f) => (
                                <TableRow key={f.id} className="text-sm">
                                    <TableCell className="font-medium whitespace-nowrap">{f.student_name}</TableCell>
                                    <TableCell>₹{f.amount}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                            f.status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                        }`}>
                                            {f.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-7 w-7 text-red-500"
                                            onClick={() => handleDelete(f.id)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {isModalOpen && (
        <FeeModal 
          payment={selectedPayment} 
          student={selectedStudent}
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchData} 
        />
      )}
    </div>
  );
}
