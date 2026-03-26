"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ArrowLeft, Search, GraduationCap, Calendar } from "lucide-react";
import Link from 'next/link';
import { FeeStructureModal } from "@/components/admin/fee-structure-modal";

export default function ManageFeeStructures() {
  const [structures, setStructures] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStructure, setSelectedStructure] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const token = storage.getToken();
      const [structuresData, classesData] = await Promise.all([
        apiRequest("/fees/structures", "GET", null, token),
        apiRequest("/academic/classes/", "GET", null, token) // Corrected class path
      ]);
      setStructures(structuresData);
      setClasses(classesData);
    } catch (err) {
      console.error("Failed to fetch data", err);
      // Fallback/Mock
      setStructures([
        { id: 1, class_id: 1, class_name: "10-A", fee_type: "tuition", amount: 5000, month: "April" },
      ]);
      setClasses([{ id: 1, name: "10-A" }]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure? This will not affect existing payments but will remove the template for new ones.")) return;
    try {
      const token = storage.getToken();
      await apiRequest(`/fees/structures/${id}`, "DELETE", null, token);
      setStructures(structures.filter(s => s.id !== id));
    } catch (err) {
      alert("Failed to delete record");
    }
  }

  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50">
      <Navbar />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/fees">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Fee Structures</h1>
            <div className="flex-1" />
            <Button 
                onClick={() => { setSelectedStructure(null); setIsModalOpen(true); }}
                className="gap-2 bg-primary text-white hover:opacity-90"
            >
                <Plus className="h-4 w-4" /> Define New Fee
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                <Table>
                  <TableHeader className="bg-zinc-50">
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-10">Loading structures...</TableCell></TableRow>
                    ) : structures.length === 0 ? (
                      <TableRow><TableCell colSpan={5} className="text-center py-10 text-slate-400">No fee structures defined yet.</TableCell></TableRow>
                    ) : structures.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-bold">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-primary" />
                                {classes.find(c => c.id === s.class_id)?.name || `Class ID: ${s.class_id}`}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2 text-slate-500">
                                <Calendar className="h-4 w-4" />
                                {s.month || "Every Month"}
                            </div>
                        </TableCell>
                        <TableCell className="capitalize">{s.fee_type}</TableCell>
                        <TableCell className="font-bold text-slate-900">₹{s.amount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-blue-600"
                                onClick={() => { setSelectedStructure(s); setIsModalOpen(true); }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 text-red-600"
                                onClick={() => handleDelete(s.id)}
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
        </div>
      </main>
      <Footer />
      {isModalOpen && (
        <FeeStructureModal 
          structure={selectedStructure}
          classes={classes}
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchData} 
        />
      )}
    </div>
  );
}
