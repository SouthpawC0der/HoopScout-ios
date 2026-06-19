import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HoopScout Privacy Policy — how we collect, use, and protect your data.",
};

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: `When you use HoopScout, we may collect the following types of information:

**Account Information:** When you register, we collect your name, email address, username, and profile photo (optional).

**Location Data:** With your permission, we collect your device's location to show nearby courts, pickup games, and players. You can disable location access at any time in your device settings.

**Usage Data:** We collect information about how you interact with the app, including pages visited, features used, search queries, and time spent in the app.

**Device Information:** We collect information about your device, including device type, operating system, unique device identifiers, and mobile network information.

**User Content:** Content you create in the app, including player profiles, court reviews, game stats, and messages.

**Communications:** If you contact us directly, we may receive additional information about you, such as your name, email address, and the content of your message.`,
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: `We use the information we collect to:

- Provide, operate, and maintain the HoopScout app and services
- Create and manage your account
- Show you relevant courts, games, and players near your location
- Personalize your experience and content recommendations
- Process transactions and send related information
- Send you technical notices, updates, security alerts, and support messages
- Respond to your comments, questions, and requests
- Monitor and analyze trends, usage, and activities to improve our services
- Detect, investigate, and prevent fraudulent or unauthorized activity
- Comply with legal obligations`,
  },
  {
    id: "information-sharing",
    title: "Information Sharing & Disclosure",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

**With Other Users:** Your public profile, including username, player stats, and court reviews, is visible to other HoopScout users. You control what is included in your public profile.

**Service Providers:** We may share information with third-party vendors and service providers that perform services on our behalf, such as data storage, analytics, and customer support.

**Legal Requirements:** We may disclose your information if required by law, regulation, legal process, or governmental request.

**Business Transfers:** If HoopScout is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.

**With Your Consent:** We may share your information in other ways if you give us consent to do so.`,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide you services. You may delete your account at any time through the app settings, which will result in the deletion of your personal data within 30 days, except where we are required to retain it for legal or legitimate business purposes.

Usage data and analytics may be retained in anonymized form for up to 24 months after account deletion.`,
  },
  {
    id: "security",
    title: "Security",
    content: `We take the security of your personal information seriously. We implement industry-standard security measures, including:

- Encryption of data in transit using TLS/SSL
- Encryption of sensitive data at rest
- Regular security audits and vulnerability assessments
- Access controls limiting who can access your data

However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.`,
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    content: `Depending on your location, you may have certain rights regarding your personal information:

**Access & Portability:** You may request a copy of the personal information we hold about you.

**Correction:** You may update or correct your personal information through the app settings.

**Deletion:** You may request deletion of your personal information by deleting your account or contacting us.

**Location Data:** You can disable location permissions at any time through your device settings.

**Push Notifications:** You can opt out of push notifications through your device settings or the app's notification settings.

**Marketing Communications:** You can unsubscribe from marketing emails by clicking the unsubscribe link in any such email or by contacting us.

To exercise these rights, please contact us at support@hoopscoutapp.com.`,
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: `HoopScout is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information without parental consent, please contact us at support@hoopscoutapp.com. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to remove that information from our servers.`,
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    content: `HoopScout may contain links to third-party websites and services, including but not limited to the App Store, Google Play, and social media platforms. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you use.

We use the following third-party services that may collect information:

- **Analytics:** We use analytics services to understand how users interact with our app.
- **Cloud Infrastructure:** Our app is hosted on secure cloud infrastructure.
- **Payment Processing:** If applicable, payments are processed through PCI-compliant payment providers.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We will also send you an in-app notification or email for material changes.

Your continued use of HoopScout after any changes constitutes your acceptance of the updated Privacy Policy.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Email:** support@hoopscoutapp.com

We will respond to your inquiry within 30 days.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(148, 163, 184, 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto">
          <Badge
            className="mb-6 px-4 py-1.5 text-sm font-medium border border-[#94A3B8]/30 text-[#94A3B8]"
            style={{ backgroundColor: "rgba(148, 163, 184, 0.10)" }}
          >
            Legal
          </Badge>
          <h1 className="font-heading font-black text-white text-6xl sm:text-8xl leading-none mb-4">
            PRIVACY<br />
            <span style={{ color: "#94A3B8" }}>POLICY</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            We take your privacy seriously. This policy explains how HoopScout collects,
            uses, and protects your personal information.
          </p>
          <p className="text-white/30 text-sm mt-4">
            Last Updated: June 19, 2026 &nbsp;·&nbsp; Effective Date: June 19, 2026
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[240px_1fr] gap-12 items-start">
          {/* Sticky TOC */}
          <aside className="hidden lg:block sticky top-28 self-start">
            <nav aria-label="Table of contents">
              <p className="text-white/30 text-xs uppercase tracking-wider font-heading mb-4">
                Contents
              </p>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-white/40 hover:text-[#94A3B8] text-sm py-1 transition-colors duration-200 cursor-pointer leading-snug"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-0">
            {sections.map((section, i) => (
              <div key={section.id}>
                <div id={section.id} className="scroll-mt-28 py-10">
                  <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl mb-5">
                    {section.title}
                  </h2>
                  <div className="prose-custom">
                    <PrivacyContent content={section.content} />
                  </div>
                </div>
                {i < sections.length - 1 && (
                  <Separator className="bg-white/8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PrivacyContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="space-y-2 mb-4">
          {listItems.map((item, i) => (
            <li key={i} className="flex gap-2 text-white/60 text-sm leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#94A3B8] flex-shrink-0" aria-hidden="true" />
              <span>{renderInline(item.replace(/^-\s*/, ""))}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      flushList();
      continue;
    }
    if (line.startsWith("- ")) {
      listItems.push(line);
    } else {
      flushList();
      elements.push(
        <p key={i} className="text-white/60 text-sm leading-relaxed mb-3">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList();

  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
