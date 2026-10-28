"use client";

import React, { useEffect, useMemo, useState } from "react";
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

type Category = "legal" | "rights" | "education" | "health" | "welfare" | "cells";

interface Aim {
  id: number;
  clause: string;
  category: Category;
  title_en: string;
  title_hi?: string;
  summary_en: string;
  summary_hi?: string;
  original_text: string;
  is_published: boolean;
  sort_order: number;
}

const categoryLabels: Record<Category, string> = {
  legal: "Legal Aid",
  rights: "Human Rights",
  education: "Education",
  health: "Healthcare",
  welfare: "Social Welfare",
  cells: "Trust Cell",
};

const emptyForm: Omit<Aim, "id"> = {
  clause: "",
  category: "legal",
  title_en: "",
  title_hi: "",
  summary_en: "",
  summary_hi: "",
  original_text: "",
  is_published: true,
  sort_order: 0,
};

export default function AdminAimsPage() {
  const { showToast } = useAdminToast();
  const [aims, setAims] = useState<Aim[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Aim, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchAims = async () => {
    try {
      const res = await fetch("/api/admin/data/aims");
      if (res.ok) {
        const data = await res.json();
        setAims(data);
      }
    } catch {
      showToast("Failed to fetch aims", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAims();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return aims.filter((a) => {
      const matchesSearch =
        q === "" ||
        (a.title_en && a.title_en.toLowerCase().includes(q)) ||
        (a.title_hi && a.title_hi.toLowerCase().includes(q)) ||
        (a.clause && a.clause.toLowerCase().includes(q));
      const matchesCategory =
        categoryFilter === "all" || a.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [aims, search, categoryFilter]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (aim: Aim) => {
    setEditingId(aim.id);
    setForm({
      clause: aim.clause || "",
      category: aim.category || "legal",
      title_en: aim.title_en || "",
      title_hi: aim.title_hi || "",
      summary_en: aim.summary_en || "",
      summary_hi: aim.summary_hi || "",
      original_text: aim.original_text || "",
      is_published: aim.is_published ?? true,
      sort_order: aim.sort_order ?? 0,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title_en.trim() || !form.clause.trim()) {
      showToast("Clause and English Title are required.", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingId !== null) {
        const res = await fetch(`/api/admin/data/aims/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        setAims((prev) => prev.map((a) => (a.id === editingId ? updated : a)));
        showToast("Aim updated successfully.");
      } else {
        const res = await fetch("/api/admin/data/aims", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setAims((prev) => [...prev, created]);
        showToast("New aim added successfully.");
      }
      setModalOpen(false);
    } catch {
      showToast("Failed to save aim", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this registered aim? This cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/data/aims/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setAims((prev) => prev.filter((a) => a.id !== id));
      showToast("Aim deleted.", "info");
    } catch {
      showToast("Failed to delete aim", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <AdminIcon
            name="search"
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
          />
          <Input
            placeholder="Search clause or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-52"
        >
          <option value="all">All Categories</option>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>
        <p className="text-[12.5px] text-slate-400 sm:ml-auto whitespace-nowrap hidden sm:block">
          {loading ? "Loading..." : `${filtered.length} of ${aims.length} aims`}
        </p>
        <Button onClick={openAddModal} className="w-full sm:w-auto sm:ml-0">
          <AdminIcon name="plus" className="w-4 h-4" />
          Add New Aim
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-[14px]">Loading aims from database...</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="scale"
            title="No aims found"
            description="Try adjusting your search or category filter, or add a new aim."
            action={
              <Button onClick={openAddModal}>
                <AdminIcon name="plus" className="w-4 h-4" />
                Add New Aim
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">
                    Clause
                  </th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">
                    Title
                  </th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 hidden sm:table-cell">
                    Published
                  </th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((aim) => (
                  <tr key={aim.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0D233A] text-white text-[11px] font-bold">
                        {aim.clause}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-[320px]">
                      <p className="text-[13.5px] font-bold text-[#0D233A]">
                        {aim.title_en}
                      </p>
                      {aim.title_hi && (
                        <p className="text-[12px] font-medium text-slate-500">
                          {aim.title_hi}
                        </p>
                      )}
                      <p className="text-[12px] text-slate-500 line-clamp-1 mt-0.5">
                        {aim.summary_en}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <Badge color="blue">{categoryLabels[aim.category]}</Badge>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      {aim.is_published ? (
                        <Badge color="green">Yes</Badge>
                      ) : (
                        <Badge color="slate">No</Badge>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(aim)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0066FF] inline-flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Edit aim"
                      >
                        <AdminIcon name="pencil" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(aim.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 inline-flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Delete aim"
                      >
                        <AdminIcon name="trash" className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId !== null ? "Edit Registered Aim" : "Add New Aim"}
        description="These details appear on the public Our Aims & Objectives page"
        maxWidth="max-w-2xl"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingId !== null ? "Save Changes" : "Add Aim"}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Clause Label">
            <Input
              value={form.clause}
              onChange={(e) => setForm({ ...form, clause: e.target.value })}
              placeholder="Clause 46"
            />
          </Field>
          <Field label="Category">
            <Select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as Category })
              }
            >
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="English Title" className="sm:col-span-2">
            <Input
              value={form.title_en}
              onChange={(e) => setForm({ ...form, title_en: e.target.value })}
              placeholder="Title shown on the public aims card"
            />
          </Field>
          <Field label="Hindi Title (वैकल्पिक)" className="sm:col-span-2">
            <Input
              value={form.title_hi || ""}
              onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
              placeholder="उद्देश्य का हिंदी शीर्षक"
            />
          </Field>
          <Field label="English Summary" className="sm:col-span-2">
            <Textarea
              rows={2}
              value={form.summary_en}
              onChange={(e) => setForm({ ...form, summary_en: e.target.value })}
              placeholder="Plain-language explanation of how the Trust executes this aim"
            />
          </Field>
          <Field label="Hindi Summary (वैकल्पिक)" className="sm:col-span-2">
            <Textarea
              rows={2}
              value={form.summary_hi || ""}
              onChange={(e) => setForm({ ...form, summary_hi: e.target.value })}
              placeholder="हिंदी में संक्षिप्त विवरण"
            />
          </Field>
          <Field label="Original Legal Text (Trust Deed Wording)" className="sm:col-span-2">
            <Textarea
              rows={3}
              value={form.original_text}
              onChange={(e) => setForm({ ...form, original_text: e.target.value })}
            />
          </Field>
          <label className="sm:col-span-2 flex items-center gap-2.5 text-[13.5px] font-medium text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
            />
            Publish on the public website
          </label>
        </div>
      </Modal>
    </div>
  );
}
