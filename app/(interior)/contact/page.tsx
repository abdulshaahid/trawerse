import { generatePageMetadata, JsonLd, localBusinessSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { COMPANY } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Contact Trawerse — Get a Free Project Consultation",
  description:
    "Get in touch with Trawerse for your next web development, mobile app, or SaaS project. Free consultation and project estimate. Let's build something amazing together.",
  path: "/contact",
  keywords: [
    "contact Trawerse",
    "web development consultation",
    "app development quote",
    "hire web developer",
    "software development inquiry",
  ],
});

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <JsonLd data={localBusinessSchema()} />
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />

      {/* Hero Section */}
      <header className="mb-16 max-w-3xl">
        <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
          Contact Us
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  tracking-tight mb-6">
          Let's Build Something{" "}
          <span className="gradient-text">Amazing Together</span>
        </h1>
        <p className="text-lg text-muted-foreground px-1 leading-relaxed">
          Ready to start your next project? We'd love to hear about your ideas.
          Fill out the form below or reach out directly — we typically respond
          within 24 hours.
        </p>
      </header>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <h2 className="text-xl font-semibold mb-6 relative z-10">Project Inquiry</h2>
            <form action={`mailto:${COMPANY.email}`} method="POST" encType="text/plain" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-muted-foreground"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-white/[0.08] backdrop-blur-xl shadow-inner rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/[0.12] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-muted-foreground relative z-10"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-white/[0.08] backdrop-blur-xl shadow-inner rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/[0.12] transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-muted-foreground relative z-10"
                >
                  Tell Us About Your Project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-white/[0.08] backdrop-blur-xl shadow-inner rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/[0.12] transition-all resize-none relative z-10"
                  placeholder="Describe your project, goals, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3.5 rounded-full bg-accent text-black font-semibold text-base hover:shadow-[0_0_30px_rgba(17,174,98,0.3)] transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.05] backdrop-blur-2xl shadow-xl rounded-3xl p-8 relative overflow-hidden">
            <h3 className="text-lg font-semibold mb-4 text-white relative z-10">Direct Contact</h3>
            <div className="space-y-4 relative z-10">
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors group"
              >
                <span className="w-12 h-12 rounded-full bg-white/[0.08] shadow-inner group-hover:bg-white/[0.12] flex items-center justify-center transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <span className="text-[15px] font-medium">{COMPANY.email}</span>
              </a>
            </div>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-2xl shadow-xl rounded-3xl p-8 relative overflow-hidden">
            <h3 className="text-lg font-semibold mb-4 text-white relative z-10">Location</h3>
            <p className="text-[15px] text-muted-foreground leading-relaxed relative z-10">
               {COMPANY.address.state},
               
             
              {COMPANY.address.country}
            </p>
            <p className="text-sm text-muted-foreground/80 mt-4 leading-relaxed relative z-10">
              We work with clients globally, with a focus on teams across India,
              the Middle East, and North America.
            </p>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-2xl shadow-xl rounded-3xl p-8 relative overflow-hidden">
            <h3 className="text-lg font-semibold mb-4 text-white relative z-10">Connect With Us</h3>
            <div className="space-y-3 relative z-10">
              {[
                { label: "Instagram", href: COMPANY.social.instagram },
                { label: "LinkedIn", href: COMPANY.social.linkedin },
                { label: "Twitter", href: COMPANY.social.twitter },
                { label: "GitHub", href: COMPANY.social.github },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[15px] font-medium text-muted-foreground hover:text-white transition-colors mr-6"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-accent/10 backdrop-blur-3xl shadow-[inset_0_0_80px_rgba(17,174,98,0.1)] rounded-3xl p-8 relative overflow-hidden">
            <h3 className="text-lg font-semibold mb-3 text-accent relative z-10">Quick Response</h3>
            <p className="text-[15px] text-white/80 leading-relaxed relative z-10">
              We typically respond to all inquiries within 24 hours during
              business days. For urgent projects, mention it in your message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
