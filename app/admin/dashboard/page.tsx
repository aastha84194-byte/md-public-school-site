"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-hooks";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Calendar, FileText, Settings, Upload } from "lucide-react";
import Link from 'next/link';
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [isImporting, setIsImporting] = React.useState(false);
  const [importType, setImportType] = React.useState<"students" | "teachers">("students");

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsImporting(true);
      const token = storage.getToken();
      const endpoint = importType === "students" ? "/admin/import/students" : "/admin/import/teachers";
      const result = await apiRequest(endpoint, "POST", formData, token);
      
      alert(`Import Successful! \nSuccess: ${result.success}\nFailed: ${result.failed}`);
      if (result.errors && result.errors.length > 0) {
        console.error("Import Errors:", result.errors);
      }
    } catch (err: any) {
      alert("Import failed: " + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  const stats = [
    { title: "Total Students", value: "1,234", icon: GraduationCap, color: "text-blue-600" },
    { title: "Total Teachers", value: "86", icon: Users, color: "text-green-600" },
    { title: "Active Classes", value: "24", icon: Calendar, color: "text-purple-600" },
    { title: "Pending Inquiries", value: "12", icon: FileText, color: "text-orange-600" },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50">
      <Navbar />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">Admin Dashboard</h1>
              <p className="text-slate-500 mt-1">Welcome back, {user?.full_name}</p>
            </div>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 bg-white px-4 py-2 border rounded-md hover:bg-zinc-50 transition-colors cursor-pointer shadow-sm active:scale-95">
                <Upload className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium">Bulk Import</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".xlsx, .xls, .csv" 
                  onChange={handleExcelUpload}
                  disabled={isImporting}
                />
              </label>
              <select 
                className="bg-white px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                value={importType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setImportType(e.target.value as any)}
              >
                <option value="students">Students</option>
                <option value="teachers">Teachers</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-slate-900">
                  <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-none shadow-sm">
              <CardHeader className="text-slate-900">
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
                        JD
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">New student admission: John Doe</p>
                        <p className="text-xs text-slate-400">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="text-slate-900">
                <CardTitle>Management Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {[
                  { label: "Students", href: "/admin/students" },
                  { label: "Staff", href: "/admin/staff" },
                  { label: "Teachers", href: "/admin/teachers" },
                  { label: "Classes", href: "/admin/classes" },
                  { label: "Fees", href: "/admin/fees" },
                  { label: "Exams", href: "/admin/exams" },
                  { label: "Attendance", href: "/admin/attendance" },
                ].map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href}
                    className="p-4 border rounded-xl hover:border-primary hover:text-primary transition-all text-center font-medium text-slate-700 hover:bg-zinc-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
