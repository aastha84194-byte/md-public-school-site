"use client";

import { useState } from "react";

import { useLanguage } from "@/components/language-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Download, FileText, Send } from "lucide-react";

import { apiRequest } from "@/lib/api-client";

export default function AdmissionsPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    studentName: z.string().min(2, { message: t("Name must be at least 2 characters.", "नाम कम से कम 2 अक्षर का होना चाहिए।") }),
    className: z.string().min(1, { message: t("Please specify the class.", "कृपया कक्षा निर्दिष्ट करें।") }),
    previousSchool: z.string().optional(),
    parentName: z.string().min(2, { message: t("Parent name is required.", "माता-पिता का नाम आवश्यक है।") }),
    mobileNumber: z.string().min(10, { message: t("Valid 10-digit mobile number required.", "वैध 10-अंकीय मोबाइल नंबर आवश्यक है।") }).max(10),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      className: "",
      previousSchool: "",
      parentName: "",
      mobileNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const payload = {
        student_name: values.studentName,
        class_name: values.className,
        previous_school: values.previousSchool,
        parent_name: values.parentName,
        mobile_number: values.mobileNumber,
      };
      await apiRequest("/staff-forms/public/admission", "POST", payload);
      alert(t("Inquiry submitted successfully! We will contact you soon.", "पूछताछ सफलतापूर्वक सबमिट की गई! हम आपसे जल्द ही संपर्क करेंगे।"));
      form.reset();
    } catch (err: any) {
      alert(t("Failed to submit inquiry: ", "पूछताछ सबमिट करने में विफल: ") + err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const faqs = [
    {
      q: t("When do admissions open for the 2026-27 session?", "२०२६-२७ सत्र के लिए प्रवेश कब खुलेंगे?"),
      a: t("Admissions are currently open. You can apply using the form above or visit the campus.", "प्रवेश वर्तमान में खुले हैं। आप ऊपर दिए गए फॉर्म का उपयोग करके आवेदन कर सकते हैं या परिसर का दौरा कर सकते हैं।")
    },
    {
      q: t("What is the admission procedure?", "प्रवेश प्रक्रिया क्या है?"),
      a: t("Fill out the inquiry form. Our admission team will contact you to schedule a campus visit and interaction session.", "पूछताछ फॉर्म भरें। हमारी प्रवेश टीम परिसर के दौरे और बातचीत सत्र को निर्धारित करने के लिए आपसे संपर्क करेगी।")
    },
    {
      q: t("Is transportation available?", "क्या परिवहन उपलब्ध है?"),
      a: t("Yes, safe and secure bus facilities are available for all major routes in and around Sirsaganj.", "हां, सिरसागंज और उसके आसपास के सभी प्रमुख मार्गों के लिए सुरक्षित बस सुविधाएं उपलब्ध हैं।")
    }
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 bg-zinc-50 dark:bg-black py-16">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary dark:text-white sm:text-5xl">
              {t("Admissions", "प्रवेश")}
            </h1>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-secondary" />
            <p className="mt-4 text-lg text-muted-foreground">
              {t("Begin your journey to excellence at M.D. Public Inter College.", "एम. डी. पब्लिक इण्टर कॉलेज में उत्कृष्टता की अपनी यात्रा शुरू करें।")}
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Column: Downloads */}
            <div className="space-y-6 lg:col-span-4 lg:col-start-2">
               <Card className="border-none shadow-lg bg-primary text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">{t("Downloads", "डाउनलोड")}</CardTitle>
                  <CardDescription className="text-white/80">
                    {t("Essential documents for parents and prospective students.", "माता-पिता और संभावित छात्रों के लिए आवश्यक दस्तावेज।")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a href="#" className="group flex items-center justify-between rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-secondary" />
                      <div>
                        <h4 className="font-semibold text-white">{t("School Prospectus PDF", "स्कूल विवरणिका पीडीएफ")}</h4>
                        <p className="text-xs text-white/60">2.4 MB</p>
                      </div>
                    </div>
                    <Download className="h-5 w-5 text-white/80 group-hover:text-white" />
                  </a>
                  
                  <a href="#" className="group flex items-center justify-between rounded-lg bg-white/10 p-4 transition-colors hover:bg-white/20">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-secondary" />
                      <div>
                        <h4 className="font-semibold text-white">{t("Fee Structure 2026-27", "शुल्क संरचना 2026-27")}</h4>
                        <p className="text-xs text-white/60">1.1 MB</p>
                      </div>
                    </div>
                    <Download className="h-5 w-5 text-white/80 group-hover:text-white" />
                  </a>
                </CardContent>
              </Card>

              {/* FAQ Section underneath Downloads */}
              <div className="mt-12">
                 <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
                  {t("Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न")}
                </h2>
                <Accordion type="single" collapsible className="w-full bg-white dark:bg-zinc-900 shadow-sm rounded-lg border border-zinc-200 dark:border-zinc-800">
                  {faqs.map((faq, idx) => (
                    <AccordionItem value={`item-${idx}`} key={idx} className="px-4">
                      <AccordionTrigger className="text-left font-semibold text-zinc-900 dark:text-zinc-100 hover:text-primary">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Right Column: Admission Form */}
            <div className="lg:col-span-6">
              <Card className="border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <CardHeader className="border-b border-zinc-100 pb-6 dark:border-zinc-800">
                  <CardTitle className="text-2xl text-primary dark:text-white">
                    {t("Admission Inquiry Form", "प्रवेश पूछताछ फॉर्म")}
                  </CardTitle>
                  <CardDescription>
                    {t("Fill out the details below and our admission counselors will get in touch with you.", "नीचे दिए गए विवरण भरें और हमारे प्रवेश परामर्शदाता आपसे संपर्क करेंगे।")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="studentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("Student Name", "छात्र का नाम")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("Enter student's full name", "छात्र का पूरा नाम दर्ज करें")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                       <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="className"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Class to Apply For", "कक्षा")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("e.g. 9th, 11th Science", "उदा. 9वीं, 11वीं विज्ञान")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="previousSchool"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("Previous School", "पिछला स्कूल")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("Current/Last attended school", "वर्तमान/अंतिम स्कूल")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="parentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("Parent / Guardian Name", "अभिभावक का नाम")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("Enter parent's name", "अभिभावक का नाम दर्ज करें")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                       <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("Mobile Number", "मोबाइल नंबर")}</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder={t("10-digit mobile number", "10 अंकों का मोबाइल नंबर")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-secondary text-primary font-bold hover:bg-secondary/90 h-12 text-lg transition-transform hover:scale-[1.02]">
                        <Send className="mr-2 h-5 w-5" />
                        {t("Submit Inquiry", "पूछताछ सबमिट करें")}
                      </Button>
                    </form>
                  </Form>
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
