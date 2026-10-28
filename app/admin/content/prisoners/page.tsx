"use client";

import React, { useEffect, useState } from "react";
import AdminIcon from "../../_components/icons";
import { Button, Card, Field, Input, Textarea } from "../../_components/ui";
import { useAdminToast } from "../../_components/Toast";

interface Item {
  id: number;
  title_en: string;
  title_hi?: string;
  text_en: string;
  text_hi?: string;
  sort_order?: number;
}

export default function PrisonersContentPage() {
  const { showToast } = useAdminToast();
  const [loading, setLoading] = useState(true);

  const [banner, setBanner] = useState({
    title_en: "Muslim Prisoners Welfare",
    title_hi: "मुस्लिम कैदी कल्याण — सहायता, अधिकार एवं पुनर्वास",
    description_en:
      "We focus on the welfare of Muslim prisoners by providing legal assistance, jail visits, family support and rehabilitation programs — standing with the under-trial, the convicted, and even those who remain confined after completing their sentence.",
    description_hi:
      "हम कानूनी सहायता, जेल दौरे, पारिवारिक सहायता और पुनर्वास कार्यक्रमों के माध्यम से मुस्लिम कैदियों के कल्याण पर ध्यान केंद्रित करते हैं — विचाराधीन कैदियों, दोषियों और उन लोगों के साथ खड़े हैं जो अपनी सजा पूरी करने के बाद भी जेल में बंद हैं।",
  });

  const [supportCards, setSupportCards] = useState<Item[]>([]);
  const [steps, setSteps] = useState<Item[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/content/prisoners_banner").then((r) => r.ok && r.json()),
      fetch("/api/admin/data/prisoner_support_cards").then((r) => r.ok && r.json()),
      fetch("/api/admin/data/prisoner_steps").then((r) => r.ok && r.json()),
    ])
      .then(([bannerData, cardsData, stepsData]) => {
        if (bannerData && Object.keys(bannerData).length) setBanner((prev) => ({ ...prev, ...bannerData }));
        if (Array.isArray(cardsData)) setSupportCards(cardsData);
        if (Array.isArray(stepsData)) setSteps(stepsData);
      })
      .finally(() => setLoading(false));
  }, []);

  const saveBanner = async () => {
    try {
      const res = await fetch("/api/admin/content/prisoners_banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(banner),
      });
      if (!res.ok) throw new Error();
      showToast("Banner updated successfully.");
    } catch {
      showToast("Failed to update banner", "error");
    }
  };

  const saveCards = async () => {
    try {
      await Promise.all(
        supportCards.map((c) =>
          fetch(`/api/admin/data/prisoner_support_cards/${c.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title_en: c.title_en,
              title_hi: c.title_hi || "",
              text_en: c.text_en,
              text_hi: c.text_hi || "",
            }),
          })
        )
      );
      showToast("Support cards updated successfully.");
    } catch {
      showToast("Failed to update support cards", "error");
    }
  };

  const addCard = async () => {
    try {
      const res = await fetch("/api/admin/data/prisoner_support_cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title_en: "New Support Area",
          title_hi: "",
          text_en: "Description of assistance provided",
          text_hi: "",
          sort_order: supportCards.length + 1,
        }),
      });
      if (res.ok) {
        const item = await res.json();
        setSupportCards((prev) => [...prev, item]);
        showToast("New support card added.");
      }
    } catch {
      showToast("Failed to add card", "error");
    }
  };

  const removeCard = async (id: number) => {
    try {
      await fetch(`/api/admin/data/prisoner_support_cards/${id}`, { method: "DELETE" });
      setSupportCards((prev) => prev.filter((i) => i.id !== id));
      showToast("Support card removed.");
    } catch {
      showToast("Failed to remove card", "error");
    }
  };

  const saveSteps = async () => {
    try {
      await Promise.all(
        steps.map((s) =>
          fetch(`/api/admin/data/prisoner_steps/${s.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title_en: s.title_en,
              title_hi: s.title_hi || "",
              text_en: s.text_en,
              text_hi: s.text_hi || "",
            }),
          })
        )
      );
      showToast("Process steps updated successfully.");
    } catch {
      showToast("Failed to update process steps", "error");
    }
  };

  const addStep = async () => {
    try {
      const res = await fetch("/api/admin/data/prisoner_steps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title_en: "New Step",
          title_hi: "",
          text_en: "Step details and timeline",
          text_hi: "",
          sort_order: steps.length + 1,
        }),
      });
      if (res.ok) {
        const item = await res.json();
        setSteps((prev) => [...prev, item]);
        showToast("New process step added.");
      }
    } catch {
      showToast("Failed to add step", "error");
    }
  };

  const removeStep = async (id: number) => {
    try {
      await fetch(`/api/admin/data/prisoner_steps/${id}`, { method: "DELETE" });
      setSteps((prev) => prev.filter((i) => i.id !== id));
      showToast("Step removed.");
    } catch {
      showToast("Failed to remove step", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-blue-50/70 border border-blue-100 px-5 py-3.5 flex items-start gap-3">
        <AdminIcon name="shield" className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#2B4A72]">
          Manage the content shown on the public{" "}
          <span className="font-semibold">Muslim Prisoners Welfare</span> page.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-[14px]">Loading prisoners welfare content...</div>
      ) : (
        <>
          <Card
            title="Page Banner"
            action={<Button onClick={saveBanner}>Save Changes</Button>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="English Title">
                <Input value={banner.title_en} onChange={(e) => setBanner({ ...banner, title_en: e.target.value })} />
              </Field>
              <Field label="Hindi Title (वैकल्पिक)">
                <Input value={banner.title_hi || ""} onChange={(e) => setBanner({ ...banner, title_hi: e.target.value })} />
              </Field>
              <Field label="English Description" className="sm:col-span-2">
                <Textarea rows={2} value={banner.description_en} onChange={(e) => setBanner({ ...banner, description_en: e.target.value })} />
              </Field>
              <Field label="Hindi Description (वैकल्पिक)" className="sm:col-span-2">
                <Textarea rows={2} value={banner.description_hi || ""} onChange={(e) => setBanner({ ...banner, description_hi: e.target.value })} />
              </Field>
            </div>
          </Card>

          <Card
            title="How We Help — Support Cards"
            description="Support cards shown on the prisoners welfare page"
            action={<Button onClick={saveCards}>Save Changes</Button>}
          >
            <div className="space-y-4">
              {supportCards.map((item) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-3 items-start bg-slate-50/60 border border-slate-200/70 rounded-xl p-3.5">
                  <div className="space-y-2">
                    <Input
                      value={item.title_en}
                      onChange={(e) => setSupportCards((prev) => prev.map((c) => (c.id === item.id ? { ...c, title_en: e.target.value } : c)))}
                      placeholder="English card title"
                      className="font-semibold"
                    />
                    <Input
                      value={item.title_hi || ""}
                      onChange={(e) => setSupportCards((prev) => prev.map((c) => (c.id === item.id ? { ...c, title_hi: e.target.value } : c)))}
                      placeholder="Hindi card title"
                      className="text-[13px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      rows={2}
                      value={item.text_en}
                      onChange={(e) => setSupportCards((prev) => prev.map((c) => (c.id === item.id ? { ...c, text_en: e.target.value } : c)))}
                      placeholder="English description"
                    />
                    <Textarea
                      rows={2}
                      value={item.text_hi || ""}
                      onChange={(e) => setSupportCards((prev) => prev.map((c) => (c.id === item.id ? { ...c, text_hi: e.target.value } : c)))}
                      placeholder="Hindi description (वैकल्पिक)"
                    />
                  </div>
                  <button
                    onClick={() => removeCard(item.id)}
                    className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label="Remove"
                  >
                    <AdminIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="mt-4" onClick={addCard}>
              <AdminIcon name="plus" className="w-4 h-4" />
              Add Support Card
            </Button>
          </Card>

          <Card
            title="Our Process — Steps"
            description="The step-by-step workflow for prisoner aid"
            action={<Button onClick={saveSteps}>Save Changes</Button>}
          >
            <div className="space-y-4">
              {steps.map((item, idx) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[auto_1fr_2fr_auto] gap-3 items-start bg-slate-50/60 border border-slate-200/70 rounded-xl p-3.5">
                  <span className="w-8 h-8 rounded-full bg-[#0D233A] text-white flex items-center justify-center font-bold text-[12px] shrink-0 mt-1">
                    {idx + 1}
                  </span>
                  <div className="space-y-2">
                    <Input
                      value={item.title_en}
                      onChange={(e) => setSteps((prev) => prev.map((s) => (s.id === item.id ? { ...s, title_en: e.target.value } : s)))}
                      placeholder="English step title"
                      className="font-semibold"
                    />
                    <Input
                      value={item.title_hi || ""}
                      onChange={(e) => setSteps((prev) => prev.map((s) => (s.id === item.id ? { ...s, title_hi: e.target.value } : s)))}
                      placeholder="Hindi step title"
                      className="text-[13px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      rows={2}
                      value={item.text_en}
                      onChange={(e) => setSteps((prev) => prev.map((s) => (s.id === item.id ? { ...s, text_en: e.target.value } : s)))}
                      placeholder="English description"
                    />
                    <Textarea
                      rows={2}
                      value={item.text_hi || ""}
                      onChange={(e) => setSteps((prev) => prev.map((s) => (s.id === item.id ? { ...s, text_hi: e.target.value } : s)))}
                      placeholder="Hindi description (वैकल्पिक)"
                    />
                  </div>
                  <button
                    onClick={() => removeStep(item.id)}
                    className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label="Remove"
                  >
                    <AdminIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="mt-4" onClick={addStep}>
              <AdminIcon name="plus" className="w-4 h-4" />
              Add Step
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}
