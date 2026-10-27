"use client";

import React, { useState } from "react";
import AdminIcon from "../../_components/icons";
import { Button, Card, Field, Input, Textarea } from "../../_components/ui";
import { useAdminToast } from "../../_components/Toast";

interface Item {
  id: number;
  title: string;
  text: string;
}

export default function PrisonersContentPage() {
  const { showToast } = useAdminToast();

  const [banner, setBanner] = useState({
    title: "Support, Rights and Rehabilitation",
    description:
      "We focus on the welfare of Muslim prisoners by providing legal assistance, jail visits, family support and rehabilitation programs.",
  });

  const [supportCards, setSupportCards] = useState<Item[]>([
    { id: 1, title: "Jail Visits & Inspection", text: "Routine legal inspection of correctional homes to monitor conditions and identify cases needing urgent help." },
    { id: 2, title: "Family Counselling", text: "Guidance and emotional support for families of prisoners during difficult and uncertain times." },
    { id: 3, title: "Ration & Essentials", text: "Distribution of monthly rations, sewing machines and essential supplies to families facing financial hardship." },
    { id: 4, title: "Bail Assistance", text: "Timely filing of bail applications and furnishing of sureties to prevent prolonged, unjust detention." },
  ]);

  const [steps, setSteps] = useState<Item[]>([
    { id: 1, title: "Identification", text: "Jail visits and case intake to identify under-trials, sentenced prisoners and those detained beyond term." },
    { id: 2, title: "Legal Assessment", text: "Our legal panel reviews case records, FIRs and court history to determine the best course of relief." },
    { id: 3, title: "Representation", text: "Filing bail applications, arranging sureties, and representing cases before courts and tribunals." },
    { id: 4, title: "Rehabilitation", text: "Post-release counselling, family reintegration support, and vocational guidance for a dignified return to society." },
  ]);

  const updateItem = (
    list: Item[],
    setList: (v: Item[]) => void,
    id: number,
    key: "title" | "text",
    val: string
  ) => {
    setList(list.map((i) => (i.id === id ? { ...i, [key]: val } : i)));
  };

  const addItem = (setList: React.Dispatch<React.SetStateAction<Item[]>>) => {
    setList((prev) => [...prev, { id: Date.now(), title: "New Item", text: "" }]);
  };

  const removeItem = (setList: React.Dispatch<React.SetStateAction<Item[]>>, id: number) => {
    setList((prev) => prev.filter((i) => i.id !== id));
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

      <Card
        title="Page Banner"
        action={<Button onClick={() => showToast("Banner updated successfully.")}>Save Changes</Button>}
      >
        <div className="space-y-4">
          <Field label="Title">
            <Input value={banner.title} onChange={(e) => setBanner({ ...banner, title: e.target.value })} />
          </Field>
          <Field label="Description">
            <Textarea rows={3} value={banner.description} onChange={(e) => setBanner({ ...banner, description: e.target.value })} />
          </Field>
        </div>
      </Card>

      <Card
        title="How We Help — Support Cards"
        description="The four support cards shown on the page"
        action={<Button onClick={() => showToast("Support cards updated successfully.")}>Save Changes</Button>}
      >
        <div className="space-y-4">
          {supportCards.map((item) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-3 items-start bg-slate-50/60 border border-slate-200/70 rounded-xl p-3.5">
              <Input
                value={item.title}
                onChange={(e) => updateItem(supportCards, setSupportCards, item.id, "title", e.target.value)}
                placeholder="Card title"
                className="font-semibold"
              />
              <Textarea
                rows={2}
                value={item.text}
                onChange={(e) => updateItem(supportCards, setSupportCards, item.id, "text", e.target.value)}
                placeholder="Card description"
              />
              <button
                onClick={() => removeItem(setSupportCards, item.id)}
                className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors justify-self-end sm:justify-self-auto"
                aria-label="Remove"
              >
                <AdminIcon name="trash" className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" className="mt-4" onClick={() => addItem(setSupportCards)}>
          <AdminIcon name="plus" className="w-4 h-4" />
          Add Support Card
        </Button>
      </Card>

      <Card
        title="Our Process — Steps"
        description="The 4-step journey shown in the dark banner"
        action={<Button onClick={() => showToast("Process steps updated successfully.")}>Save Changes</Button>}
      >
        <div className="space-y-4">
          {steps.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[auto_1fr_2fr_auto] gap-3 items-start bg-slate-50/60 border border-slate-200/70 rounded-xl p-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#0D233A] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <Input
                value={item.title}
                onChange={(e) => updateItem(steps, setSteps, item.id, "title", e.target.value)}
                placeholder="Step title"
                className="font-semibold"
              />
              <Textarea
                rows={2}
                value={item.text}
                onChange={(e) => updateItem(steps, setSteps, item.id, "text", e.target.value)}
                placeholder="Step description"
              />
              <button
                onClick={() => removeItem(setSteps, item.id)}
                className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors justify-self-end sm:justify-self-auto"
                aria-label="Remove"
              >
                <AdminIcon name="trash" className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" className="mt-4" onClick={() => addItem(setSteps)}>
          <AdminIcon name="plus" className="w-4 h-4" />
          Add Step
        </Button>
      </Card>
    </div>
  );
}
