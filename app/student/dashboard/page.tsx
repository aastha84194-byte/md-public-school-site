"use client";

import { useAuth } from "@/lib/auth-hooks";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Award, CreditCard, UserCheck, Download } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();

  const studentStats = [
    { title: "Attendance", value: "88%", icon: UserCheck, color: "text-green-600" },
    { title: "Last Result", value: "8.4 CGPA", icon: Award, color: "text-blue-600" },
    { title: "Fees Status", value: "Paid", icon: CreditCard, color: "text-purple-600" },
    { title: "Enrolled Subjects", value: "6", icon: BookOpen, color: "text-orange-600" },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50">
      <Navbar />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
              <p className="text-slate-500">Welcome, {user?.full_name} | Class: 10th-A</p>
            </div>
            <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full hover:opacity-95 transition-all shadow-lg hover:shadow-xl active:scale-95">
              <Download className="h-4 w-4" /> Download Report Card
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studentStats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm h-full group hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-zinc-50 group-hover:bg-white transition-colors`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-none shadow-sm">
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { subject: "Mathematics", score: 85, color: "bg-blue-500" },
                    { subject: "Science", score: 78, color: "bg-green-500" },
                    { subject: "English", score: 92, color: "bg-purple-500" },
                    { subject: "History", score: 70, color: "bg-orange-500" },
                  ].map((sub, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-700">{sub.subject}</span>
                        <span className="font-bold">{sub.score}%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${sub.color} transition-all duration-1000`} 
                          style={{ width: `${sub.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Final Exams Schedule", date: "Oct 15, 2026" },
                    { title: "Annual Sports Meet", date: "Nov 05, 2026" },
                    { title: "Holiday Notice", date: "Sep 20, 2026" },
                  ].map((news, i) => (
                    <div key={i} className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 hover:bg-sky-50 transition-colors">
                      <p className="text-sm font-bold text-slate-900">{news.title}</p>
                      <p className="text-xs text-sky-600 mt-1">{news.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
