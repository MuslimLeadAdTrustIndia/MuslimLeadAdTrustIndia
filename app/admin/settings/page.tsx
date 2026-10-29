"use client";

import React, { useEffect, useState } from "react";
import AdminIcon from "../_components/icons";
import { Button, Card, Field, Input, Textarea } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

export default function AdminSettingsPage() {
  const { showToast } = useAdminToast();
  const [loading, setLoading] = useState(true);

  const [general, setGeneral] = useState({
    orgName: "Muslim Legal Aid Trust (India)",
    tagline: "Justice • Support • Rehabilitation",
    email: "muslimlegalaidtrustindia80@gmail.com",
    phone: "+91 80593 11777",
    address: "Chamber No. 177, 1st Floor, Lawyers Chambers, Distt. Court, Panipat - 132103, Haryana, India",
    officeHours: "Mon - Sat: 10:00 AM - 6:00 PM, Sunday: Closed",
  });

  const [social, setSocial] = useState({
    facebook: "https://facebook.com/mlatrust",
    instagram: "https://instagram.com/mlatrust",
    twitter: "https://twitter.com/mlatrust",
    linkedin: "https://linkedin.com/company/mlatrust",
  });

  const [seo, setSeo] = useState({
    metaTitle: "Muslim Legal Aid Trust (India) | मुस्लिम कानूनी सहायता दल भारत",
    metaDescription:
      "Justice • Support • Rehabilitation. Providing legal assistance, rights protection and rehabilitation support for Muslim prisoners and their families.",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/content/site_general").then((r) => r.ok && r.json()),
      fetch("/api/admin/content/site_social").then((r) => r.ok && r.json()),
      fetch("/api/admin/content/site_seo").then((r) => r.ok && r.json()),
    ])
      .then(([genData, socData, seoData]) => {
        if (genData && Object.keys(genData).length) setGeneral((prev) => ({ ...prev, ...genData }));
        if (socData && Object.keys(socData).length) setSocial((prev) => ({ ...prev, ...socData }));
        if (seoData && Object.keys(seoData).length) setSeo((prev) => ({ ...prev, ...seoData }));
      })
      .finally(() => setLoading(false));
  }, []);

  const saveSection = async (key: string, val: unknown, name: string) => {
    try {
      const res = await fetch(`/api/admin/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });
      if (!res.ok) throw new Error();
      showToast(`${name} saved successfully.`);
    } catch {
      showToast(`Failed to save ${name}`, "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-blue-50/70 border border-blue-100 px-5 py-3.5 flex items-start gap-3">
        <AdminIcon name="settings" className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#2B4A72]">
          Manage organisation details, social links and SEO metadata used
          across the public website.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-[14px]">Loading settings...</div>
      ) : (
        <>
          <Card
            title="General Information"
            description="Shown in the footer and contact pages"
            action={<Button onClick={() => saveSection("site_general", general, "General settings")}>Save Changes</Button>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Organisation Name">
                <Input value={general.orgName} onChange={(e) => setGeneral({ ...general, orgName: e.target.value })} />
              </Field>
              <Field label="Tagline">
                <Input value={general.tagline} onChange={(e) => setGeneral({ ...general, tagline: e.target.value })} />
              </Field>
              <Field label="Contact Email">
                <Input value={general.email} onChange={(e) => setGeneral({ ...general, email: e.target.value })} />
              </Field>
              <Field label="Contact Phone">
                <Input value={general.phone} onChange={(e) => setGeneral({ ...general, phone: e.target.value })} />
              </Field>
              <Field label="Office Hours" className="sm:col-span-2">
                <Input value={general.officeHours} onChange={(e) => setGeneral({ ...general, officeHours: e.target.value })} />
              </Field>
              <Field label="Office Address" className="sm:col-span-2">
                <Textarea rows={2} value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })} />
              </Field>
            </div>
          </Card>

          <Card
            title="Social Media Links"
            action={<Button onClick={() => saveSection("site_social", social, "Social links")}>Save Changes</Button>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Facebook">
                <Input value={social.facebook} onChange={(e) => setSocial({ ...social, facebook: e.target.value })} />
              </Field>
              <Field label="Instagram">
                <Input value={social.instagram} onChange={(e) => setSocial({ ...social, instagram: e.target.value })} />
              </Field>
              <Field label="Twitter / X">
                <Input value={social.twitter} onChange={(e) => setSocial({ ...social, twitter: e.target.value })} />
              </Field>
              <Field label="LinkedIn">
                <Input value={social.linkedin} onChange={(e) => setSocial({ ...social, linkedin: e.target.value })} />
              </Field>
            </div>
          </Card>

          <Card
            title="SEO & Metadata"
            description="Controls how the site appears in search engines"
            action={<Button onClick={() => saveSection("site_seo", seo, "SEO settings")}>Save Changes</Button>}
          >
            <div className="space-y-4">
              <Field label="Meta Title">
                <Input value={seo.metaTitle} onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })} />
              </Field>
              <Field label="Meta Description" hint="Recommended length: 150-160 characters">
                <Textarea rows={3} value={seo.metaDescription} onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })} />
              </Field>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
