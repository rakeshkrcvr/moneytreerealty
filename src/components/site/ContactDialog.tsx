import { createContext, useCallback, useContext, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Phone, MapPin, Mail } from "lucide-react";

interface Ctx {
  open: (subject?: string) => void;
  close: () => void;
}

const ContactCtx = createContext<Ctx | null>(null);

export function useContactDialog() {
  const ctx = useContext(ContactCtx);
  if (!ctx) throw new Error("useContactDialog must be used within ContactDialogProvider");
  return ctx;
}

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Phone is required").max(30),
  country: z.string().trim().min(1, "Select a country").max(80),
  message: z.string().trim().max(1000).optional(),
});

export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const open = useCallback((s?: string) => {
    setSubject(s);
    setErrors({});
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      toast.success("Thank you! Our specialist will be in touch shortly.");
      e.currentTarget?.reset?.();
    }, 700);
  };

  return (
    <ContactCtx.Provider value={{ open, close }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0">
          <div className="grid md:grid-cols-5">
            <div className="hidden md:flex md:col-span-2 flex-col justify-between bg-ink text-white p-8">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Golden Door Realty</p>
                <h3 className="text-2xl leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                  Get in touch with our property specialists
                </h3>
                <p className="text-sm text-white/70 mt-4">
                  Tell us a bit about you and we'll reach out with floor plans, payment options
                  and exclusive launch pricing.
                </p>
              </div>
              <div className="space-y-3 text-sm text-white/80 mt-8">
                <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold" /> +971 800 36227</p>
                <p className="flex items-center gap-3"><Mail className="w-4 h-4 text-gold" /> sales@goldendoorrealty.com</p>
                <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gold" /> Sales Centre, Downtown Dubai</p>
              </div>
            </div>

            <div className="md:col-span-3 p-8">
              <DialogHeader className="text-left mb-6">
                <DialogTitle className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                  Register Your Interest
                </DialogTitle>
                <DialogDescription>
                  {subject ? `Enquiry about ${subject}` : "We'll respond within one business day."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit} className="space-y-3" noValidate>
                {subject && <input type="hidden" name="subject" value={subject} />}
                <div className="grid grid-cols-2 gap-3">
                  <Field name="firstName" placeholder="First Name" error={errors.firstName} maxLength={60} />
                  <Field name="lastName" placeholder="Last Name" error={errors.lastName} maxLength={60} />
                </div>
                <Field name="email" type="email" placeholder="Email Address" error={errors.email} maxLength={255} />
                <Field name="phone" type="tel" placeholder="Phone Number" error={errors.phone} maxLength={30} />
                <div>
                  <select
                    name="country"
                    defaultValue=""
                    className="w-full border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-brand"
                  >
                    <option value="" disabled>Country of Residence</option>
                    <option>United Arab Emirates</option>
                    <option>Saudi Arabia</option>
                    <option>India</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Other</option>
                  </select>
                  {errors.country && <p className="text-xs text-destructive mt-1">{errors.country}</p>}
                </div>
                <div>
                  <textarea
                    name="message"
                    rows={3}
                    maxLength={1000}
                    placeholder="Message (optional)"
                    className="w-full border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:border-brand resize-none"
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand text-brand-foreground py-3 text-[11px] font-semibold tracking-[0.18em] uppercase hover:opacity-90 transition disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Enquiry"}
                </button>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  By submitting this form you agree to Golden Door Realty's Privacy Policy and consent to be contacted.
                </p>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ContactCtx.Provider>
  );
}

function Field({
  name, type = "text", placeholder, error, maxLength,
}: { name: string; type?: string; placeholder: string; error?: string; maxLength?: number }) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full border bg-background px-4 py-3 text-sm focus:outline-none transition ${
          error ? "border-destructive focus:border-destructive" : "border-input focus:border-brand"
        }`}
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
