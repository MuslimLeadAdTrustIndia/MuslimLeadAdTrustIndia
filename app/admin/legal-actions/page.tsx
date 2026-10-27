"use client";

import React, { useState } from "react";
import AdminIcon from "../_components/icons";
import {
  Badge,
  Button,
  EmptyState,
  Field,
  Input,
  Modal,
  Select,
  Textarea,
} from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

type CaseStatus = "Active" | "Pending" | "Resolved";

interface LegalCase {
  id: number;
  title: string;
  court: string;
  status: CaseStatus;
  date: string;
  summary: string;
}

const seedCases: LegalCase[] = [
  {
    id: 1,
    title: "Panipat Court Issues Notice to Nazia Elahi Khan on Petition Filed by Advocate Momin Malik",
    court: "Court of CJM / Civil Judge, Panipat, Haryana",
    status: "Active",
    date: "2026-09-12",
    summary:
      "Formal judicial proceedings challenging objectionable and malicious remarks targeting Prophet Muhammad, Hazrat Aisha, and the Muslim community.",
  },
  {
    id: 2,
    title: "Bail Petition for Under-trial Prisoner Granted After 11 Months",
    court: "District & Sessions Court, Sonipat, Haryana",
    status: "Resolved",
    date: "2026-07-03",
    summary:
      "Successful bail representation for an under-trial prisoner detained without timely hearing, supported by the Trust's legal panel.",
  },
  {
    id: 3,
    title: "PIL Filed Against Encroachment on Waqf Burial Ground",
    court: "Punjab & Haryana High Court",
    status: "Pending",
    date: "2026-10-02",
    summary:
      "Public interest litigation seeking protection of a historic Muslim graveyard from illegal encroachment by private parties.",
  },
];

function statusColor(status: CaseStatus): "green" | "amber" | "blue" {
  if (status === "Active") return "blue";
  if (status === "Pending") return "amber";
  return "green";
}

const emptyForm: Omit<LegalCase, "id"> = {
  title: "",
  court: "",
  status: "Active",
  date: "",
  summary: "",
};

export default function AdminLegalActionsPage() {
  const { showToast } = useAdminToast();
  const [cases, setCases] = useState<LegalCase[]>(seedCases);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<LegalCase, "id">>(emptyForm);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setModalOpen(true);
  };

  const openEdit = (c: LegalCase) => {
    setEditingId(c.id);
    setForm({ title: c.title, court: c.court, status: c.status, date: c.date, summary: c.summary });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.court.trim()) {
      showToast("Case title and court are required.", "error");
      return;
    }
    if (editingId !== null) {
      setCases((prev) => prev.map((c) => (c.id === editingId ? { ...c, ...form } : c)));
      showToast("Case update saved successfully.");
    } else {
      setCases((prev) => [{ ...form, id: Date.now() }, ...prev]);
      showToast("New case update published.");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Remove this legal action entry?")) return;
    setCases((prev) => prev.filter((c) => c.id !== id));
    showToast("Case update removed.", "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13.5px] text-slate-500 max-w-lg">
          Publish updates about ongoing court cases and legal victories shown
          on the homepage and Our Aims page.
        </p>
        <Button onClick={openAdd} className="shrink-0">
          <AdminIcon name="plus" className="w-4 h-4" />
          Add Case Update
        </Button>
      </div>

      {cases.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80">
          <EmptyState
            icon="briefcase"
            title="No case updates yet"
            description="Publish your first legal action update."
            action={
              <Button onClick={openAdd}>
                <AdminIcon name="plus" className="w-4 h-4" />
                Add Case Update
              </Button>
            }
          />
        </div>
      ) : (
        <div className="space-y-4">
          {cases.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <Badge color={statusColor(c.status)}>{c.status}</Badge>
                  <span className="text-[12px] text-slate-400">
                    {new Date(c.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(c)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0066FF] inline-flex items-center justify-center transition-colors"
                    aria-label="Edit"
                  >
                    <AdminIcon name="pencil" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 inline-flex items-center justify-center transition-colors"
                    aria-label="Delete"
                  >
                    <AdminIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-[15.5px] font-extrabold text-[#0D233A] leading-snug">
                {c.title}
              </h3>
              <p className="text-[12.5px] font-semibold text-[#0066FF] mt-1">
                {c.court}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                {c.summary}
              </p>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId !== null ? "Edit Case Update" : "Add Case Update"}
        maxWidth="max-w-2xl"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId !== null ? "Save Changes" : "Publish Update"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Case Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Court / Jurisdiction">
              <Input value={form.court} onChange={(e) => setForm({ ...form, court: e.target.value })} />
            </Field>
            <Field label="Date">
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </Field>
          </div>
          <Field label="Status">
            <Select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as CaseStatus })}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </Select>
          </Field>
          <Field label="Summary">
            <Textarea rows={4} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
