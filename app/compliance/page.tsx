import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

export const metadata = {
  title: "Legal Status & Government Approvals | Muslim Legal Aid Trust (India)",
  description:
    "Official registrations, tax exemptions (12A & 80G), Ministry of Corporate Affairs CSR-1 approval, and Ministry of Social Justice e-Anudaan enrollment for Muslim Legal Aid Trust (India).",
};

interface CertificateDoc {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  authority: string;
  regKey: string;
  regValue: string;
  additionalDetails: { label: string; value: string }[];
  description: string;
  downloadUrl: string;
  downloadFileName: string;
}

const certificates: CertificateDoc[] = [
  {
    id: "80g",
    badge: "Tax Exemption for Donors",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    title: "80G Provisional Approval Order",
    authority: "Income Tax Department, Ministry of Finance, Govt. of India",
    regKey: "Unique Reg. No. (URN)",
    regValue: "AAKTM9786FF20261",
    additionalDetails: [
      { label: "Approval Section", value: "Section 354(4) / 80G" },
      { label: "Form", value: "Form No. 106" },
      { label: "Approval Date", value: "03-11-2026" },
      { label: "Tax Assessment Years", value: "From TY 2026-27 to TY 2028-29" },
      { label: "Trust PAN", value: "AAKTM9786F" },
    ],
    description:
      "All donations made to Muslim Legal Aid Trust (India) are eligible for tax deductions under Section 80G of the Income Tax Act. Donors receive an official tax receipt.",
    downloadUrl: "/documents/80G-provisional-tax-exemption.pdf",
    downloadFileName: "Muslim-Legal-Aid-Trust-80G-Tax-Exemption.pdf",
  },
  {
    id: "12a",
    badge: "Trust Income Tax Exemption",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "12A Provisional Registration Order",
    authority: "Income Tax Department, Ministry of Finance, Govt. of India",
    regKey: "Unique Reg. No. (URN)",
    regValue: "AAKTM9786FE20261",
    additionalDetails: [
      { label: "Registration Section", value: "Section 332(8) / 12A" },
      { label: "Form", value: "Form No. 106" },
      { label: "Registration Date", value: "03-11-2026" },
      { label: "Assessment Years", value: "From TY 2026-27 to TY 2028-29" },
      { label: "Nature of Activities", value: "Charitable" },
    ],
    description:
      "Official certificate granting non-profit charitable status to the Trust under the Direct Tax / Income Tax Act, exempting trust income applied for public charitable objects.",
    downloadUrl: "/documents/12A-provisional-registration.pdf",
    downloadFileName: "Muslim-Legal-Aid-Trust-12A-Registration.pdf",
  },
  {
    id: "csr",
    badge: "Corporate Social Responsibility",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    title: "MCA CSR-1 Registration Approval",
    authority: "Ministry of Corporate Affairs (ROC Delhi-I), Govt. of India",
    regKey: "CSR Registration No.",
    regValue: "CSR00120032",
    additionalDetails: [
      { label: "Authority", value: "Office of the Registrar of Companies" },
      { label: "Approval Date", value: "30-10-2026" },
      { label: "Application SRN", value: "AC7318019" },
      { label: "Jurisdiction", value: "ROC NCT of Delhi & Haryana" },
      { label: "Eligibility", value: "Eligible for Corporate CSR Grants" },
    ],
    description:
      "Approved by the Ministry of Corporate Affairs (MCA) enabling corporate entities, PSUs, and businesses to deploy CSR funds directly with Muslim Legal Aid Trust for eligible projects.",
    downloadUrl: "/documents/mca-csr-registration-approval.pdf",
    downloadFileName: "Muslim-Legal-Aid-Trust-MCA-CSR-Approval.pdf",
  },
  {
    id: "eanudaan",
    badge: "Ministry of Social Justice",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    title: "e-Anudaan Certificate of Enrollment",
    authority: "Ministry of Social Justice and Empowerment, Govt. of India",
    regKey: "e-Anudaan NGO ID",
    regValue: "HR/00044484",
    additionalDetails: [
      { label: "Portal", value: "eMSJE / e-Anudaan Portal" },
      { label: "Platform Partner", value: "National Informatics Centre (NIC)" },
      { label: "State", value: "Haryana" },
      { label: "Objective", value: "Transparency, Accountability & Partnership" },
      { label: "Eligible Schemes", value: "Welfare & Social Justice Initiatives" },
    ],
    description:
      "Official enrollment under the Ministry of Social Justice & Empowerment (Govt. of India) in association with NIC, establishing full transparency and eligibility for welfare partnerships.",
    downloadUrl: "/documents/e-anudaan-enrollment-certificate.pdf",
    downloadFileName: "Muslim-Legal-Aid-Trust-eAnudaan-Certificate.pdf",
  },
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />

      <main className="flex-1 pb-20">
        <PageHero
          eyebrow="Government Approvals & Accreditations"
          title="Legal Status & Compliance"
          hindiTitle="कानूनी मान्यता, 80G छूट एवं सरकारी पंजीकरण"
          breadcrumb="Legal & Compliance"
          description="Muslim Legal Aid Trust (India) is a fully compliant, government-registered public charitable trust adhering to highest standards of legal accountability, financial transparency, and statutory governance."
          rightCard={
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl text-[13px] text-slate-200 shadow-xl">
              <div className="flex items-center gap-2.5 text-white font-bold pb-3 border-b border-white/10">
                <svg
                  className="w-5 h-5 text-[#00A3FF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Primary Legal Credentials</span>
              </div>
              <div className="mt-3.5 space-y-2 text-[12.5px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Trust Deed No:</span>
                  <span className="font-bold text-white font-mono">16818</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">PAN Card:</span>
                  <span className="font-bold text-white font-mono">AAKTM9786F</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">80G Tax Exemption:</span>
                  <span className="font-bold text-emerald-300 font-mono">Approved</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">MCA CSR-1 Reg:</span>
                  <span className="font-bold text-purple-300 font-mono">CSR00120032</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">e-Anudaan NGO ID:</span>
                  <span className="font-bold text-amber-300 font-mono">HR/00044484</span>
                </div>
              </div>
            </div>
          }
        />

        {/* Introduction Summary Strip */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-[0_10px_35px_rgba(13,35,58,0.06)]">
            <div className="max-w-3xl">
              <span className="inline-block text-[12px] font-bold uppercase tracking-[0.16em] text-[#0066FF] mb-2">
                TRANSPARENCY & STATUTORY COMPLIANCE
              </span>
              <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#0D233A] leading-tight">
                Verified Registrations with the Government of India
              </h2>
              <p className="mt-3 text-[14.5px] sm:text-[15px] leading-relaxed text-[#4A5D73]">
                To maintain complete transparency and build enduring trust with donors, legal partners, institutions,
                and corporate contributors, all statutory registrations and income-tax approvals of{" "}
                <strong className="text-[#0D233A]">Muslim Legal Aid Trust (India)</strong> are published here for public
                inspection. You can view or download the signed copies below.
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Income Tax 80G</span>
                <span className="text-[15px] font-extrabold text-[#0D233A] mt-1 block">Tax Deductible</span>
                <span className="text-[12px] text-emerald-600 font-medium mt-0.5 block">For All Donors</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Income Tax 12A</span>
                <span className="text-[15px] font-extrabold text-[#0D233A] mt-1 block">Registered NPO</span>
                <span className="text-[12px] text-blue-600 font-medium mt-0.5 block">Charitable Trust</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">MCA CSR-1</span>
                <span className="text-[15px] font-extrabold text-[#0D233A] mt-1 block">Eligible Entity</span>
                <span className="text-[12px] text-purple-600 font-medium mt-0.5 block">For Corporate Grants</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">e-Anudaan (MSJE)</span>
                <span className="text-[15px] font-extrabold text-[#0D233A] mt-1 block">Enrolled NGO</span>
                <span className="text-[12px] text-amber-700 font-medium mt-0.5 block">NIC Verified ID</span>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Detailed Cards Grid */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#0066FF] mb-1.5">
              OFFICIAL CERTIFICATES
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D233A]">
              Download Government Orders &amp; Certificates
            </h2>
            <p className="text-slate-500 text-[14px] mt-2">
              Click on &quot;View Certificate&quot; to preview in your browser or &quot;Download PDF&quot; to save an official copy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {certificates.map((doc) => (
              <div
                key={doc.id}
                id={doc.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgba(13,35,58,0.06)] p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Top Badge & Authority */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold border ${doc.badgeColor}`}
                    >
                      {doc.badge}
                    </span>
                    <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider">
                      Government of India
                    </span>
                  </div>

                  {/* Title & Authority */}
                  <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#0D233A] mt-3">
                    {doc.title}
                  </h3>
                  <p className="text-[13px] font-medium text-slate-500 mt-1">
                    {doc.authority}
                  </p>

                  {/* Primary Registration Pill */}
                  <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        {doc.regKey}
                      </span>
                      <span className="text-[15px] sm:text-[16px] font-mono font-extrabold text-[#0D233A] tracking-wide mt-0.5 block">
                        {doc.regValue}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                      Verified
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-[13.5px] leading-relaxed text-[#4A5D73]">
                    {doc.description}
                  </p>

                  {/* Additional Metadata Rows */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-[12.5px]">
                    {doc.additionalDetails.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-slate-600">
                        <span className="text-slate-500">{item.label}:</span>
                        <span className="font-semibold text-[#0D233A] text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions: View & Download Buttons */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={doc.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[13.5px] font-bold text-[#0D233A] bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>View Certificate</span>
                  </a>

                  <a
                    href={doc.downloadUrl}
                    download={doc.downloadFileName}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[13.5px] font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] shadow-[0_4px_12px_rgba(0,102,255,0.25)] transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Corporate CSR & Institutional Donors Banner */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-[#0D233A] via-[#123152] to-[#1A56DB] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="inline-block text-[12px] font-bold uppercase tracking-[0.18em] text-[#00A3FF] mb-2">
                  CSR &amp; INSTITUTIONAL PARTNERSHIPS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  Partner with Us for Corporate Social Responsibility
                </h3>
                <p className="mt-3 text-[14.5px] text-slate-200 leading-relaxed max-w-2xl">
                  With MCA CSR Registration (<strong>CSR00120032</strong>) and 80G tax certification, companies and philanthropic trusts can channel CSR funds towards prisoner rehabilitation, legal aid clinics, education for marginalized children, and family sustenance programs.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-blue-200 font-medium">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Audited Financials
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Project Impact Reports
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Section 135 CSR Compliant
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center text-center bg-white text-[#0D233A] hover:bg-slate-100 px-6 py-3.5 rounded-full text-[14px] font-bold transition-all shadow-md"
                >
                  Contact for CSR Proposals
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center text-center border-2 border-white/80 hover:border-white text-white hover:bg-white/10 px-6 py-3.5 rounded-full text-[14px] font-bold transition-all"
                >
                  Donate &amp; Claim 80G
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
