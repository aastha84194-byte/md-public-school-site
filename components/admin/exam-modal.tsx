"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";

interface ExamModalProps {
  exam?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function ExamModal({ exam, onClose, onSuccess }: ExamModalProps) {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  async function fetchClasses() {
    try {
        const token = storage.getToken();
        const data = await apiRequest("/academic/classes/", "GET", null, token);
        setClasses(data);
    } catch (err) {
        console.error("Failed to fetch classes", err);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const token = storage.getToken();
      if (exam) {
        await apiRequest(`/exams/${exam.id}`, "PUT", data, token);
      } else {
        await apiRequest("/exams/", "POST", data, token);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">{exam ? "Edit Exam" : "Schedule Exam"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Exam Title</Label>
            <Input name="title" defaultValue={exam?.title} placeholder="Half Yearly" required />
          </div>
          <div className="space-y-2">
            <Label>Class</Label>
            <select 
                name="class_id" 
                className="w-full px-4 py-2 border rounded-lg bg-zinc-50"
                defaultValue={exam?.class_id}
                required
            >
                <option value="">Select Class</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Exam Type</Label>
            <select name="exam_type" className="w-full px-4 py-2 border rounded-lg bg-zinc-50" defaultValue={exam?.exam_type || "MIDTERM"}>
                <option value="MIDTERM">Midterm</option>
                <option value="FINAL">Final</option>
                <option value="UNIT_TEST">Unit Test</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input name="date" type="date" defaultValue={exam?.date} required />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-primary text-white">
              {loading ? "Saving..." : "Schedule"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
