import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api-client";
import { storage } from "@/lib/storage";

interface StudentModalProps {
  student?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function StudentModal({ student, onClose, onSuccess }: StudentModalProps) {
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
    const rawData = Object.fromEntries(formData.entries());
    
    // Structure data for backend (nested guardian)
    const data = {
        full_name: rawData.full_name,
        admission_number: rawData.admission_number,
        date_of_birth: rawData.date_of_birth,
        gender: rawData.gender,
        aadhaar_number: rawData.aadhaar_number,
        religion: rawData.religion,
        social_category: rawData.social_category,
        mother_tongue: rawData.mother_tongue,
        date_of_admission: rawData.date_of_admission,
        is_bpl: rawData.is_bpl === "on",
        habitation: rawData.habitation,
        address: rawData.address,
        class_id: parseInt(rawData.class_id as string),
        guardian: {
            father_name: rawData.father_name,
            mother_name: rawData.mother_name,
            guardian_name: rawData.guardian_name,
            aadhaar_number: rawData.parent_aadhaar,
            contact_number: rawData.parent_contact,
            email: rawData.parent_email,
        }
    };
    
    try {
      const token = storage.getToken();
      if (student) {
        await apiRequest(`/students/${student.id}`, "PUT", data, token);
      } else {
        await apiRequest("/students/", "POST", data, token);
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b bg-zinc-50/50 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">{student ? "Edit Student Record" : "New Student Registration"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400">✕</Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Section 1: Basic Identity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Basic Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Full Name (as per ID) *</Label>
                    <Input name="full_name" defaultValue={student?.user?.full_name} placeholder="e.g. Rahul Sharma" required minLength={3} pattern="^[a-zA-Z\s]+$" title="Name should only contain letters and spaces" />
                </div>
                <div className="space-y-2">
                    <Label>Admission Number *</Label>
                    <Input name="admission_number" defaultValue={student?.admission_number} placeholder="REG/2024/001" required minLength={4} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Date of Birth *</Label>
                    <Input name="date_of_birth" type="date" defaultValue={student?.date_of_birth} required />
                </div>
                <div className="space-y-2">
                    <Label>Gender *</Label>
                    <select name="gender" className="w-full px-4 py-2 border rounded-lg bg-zinc-50 text-sm focus:ring-2 focus:ring-primary outline-none" defaultValue={student?.gender} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label>Student's Aadhaar</Label>
                    <Input name="aadhaar_number" defaultValue={student?.aadhaar_number} placeholder="12-digit number" pattern="^\d{12}$" title="Aadhaar must be exactly 12 digits" />
                </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          {/* Section 2: Academic & Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Academic & Social Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Assign Class *</Label>
                    <select name="class_id" className="w-full px-4 py-2 border rounded-lg bg-zinc-50 text-sm focus:ring-2 focus:ring-primary outline-none" defaultValue={student?.class_id} required>
                        <option value="">Select Class</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label>Religion</Label>
                    <Input name="religion" defaultValue={student?.religion} placeholder="e.g. Hindu, Muslim, etc." />
                </div>
                <div className="space-y-2">
                    <Label>Social Category</Label>
                    <select name="social_category" className="w-full px-4 py-2 border rounded-lg bg-zinc-50 text-sm focus:ring-2 focus:ring-primary outline-none" defaultValue={student?.social_category}>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Mother Tongue</Label>
                    <Input name="mother_tongue" defaultValue={student?.mother_tongue} placeholder="e.g. Hindi, Punjabi" />
                </div>
                <div className="space-y-2">
                    <Label>Date of Admission</Label>
                    <Input name="date_of_admission" type="date" defaultValue={student?.date_of_admission} />
                </div>
                <div className="flex items-center gap-2 pt-8">
                    <input type="checkbox" name="is_bpl" id="is_bpl" defaultChecked={student?.is_bpl} className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary" />
                    <Label htmlFor="is_bpl" className="cursor-pointer">Belongs to BPL?</Label>
                </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          {/* Section 3: Guardian Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Parent / Guardian Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Father's Name *</Label>
                    <Input name="father_name" defaultValue={student?.guardian?.father_name} placeholder="Mr. Name" required />
                </div>
                <div className="space-y-2">
                    <Label>Mother's Name *</Label>
                    <Input name="mother_name" defaultValue={student?.guardian?.mother_name} placeholder="Mrs. Name" required />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Guardian Name (if any)</Label>
                    <Input name="guardian_name" defaultValue={student?.guardian?.guardian_name} />
                </div>
                <div className="space-y-2">
                    <Label>Primary Contact Number *</Label>
                    <Input name="parent_contact" defaultValue={student?.guardian?.contact_number} placeholder="+91 XXXXX XXXXX" required pattern="^[\d\+\-\s]{10,15}$" title="Enter a valid contact number" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Parent's Aadhaar</Label>
                    <Input name="parent_aadhaar" defaultValue={student?.guardian?.aadhaar_number} placeholder="12-digit number" />
                </div>
                <div className="space-y-2">
                    <Label>Parent's Email</Label>
                    <Input name="parent_email" type="email" defaultValue={student?.guardian?.email} placeholder="parent@example.com" />
                </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          {/* Section 4: Residential */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Residential Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Habitation / Locality</Label>
                    <Input name="habitation" defaultValue={student?.habitation} placeholder="e.g. Ward No. 5, Sector 4" />
                </div>
                <div className="space-y-2">
                    <Label>Full Address *</Label>
                    <Input name="address" defaultValue={student?.address} required placeholder="Full postal address" />
                </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t mt-6 bg-white sticky bottom-0 z-10 p-4 -m-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-primary text-white px-8">
              {loading ? "Registering..." : student ? "Update Record" : "Register Student"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
