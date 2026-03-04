import { generatePageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { COMPANY } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description:
    "Read Trawerse's privacy policy. Learn how we collect, use, and protect your personal information when you use our website and services.",
  path: "/privacy",
  noIndex: false,
  keywords: ["Trawerse privacy policy", "data protection"],
});

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          Last updated: March 1, 2025
        </p>
      </header>

      <div className="prose prose-invert prose-sm max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            {COMPANY.name} ("{COMPANY.name}", "we", "our", or "us") is
            committed to protecting your personal information and your right to
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website and use our
            services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong className="text-white">Personal Information:</strong> Name,
              email address, phone number, company name, and other information
              you voluntarily provide through our contact forms.
            </li>
            <li>
              <strong className="text-white">Usage Data:</strong> Information
              about how you interact with our website, including pages visited,
              time spent, and referring URLs.
            </li>
            <li>
              <strong className="text-white">Device Information:</strong> Browser
              type, operating system, device type, and IP address.
            </li>
            <li>
              <strong className="text-white">Cookies:</strong> We use cookies and
              similar tracking technologies to enhance your experience.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>To respond to your inquiries and provide customer support</li>
            <li>To deliver and improve our services</li>
            <li>To send project updates and relevant communications</li>
            <li>To analyze website usage and optimize performance</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Data Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell, rent, or trade your personal information to third
            parties. We may share information with trusted service providers who
            assist us in operating our website, conducting business, or serving
            you, provided they agree to keep your information confidential.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational security
            measures to protect your personal information against unauthorized
            access, alteration, disclosure, or destruction. However, no method
            of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            You have the right to access, update, or delete your personal
            information. You may also opt out of receiving communications from
            us. To exercise these rights, please contact us at{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-accent hover:underline">
              {COMPANY.email}
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about this Privacy Policy, please contact us
            at{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-accent hover:underline">
              {COMPANY.email}
            </a>.
          </p>
        </section>
      </div>
    </article>
  );
}
