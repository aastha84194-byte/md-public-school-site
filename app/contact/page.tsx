import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-sky-50/30">
      <Navbar />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">Contact Us</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <Card className="border-sky-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you shortly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Admission Inquiry" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea 
                        id="message" 
                        className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                        placeholder="How can we help you?" 
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-sky-100 shadow-sm h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800">Contact Information</CardTitle>
                  <CardDescription>
                    You can also reach us using the following contact details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-100 p-3 rounded-full text-sky-600 shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Address</h3>
                      <p className="text-slate-600 mt-1">
                        M.D. Public Inter College<br />
                        Sirsaganj, Firozabad<br />
                        Uttar Pradesh, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-100 p-3 rounded-full text-sky-600 shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Phone</h3>
                      <p className="text-slate-600 mt-1">
                        +91 98765 43210<br />
                        +91 12345 67890
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-100 p-3 rounded-full text-sky-600 shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Email</h3>
                      <p className="text-slate-600 mt-1">
                        info@mdpic.edu.in<br />
                        admissions@mdpic.edu.in
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-100 p-3 rounded-full text-sky-600 shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Office Hours</h3>
                      <p className="text-slate-600 mt-1">
                        Monday - Saturday: 8:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
