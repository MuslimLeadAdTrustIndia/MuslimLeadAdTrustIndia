"use client";

import React, { useEffect, useState } from "react";
import AdminIcon from "../../_components/icons";
import { Button, Card, Field, Input, Textarea } from "../../_components/ui";
import { useAdminToast } from "../../_components/Toast";

interface PracticeArea {
  id: number;
  title_en: string;
  title_hi?: string;
  text_en: string;
  text_hi?: string;
  sort_order?: number;
}

interface EligibilityItem {
  id: number;
  text_en: string;
  text_hi?: string;
  sort_order?: number;
}

export default function LegalHelpContentPage() {
  const { showToast } = useAdminToast();
  const [loading, setLoading] = useState(true);

  const [intro, setIntro] = useState({
    title_en: "No One Should Be Denied Justice for Lack of Means",
    title_hi: "",
    description_en:
      "Our empanelled advocates take up cases at trial courts, High Courts and the Supreme Court — from bail pleas to constitutional petitions — ensuring that financial incapacity never stands between a person and justice.",
    description_hi: "",
  });

  const [areas, setAreas] = useState<PracticeArea[]>([]);
  const [eligibility, setEligibility] = useState<EligibilityItem[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/content/legal_help_intro").then((r) => r.ok && r.json()),
      fetch("/api/admin/data/legal_practice_areas").then((r) => r.ok && r.json()),
      fetch("/api/admin/data/legal_eligibility").then((r) => r.ok && r.json()),
    ])
      .then(([introData, areasData, eligData]) => {
        if (introData && Object.keys(introData).length) setIntro((prev) => ({ ...prev, ...introData }));
        if (Array.isArray(areasData)) setAreas(areasData);
        if (Array.isArray(eligData)) setEligibility(eligData);
      })
      .finally(() => setLoading(false));
  }, []);

  const saveIntro = async () => {
    try {
      const res = await fetch("/api/admin/content/legal_help_intro", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intro),
      });
      if (!res.ok) throw new Error();
      showToast("Intro block updated successfully.");
    } catch {
      showToast("Failed to update intro", "error");
    }
  };

  const saveAreas = async () => {
    try {
      await Promise.all(
        areas.map((a) =>
          fetch(`/api/admin/data/legal_practice_areas/${a.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title_en: a.title_en,
              title_hi: a.title_hi || "",
              text_en: a.text_en,
              text_hi: a.text_hi || "",
            }),
          })
        )
      );
      showToast("Practice areas updated successfully.");
    } catch {
      showToast("Failed to update practice areas", "error");
    }
  };

  const addArea = async () => {
    try {
      const res = await fetch("/api/admin/data/legal_practice_areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title_en: "New Practice Area",
          title_hi: "",
          text_en: "Description of legal aid offered",
          text_hi: "",
          sort_order: areas.length + 1,
        }),
      });
      if (res.ok) {
        const item = await res.json();
        setAreas((prev) => [...prev, item]);
        showToast("New practice area added.");
      }
    } catch {
      showToast("Failed to add area", "error");
    }
  };

  const removeArea = async (id: number) => {
    try {
      await fetch(`/api/admin/data/legal_practice_areas/${id}`, { method: "DELETE" });
      setAreas((prev) => prev.filter((a) => a.id !== id));
      showToast("Area removed.");
    } catch {
      showToast("Failed to remove area", "error");
    }
  };

  const saveEligibility = async () => {
    try {
      await Promise.all(
        eligibility.map((e) =>
          fetch(`/api/admin/data/legal_eligibility/${e.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text_en: e.text_en,
              text_hi: e.text_hi || "",
            }),
          })
        )
      );
      showToast("Eligibility criteria updated.");
    } catch {
      showToast("Failed to update eligibility", "error");
    }
  };

  const addEligibility = async () => {
    try {
      const res = await fetch("/api/admin/data/legal_eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text_en: "Eligible group description",
          text_hi: "",
          sort_order: eligibility.length + 1,
        }),
      });
      if (res.ok) {
        const item = await res.json();
        setEligibility((prev) => [...prev, item]);
        showToast("New criteria added.");
      }
    } catch {
      showToast("Failed to add criteria", "error");
    }
  };

  const removeEligibility = async (id: number) => {
    try {
      await fetch(`/api/admin/data/legal_eligibility/${id}`, { method: "DELETE" });
      setEligibility((prev) => prev.filter((e) => e.id !== id));
      showToast("Criteria removed.");
    } catch {
      showToast("Failed to remove criteria", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-blue-50/70 border border-blue-100 px-5 py-3.5 flex items-start gap-3">
        <AdminIcon name="book" className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#2B4A72]">
          Manage the content shown on the public{" "}
          <span className="font-semibold">Legal Aid &amp; Representation</span> page.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-[14px]">Loading legal help content...</div>
      ) : (
        <>
          <Card
            title="Intro Block"
            action={<Button onClick={saveIntro}>Save Changes</Button>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="English Title">
                <Input value={intro.title_en} onChange={(e) => setIntro({ ...intro, title_en: e.target.value })} />
              </Field>
              <Field label="Hindi Title (वैकल्पिक)">
                <Input value={intro.title_hi || ""} onChange={(e) => setIntro({ ...intro, title_hi: e.target.value })} />
              </Field>
              <Field label="English Description" className="sm:col-span-2">
                <Textarea rows={2} value={intro.description_en} onChange={(e) => setIntro({ ...intro, description_en: e.target.value })} />
              </Field>
              <Field label="Hindi Description (वैकल्पिक)" className="sm:col-span-2">
                <Textarea rows={2} value={intro.description_hi || ""} onChange={(e) => setIntro({ ...intro, description_hi: e.target.value })} />
              </Field>
            </div>
          </Card>

          <Card
            title="Areas of Practice"
            description="Practice area cards shown in a 3-column grid"
            action={<Button onClick={saveAreas}>Save Changes</Button>}
          >
            <div className="space-y-4">
              {areas.map((area) => (
                <div key={area.id} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-3 items-start bg-slate-50/60 border border-slate-200/70 rounded-xl p-3.5">
                  <div className="space-y-2">
                    <Input
                      value={area.title_en}
                      onChange={(e) => setAreas((prev) => prev.map((a) => (a.id === area.id ? { ...a, title_en: e.target.value } : a)))}
                      placeholder="English area title"
                      className="font-semibold"
                    />
                    <Input
                      value={area.title_hi || ""}
                      onChange={(e) => setAreas((prev) => prev.map((a) => (a.id === area.id ? { ...a, title_hi: e.target.value } : a)))}
                      placeholder="Hindi area title"
                      className="text-[13px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      rows={2}
                      value={area.text_en}
                      onChange={(e) => setAreas((prev) => prev.map((a) => (a.id === area.id ? { ...a, text_en: e.target.value } : a)))}
                      placeholder="English description"
                    />
                    <Textarea
                      rows={2}
                      value={area.text_hi || ""}
                      onChange={(e) => setAreas((prev) => prev.map((a) => (a.id === area.id ? { ...a, text_hi: e.target.value } : a)))}
                      placeholder="Hindi description (वैकल्पिक)"
                    />
                  </div>
                  <button
                    onClick={() => removeArea(area.id)}
                    className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label="Remove"
                  >
                    <AdminIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="mt-4" onClick={addArea}>
              <AdminIcon name="plus" className="w-4 h-4" />
              Add Practice Area
            </Button>
          </Card>

          <Card
            title="Eligibility List"
            description="Bullet points listing who qualifies for free legal aid"
            action={<Button onClick={saveEligibility}>Save Changes</Button>}
          >
            <div className="space-y-3">
              {eligibility.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-2">
                  <Input
                    value={item.text_en}
                    onChange={(e) => setEligibility((prev) => prev.map((x) => (x.id === item.id ? { ...x, text_en: e.target.value } : x)))}
                    placeholder="English eligibility criteria"
                    className="w-full sm:flex-1"
                  />
                  <Input
                    value={item.text_hi || ""}
                    onChange={(e) => setEligibility((prev) => prev.map((x) => (x.id === item.id ? { ...x, text_hi: e.target.value } : x)))}
                    placeholder="Hindi criteria (वैकल्पिक)"
                    className="w-full sm:flex-1"
                  />
                  <button
                    onClick={() => removeEligibility(item.id)}
                    className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label="Remove"
                  >
                    <AdminIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="mt-4" onClick={addEligibility}>
              <AdminIcon name="plus" className="w-4 h-4" />
              Add Eligibility Criteria
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}
