"use client";

import React, { useState } from "react";
import AdminIcon from "../../_components/icons";
import { Button, Card, Field, Input, Textarea } from "../../_components/ui";
import { useAdminToast } from "../../_components/Toast";

interface PracticeArea {
  id: number;
  title: string;
  text: string;
}

interface EligibilityItem {
  id: number;
  text: string;
}

export default function LegalHelpContentPage() {
  const { showToast } = useAdminToast();

  const [intro, setIntro] = useState({
    title: "No One Should Be Denied Justice for Lack of Means",
    description:
      "Our empanelled advocates take up cases at trial courts, High Courts and the Supreme Court — from bail pleas to constitutional petitions.",
  });

  const [areas, setAreas] = useState<PracticeArea[]>([
    { id: 1, title: "Bail Assistance & Rehabilitation", text: "Filing timely bail applications, furnishing sureties, and post-release reintegration support." },
    { id: 2, title: "Civil, Criminal & Constitutional Aid", text: "Full-spectrum litigation assistance in trial courts, High Courts and the Supreme Court." },
    { id: 3, title: "Public Interest Litigation", text: "Strategic PILs defending constitutional guarantees and civil liberties for the community." },
    { id: 4, title: "Mediation & Family Disputes", text: "Peaceful alternative dispute resolution for matrimonial, family and community conflicts." },
    { id: 5, title: "Protection of Religious & Waqf Property", text: "Legal defense of mosques, dargahs, graveyards and heritage sites against encroachment." },
    { id: 6, title: "Legal Literacy Camps", text: "On-ground legal aid camps in villages, backward tehsils, and urban slums." },
  ]);

  const [eligibility, setEligibility] = useState<EligibilityItem[]>([
    { id: 1, text: "Under-trial and sentenced prisoners in Indian jails" },
    { id: 2, text: "Orphans, widows, senior citizens and handicapped persons" },
    { id: 3, text: "Victims of injustice, hate crimes, or false implication" },
    { id: 4, text: "Indian nationals facing trial abroad" },
    { id: 5, text: "Poor law students seeking financial or mentorship aid" },
    { id: 6, text: "Anyone unable to afford legal representation" },
  ]);

  const addArea = () =>
    setAreas((prev) => [...prev, { id: Date.now(), title: "New Practice Area", text: "" }]);
  const removeArea = (id: number) =>
    setAreas((prev) => prev.filter((a) => a.id !== id));

  const addEligibility = () =>
    setEligibility((prev) => [...prev, { id: Date.now(), text: "" }]);
  const removeEligibility = (id: number) =>
    setEligibility((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-blue-50/70 border border-blue-100 px-5 py-3.5 flex items-start gap-3">
        <AdminIcon name="book" className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#2B4A72]">
          Manage the content shown on the public{" "}
          <span className="font-semibold">Legal Aid &amp; Representation</span> page.
        </p>
      </div>

      <Card
        title="Intro Block"
        action={<Button onClick={() => showToast("Intro block updated successfully.")}>Save Changes</Button>}
      >
        <div className="space-y-4">
          <Field label="Title">
            <Input value={intro.title} onChange={(e) => setIntro({ ...intro, title: e.target.value })} />
          </Field>
          <Field label="Description">
            <Textarea rows={3} value={intro.description} onChange={(e) => setIntro({ ...intro, description: e.target.value })} />
          </Field>
        </div>
      </Card>

      <Card
        title="Areas of Practice"
        description="Practice area cards shown in a 3-column grid"
        action={<Button onClick={() => showToast("Practice areas updated successfully.")}>Save Changes</Button>}
      >
        <div className="space-y-4">
          {areas.map((area) => (
            <div key={area.id} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-3 items-start bg-slate-50/60 border border-slate-200/70 rounded-xl p-3.5">
              <Input
                value={area.title}
                onChange={(e) =>
                  setAreas((prev) =>
                    prev.map((a) => (a.id === area.id ? { ...a, title: e.target.value } : a))
                  )
                }
                className="font-semibold"
              />
              <Textarea
                rows={2}
                value={area.text}
                onChange={(e) =>
                  setAreas((prev) =>
                    prev.map((a) => (a.id === area.id ? { ...a, text: e.target.value } : a))
                  )
                }
              />
              <button
                onClick={() => removeArea(area.id)}
                className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors justify-self-end sm:justify-self-auto"
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
        description="Who can apply for free legal aid"
        action={<Button onClick={() => showToast("Eligibility list updated successfully.")}>Save Changes</Button>}
      >
        <div className="space-y-2.5">
          {eligibility.map((item) => (
            <div key={item.id} className="flex items-center gap-2.5">
              <AdminIcon name="check" className="w-4 h-4 text-emerald-600 shrink-0" />
              <Input
                value={item.text}
                onChange={(e) =>
                  setEligibility((prev) =>
                    prev.map((el) => (el.id === item.id ? { ...el, text: e.target.value } : el))
                  )
                }
                className="flex-1"
              />
              <button
                onClick={() => removeEligibility(item.id)}
                className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors shrink-0"
                aria-label="Remove"
              >
                <AdminIcon name="trash" className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" className="mt-4" onClick={addEligibility}>
          <AdminIcon name="plus" className="w-4 h-4" />
          Add Eligibility Item
        </Button>
      </Card>
    </div>
  );
}
