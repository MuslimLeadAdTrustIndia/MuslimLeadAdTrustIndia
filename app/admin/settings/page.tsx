"use client";

import React, { useState } from "react";
import AdminIcon from "../_components/icons";
import { Button, Card, Field, Input, Textarea } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

export default function AdminSettingsPage() {
  const { showToast } = useAdminToast();

  const [general, setGeneral] = useState({
    orgName: "Muslim Legal Aid Trust (India)",
    tagline: "Justice • Support • Rehabilitation",
    email: "info@mlatrust.org",
    phone: "+91 98765 43210",
    address: "123, Peace Avenue, New Delhi - 110001, India",
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

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-blue-50/70 border border-blue-100 px-5 py-3.5 flex items-start gap-3">
        <AdminIcon name="settings" className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#2B4A72]">
          Manage organisation details, social links and SEO metadata used
          across the public website.
        </p>
      </div>

      <Card
        title="General Information"
        description="Shown in the footer and contact pages"
        action={<Button onClick={() => showToast("General settings saved successfully.")}>Save Changes</Button>}
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
        action={<Button onClick={() => showToast("Social links saved successfully.")}>Save Changes</Button>}
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
        action={<Button onClick={() => showToast("SEO settings saved successfully.")}>Save Changes</Button>}
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

      <Card title="Danger Zone" className="border-red-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[14px] font-bold text-[#0D233A]">Reset All Demo Data</p>
            <p className="text-[12.5px] text-slate-500 mt-0.5">
              Clears all saved contact leads from this browser and restores the default demo data.
            </p>
          </div>
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm("This will clear all saved contact leads from this browser. Continue?")) {
                window.localStorage.removeItem("mlat_contact_leads");
                showToast("Demo data has been reset.", "info");
              }
            }}
          >
            <AdminIcon name="trash" className="w-4 h-4" />
            Reset Data
          </Button>
        </div>
      </Card>
    </div>
  );
}
