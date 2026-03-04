import { generatePageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { COMPANY } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Terms of Service",
  description:
    "Read Trawerse's terms of service. Understand the terms and conditions that govern your use of our website and services.",
  path: "/terms",
  noIndex: false,
  keywords: ["Trawerse terms of service", "terms and conditions"],
});

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: "Terms of Service", href: "/terms" }]} />

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-muted-foreground">Last updated: March 1, 2025</p>
      </header>

      <div className="prose prose-invert prose-sm max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Agreement to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using the {COMPANY.name} website and services, you
            agree to be bound by these Terms of Service. If you disagree with
            any part of these terms, you may not access our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            {COMPANY.name} provides digital product development services
            including web development, mobile app development, SaaS development,
            UI/UX design, MVP development, and custom software development. The
            specific scope, deliverables, timeline, and pricing for each project
            are defined in individual project agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Project Agreements</h2>
          <p className="text-muted-foreground leading-relaxed">
            All projects are governed by a separate project agreement or
            statement of work (SOW) that outlines the specific terms, including
            scope, timeline, payment schedule, and deliverables. In the event of
            any conflict between these Terms and a project agreement, the
            project agreement shall prevail.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            Upon full payment, clients receive ownership of the custom code and
            designs created specifically for their project, unless otherwise
            specified in the project agreement. {COMPANY.name} retains
            ownership of pre-existing code, frameworks, libraries, and
            proprietary tools used in the development process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Payment Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            Payment terms are specified in individual project agreements.
            Generally, projects require an upfront deposit before work begins,
            with remaining payments tied to project milestones. Late payments
            may result in project delays or suspension of services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Confidentiality</h2>
          <p className="text-muted-foreground leading-relaxed">
            Both parties agree to maintain the confidentiality of any
            proprietary or sensitive information shared during the course of a
            project. This obligation survives the termination of any project
            agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            {COMPANY.name} shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use
            of our services. Our total liability shall not exceed the amount
            paid by you for the specific service giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            Either party may terminate a project agreement with written notice as
            specified in the individual agreement. Upon termination, the client
            is responsible for payment of all work completed up to the
            termination date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify these terms at any time. We will
            provide notice of significant changes by posting the updated terms
            on our website. Your continued use of our services after changes
            constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            For questions about these Terms of Service, please contact us at{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-accent hover:underline">
              {COMPANY.email}
            </a>.
          </p>
        </section>
      </div>
    </article>
  );
}
