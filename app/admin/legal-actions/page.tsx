"use client";

import React, { useEffect, useState } from "react";
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
  title_en: string;
  title_hi?: string;
  court_en: string;
  court_hi?: string;
  status: CaseStatus;
  action_date: string;
  summary_en: string;
  summary_hi?: string;
}

function statusColor(status: CaseStatus): "green" | "amber" | "blue" {
  if (status === "Active") return "blue";
  if (status === "Pending") return "amber";
  return "green";
}

const emptyForm: Omit<LegalCase, "id"> = {
  title_en: "",
  title_hi: "",
  court_en: "",
  court_hi: "",
  status: "Active",
  action_date: "",
  summary_en: "",
  summary_hi: "",
};

export default function AdminLegalActionsPage() {
  const { showToast } = useAdminToast();
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<LegalCase, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchCases = async () => {
    try {
      const res = await fetch("/api/admin/data/legal_actions");
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch {
      showToast("Failed to fetch legal actions", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, action_date: new Date().toISOString().slice(0, 10) });
    setModalOpen(true);
  };

  const openEdit = (c: LegalCase) => {
    setEditingId(c.id);
    setForm({
      title_en: c.title_en || "",
      title_hi: c.title_hi || "",
      court_en: c.court_en || "",
      court_hi: c.court_hi || "",
      status: c.status || "Active",
      action_date: c.action_date || new Date().toISOString().slice(0, 10),
      summary_en: c.summary_en || "",
      summary_hi: c.summary_hi || "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title_en.trim() || !form.court_en.trim()) {
      showToast("Case title and court are required.", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingId !== null) {
        const res = await fetch(`/api/admin/data/legal_actions/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        setCases((prev) => prev.map((c) => (c.id === editingId ? updated : c)));
        showToast("Case update saved successfully.");
      } else {
        const res = await fetch("/api/admin/data/legal_actions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setCases((prev) => [created, ...prev]);
        showToast("New case update published.");
      }
      setModalOpen(false);
    } catch {
      showToast("Failed to save legal action", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Remove this legal action entry?")) return;
    try {
      const res = await fetch(`/api/admin/data/legal_actions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setCases((prev) => prev.filter((c) => c.id !== id));
      showToast("Case update removed.", "info");
    } catch {
      showToast("Failed to delete entry", "error");
    }
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

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-[14px]">Loading legal actions...</div>
      ) : cases.length === 0 ? (
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
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge color={statusColor(c.status)}>{c.status}</Badge>
                    <span className="text-[12px] font-semibold text-slate-400">
                      {c.action_date}
                    </span>
                    <span className="text-[12px] text-slate-400">•</span>
                    <span className="text-[12.5px] font-medium text-slate-500">
                      {c.court_en} {c.court_hi ? `(${c.court_hi})` : ""}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-[#0D233A] leading-snug pt-1">
                    {c.title_en}
                  </h3>
                  {c.title_hi && (
                    <p className="text-[13.5px] font-medium text-slate-600">
                      {c.title_hi}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 sm:self-start">
                  <button
                    onClick={() => openEdit(c)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0066FF] inline-flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Edit"
                  >
                    <AdminIcon name="pencil" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 inline-flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Delete"
                  >
                    <AdminIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-[13.5px] text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                {c.summary_en}
              </p>
              {c.summary_hi && (
                <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                  {c.summary_hi}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId !== null ? "Edit Case Update" : "Add Case Update"}
        description="Public court and advocacy update"
        maxWidth="max-w-xl"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingId !== null ? "Save Changes" : "Publish Update"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="English Case Title">
            <Input
              value={form.title_en}
              onChange={(e) => setForm({ ...form, title_en: e.target.value })}
              placeholder="e.g. Panipat Court Issues Notice on Petition..."
            />
          </Field>
          <Field label="Hindi Case Title (वैकल्पिक)">
            <Input
              value={form.title_hi || ""}
              onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
              placeholder="हिंदी में शीर्षक"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="English Court / Jurisdiction">
              <Input
                value={form.court_en}
                onChange={(e) => setForm({ ...form, court_en: e.target.value })}
                placeholder="Court of CJM, Panipat"
              />
            </Field>
            <Field label="Hindi Court (वैकल्पिक)">
              <Input
                value={form.court_hi || ""}
                onChange={(e) => setForm({ ...form, court_hi: e.target.value })}
                placeholder="न्यायालय, पानीपत"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Date of Action / Hearing">
              <Input
                type="date"
                value={form.action_date}
                onChange={(e) => setForm({ ...form, action_date: e.target.value })}
              />
            </Field>
            <Field label="Status">
              <Select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as CaseStatus })
                }
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </Select>
            </Field>
          </div>

          <Field label="English Summary / Relief Sought">
            <Textarea
              rows={3}
              value={form.summary_en}
              onChange={(e) => setForm({ ...form, summary_en: e.target.value })}
              placeholder="Key facts, legal points, and next hearing date..."
            />
          </Field>
          <Field label="Hindi Summary (वैकल्पिक)">
            <Textarea
              rows={2}
              value={form.summary_hi || ""}
              onChange={(e) => setForm({ ...form, summary_hi: e.target.value })}
              placeholder="मुख्य विवरण हिंदी में..."
            />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
