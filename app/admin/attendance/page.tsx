"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Calendar, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import Link from 'next/link';

export default function ManageAttendance() {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses() {
    try {
      const token = storage.getToken();
      const data = await apiRequest("/academic/classes/", "GET", null, token);
      setClasses(data);
      if (data.length > 0) setSelectedClass(data[0].id.toString());
    } catch (err) {
      console.error("Failed to fetch classes", err);
    }
  }

  useEffect(() => {
    if (selectedClass) {
      fetchAttendance();
    }
  }, [selectedClass, currentDate]);

  async function fetchAttendance() {
    setIsLoading(true);
    try {
      const token = storage.getToken();
      // This is a mockup of attendance fetching
      const data = await apiRequest(`/attendance/class/${selectedClass}?date=${currentDate}`, "GET", null, token);
      setAttendance(data);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
      // Fallback/Mock for UI demo
      setAttendance([
        { id: 1, student_name: "John Doe", status: "present" },
        { id: 2, student_name: "Jane Smith", status: "absent" },
        { id: 3, student_name: "Robert Brown", status: "present" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50">
      <Navbar />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-slate-900">Attendance Tracker</h1>
            </div>
            <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-zinc-100 shadow-sm">
                <Button variant="ghost" size="icon" onClick={() => {
                    const d = new Date(currentDate);
                    d.setDate(d.getDate() - 1);
                    setCurrentDate(d.toISOString().split('T')[0]);
                }}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 px-3 font-medium text-slate-700">
                    <Calendar className="h-4 w-4 text-primary" />
                    {currentDate}
                </div>
                <Button variant="ghost" size="icon" onClick={() => {
                    const d = new Date(currentDate);
                    d.setDate(d.getDate() + 1);
                    setCurrentDate(d.toISOString().split('T')[0]);
                }}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-zinc-100">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Select Class:</span>
                <select 
                    className="flex-1 md:w-64 px-4 py-2 bg-zinc-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="text-green-600 border-green-100 hover:bg-green-50">Mark All Present</Button>
                <Button className="bg-primary text-white">Save Changes</Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-10">Loading attendance data...</TableCell></TableRow>
                ) : attendance.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-10 text-slate-400">No students in this class.</TableCell></TableRow>
                ) : attendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-semibold text-slate-700">{record.student_name}</TableCell>
                    <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            record.status === "present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                            {record.status}
                        </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className={`h-8 gap-1 ${record.status === "present" ? "bg-green-50 text-green-600 border-green-100" : ""}`}
                            onClick={() => {
                                setAttendance(prev => prev.map(a => a.id === record.id ? {...a, status: 'present'} : a));
                            }}
                        >
                          <Check className="h-3 w-3" /> Present
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className={`h-8 gap-1 ${record.status === "absent" ? "bg-red-50 text-red-600 border-red-100" : ""}`}
                            onClick={() => {
                                setAttendance(prev => prev.map(a => a.id === record.id ? {...a, status: 'absent'} : a));
                            }}
                        >
                          <X className="h-3 w-3" /> Absent
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
    </div>
  );
}
