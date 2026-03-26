"use client";

import { useAuth } from "@/lib/auth-hooks";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckSquare, ClipboardList, UserCheck, MessageSquare, FileText, Calendar } from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useAuth();

  const teacherStats = [
    { title: "Your Classes", value: "4", icon: BookOpen, color: "text-blue-600" },
    { title: "Attendance Today", value: "92%", icon: UserCheck, color: "text-green-600" },
    { title: "Pending Marks", value: "2 Sets", icon: ClipboardList, color: "text-orange-600" },
    { title: "New Messages", value: "5", icon: MessageSquare, color: "text-purple-600" },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50">
      <Navbar />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Teacher Dashboard</h1>
              <p className="text-slate-500">Academic Year 2026-27 | {user?.full_name}</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teacherStats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
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
                <CardTitle>Schedule & Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "08:30 AM", class: "10th A", subject: "Mathematics", status: "Completed" },
                    { time: "10:00 AM", class: "11th B", subject: "Physics", status: "Up Next" },
                    { time: "11:30 AM", class: "9th C", subject: "Mathematics", status: "Upcoming" },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-sky-50 text-sky-600 rounded-lg font-bold text-xs">
                          {session.time}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{session.class} - {session.subject}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        session.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-primary text-white rounded-xl hover:opacity-95 transition-opacity">
                  <span className="font-medium">Mark Attendance</span>
                  <CheckSquare className="h-5 w-5" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-secondary text-primary rounded-xl hover:opacity-95 transition-opacity">
                  <span className="font-medium">Upload Marks</span>
                  <FileText className="h-5 w-5" />
                </button>
                <button className="w-full flex items-center justify-between p-4 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">
                  <span className="font-medium">Leave Request</span>
                  <Calendar className="h-5 w-5 text-slate-400" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
