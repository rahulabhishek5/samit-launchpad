import { useState } from "react";
import { CheckCircle2, XCircle, Mail, MapPin, MessageCircle, Phone, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Item = {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  cta?: string;
};

const items: Item[] = [
  {
    icon: MapPin,
    label: "Visit us",
    value: "2nd Floor, Tech Park, MG Road, Bengaluru 560001",
    href: "https://maps.google.com/?q=MG+Road+Bengaluru",
    cta: "Get Directions",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 77948 99898",
    href: "tel:+917794899898",
    cta: "Call now",
  },
  {
    icon: Mail,
    label: "Email",
    value: "samittechnologys@gmail.in",
    href: "mailto:samittechnologys@gmail.in",
    cta: "Send email",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with admissions",
    href: "https://wa.me/917794899898",
    cta: "Open WhatsApp",
  },
];

// Production Backend URL Toggle
const FORM_ENDPOINT = "https://formspree.io/f/your_form_id";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    subject: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/[\s-]/g, "");
    return /^\+?[0-9]{10,14}$/.test(cleanPhone);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Completely bypass blur validation if the form just successfully submitted
    if (isSuccess) return;

    const { name, value } = e.target;
    if (name === "email" && value) {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Please enter a valid email format." }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
    if (name === "phone" && value) {
      if (!validatePhone(value)) {
        setErrors((prev) => ({ ...prev, phone: "Please enter a valid 10-digit phone number." }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && errors.email && validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (name === "phone" && errors.phone && validatePhone(value)) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    
    // 1. Bot Trap (Honeypot) Check
    if (honeypot) {
      console.warn("Spam detected. Submission silently dropped.");
      return; 
    }

    // 2. Strict State Validation
    let hasError = false;
    const newErrors = { email: "", phone: "", subject: "" };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email format.";
      hasError = true;
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
      hasError = true;
    }
    if (!formData.subject) {
      newErrors.subject = "Please select a course domain.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // 3. API Fetch Execution
    setIsLoading(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      // Success State Handlers
      setIsSuccess(true);
      
      // Wipe the form entirely while bypassing validation bugs
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({ email: "", phone: "", subject: "" });

      // Automatically hide the success banner after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (error) {
      console.error("Submission failed:", error);
      // Keep the form data intact so the user doesn't lose their message
      setGlobalError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-surface section-y content-lazy">
      <div className="container-tight">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Talk to our admissions team"
            description="Reach out for course details, demo classes, or campus visits — we usually reply within a few hours."
          />
          <h2 id="contact-heading" className="sr-only">
            Contact SamIT Technology
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 sm:mt-16 items-start">
          {/* Left Side: Contact Information */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {items.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <a
                  href={item.href}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-start gap-4 sm:gap-5 rounded-2xl border border-border/50 bg-card/40 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/80 hover:shadow-sm"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/12 bg-primary-soft text-primary shadow-soft transition-colors group-hover:bg-primary/10">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                    <span className="mt-1 text-sm sm:text-base font-semibold text-foreground">{item.value}</span>
                    {item.cta && <span className="mt-1.5 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">{item.cta} →</span>}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Right Side: Contact Form */}
          <Reveal delay={200}>
            <Card className="border-border/55 bg-card/98 shadow-card w-full relative overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                
                {/* Success Banner */}
                {isSuccess && (
                  <div className="mb-6 rounded-lg bg-green-500/10 p-4 border border-green-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                      Message sent successfully! We'll be in touch soon.
                    </p>
                  </div>
                )}

                {/* Global Error Banner */}
                {globalError && (
                  <div className="mb-6 rounded-lg bg-red-500/10 p-4 border border-red-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      {globalError}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  
                  {/* Honeypot Field (Spam Mitigation) */}
                  <input
                    type="text"
                    name="b_username"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="sr-only"
                  />

                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Your full name" 
                      required 
                      disabled={isLoading}
                      className="bg-background/50 transition-colors" 
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        placeholder="you@example.com" 
                        required 
                        disabled={isLoading}
                        className={`bg-background/50 pr-12 transition-colors ${errors.email ? "border-red-500 focus-visible:ring-red-500" : (formData.email && validateEmail(formData.email) ? "border-green-500 focus-visible:ring-green-500" : "")}`} 
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {formData.email && validateEmail(formData.email) && !errors.email && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 animate-in fade-in zoom-in duration-300" />
                        )}
                        {errors.email && (
                          <XCircle className="h-5 w-5 text-red-500 animate-in fade-in zoom-in duration-300" />
                        )}
                      </div>
                    </div>
                    {errors.email && <p className="text-sm font-medium text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">{errors.email}</p>}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        placeholder="+91 98765 43210" 
                        required 
                        disabled={isLoading}
                        className={`bg-background/50 pr-12 transition-colors ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : (formData.phone && validatePhone(formData.phone) ? "border-green-500 focus-visible:ring-green-500" : "")}`} 
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        {formData.phone && validatePhone(formData.phone) && !errors.phone && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 animate-in fade-in zoom-in duration-300" />
                        )}
                        {errors.phone && (
                          <XCircle className="h-5 w-5 text-red-500 animate-in fade-in zoom-in duration-300" />
                        )}
                      </div>
                    </div>
                    {errors.phone && <p className="text-sm font-medium text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">{errors.phone}</p>}
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject / Course Domain</Label>
                    <Select onValueChange={handleSubjectChange} value={formData.subject} disabled={isLoading}>
                      <SelectTrigger className={`bg-background/50 transition-colors ${errors.subject ? "border-red-500 focus:ring-red-500" : ""}`}>
                        <SelectValue placeholder="Select a subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Data Science, Artificial Intelligence (AI) & Machine Learning">Data Science, Artificial Intelligence (AI) & Machine Learning</SelectItem>
                        <SelectItem value="Data Analytics & Business Intelligence (BI)">Data Analytics & Business Intelligence (BI)</SelectItem>
                        <SelectItem value="Cloud Data Engineering & Modern Data Stack">Cloud Data Engineering & Modern Data Stack</SelectItem>
                        <SelectItem value="Microsoft Business Applications & Low-Code Ecosystem">Microsoft Business Applications & Low-Code Ecosystem</SelectItem>
                        <SelectItem value="Cybersecurity & Ethical Hacking">Cybersecurity & Ethical Hacking</SelectItem>
                        <SelectItem value="Software Testing & QA Automation">Software Testing & QA Automation</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="text-sm font-medium text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">{errors.subject}</p>}
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Get In Touch</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="How can we help you?" 
                      rows={4} 
                      required 
                      disabled={isLoading}
                      className="bg-background/50 resize-none transition-colors" 
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full mt-2" size="lg" disabled={isLoading || isSuccess}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : isSuccess ? (
                      "Sent!"
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  
                </form>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
