"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";

const months: string[] = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

interface FeeModalProps {
  payment?: any;
  student?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function FeeModal({ payment, student, onClose, onSuccess }: FeeModalProps) {
  const [loading, setLoading] = useState(false);
  const [structures, setStructures] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(payment?.month || months[new Date().getMonth()]);
  const [currentStructure, setCurrentStructure] = useState<any>(null);

  useEffect(() => {
    if (student) {
        fetchStructures(student.class_id);
    }
  }, [student]);

  useEffect(() => {
    const struct = structures.find(s => s.month === selectedMonth && s.fee_type === "tuition");
    setCurrentStructure(struct);
  }, [selectedMonth, structures]);

  async function fetchStructures(classId: number) {
    try {
        const token = storage.getToken();
        const data = await apiRequest(`/fees/structures/class/${classId}`, "GET", null, token);
        setStructures(data);
    } catch (err) {
        console.error("Failed to fetch structures", err);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.student_id && student) {
        data.student_id = student.id.toString();
    }
    
    try {
      const token = storage.getToken();
      if (payment) {
        await apiRequest(`/fees/payments/${payment.id}`, "PUT", data, token);
      } else {
        await apiRequest("/fees/payments", "POST", data, token);
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
        <div className="p-6 border-b bg-zinc-50/50">
          <h2 className="text-xl font-bold">{payment ? "Edit Payment" : "Collect Fee"}</h2>
          {student && (
              <p className="text-sm text-slate-500 mt-1">
                  For: <span className="font-bold text-slate-900">{student.user?.full_name}</span> ({student.admission_number})
              </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Month</Label>
                <select 
                    name="month" 
                    className="w-full px-4 py-2 border rounded-lg bg-zinc-50 text-sm"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    required
                >
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Amount Paid (₹) *</Label>
                <Input name="amount_paid" type="number" defaultValue={payment?.amount_paid || currentStructure?.amount} placeholder="5000" key={currentStructure?.id} required min="0" />
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fine (₹)</Label>
                <Input name="fine_amount" type="number" defaultValue={payment?.fine_amount || 0} placeholder="0" min="0" />
              </div>
              <div className="space-y-2">
                <Label>Scholarship (₹)</Label>
                <Input name="scholarship_amount" type="number" defaultValue={payment?.scholarship_amount || 0} placeholder="0" min="0" />
              </div>
          </div>

          <div className="space-y-2">
            <Label>Date *</Label>
            <Input name="payment_date" type="date" defaultValue={payment?.payment_date || new Date().toISOString().split('T')[0]} required />
          </div>

          <div className="space-y-2">
            <Label>Transaction ID (Optional)</Label>
            <Input name="transaction_id" placeholder="TXN12345" defaultValue={payment?.transaction_id} minLength={5} />
          </div>

          <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700 flex justify-between items-center">
              <div>
                <p>Expected Basic: <span className="font-bold">₹{currentStructure?.amount || 0}</span></p>
                <p className="italic opacity-80">Based on predefined structure for {selectedMonth}</p>
              </div>
              {!currentStructure && (
                  <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded">No template found</span>
              )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-primary text-white">
              {loading ? "Saving..." : "Record Payment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
