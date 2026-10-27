"use client";

import React, { useMemo, useState } from "react";
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
  title: string;
  summary: string;
  originalText: string;
  highlight: boolean;
}

const categoryLabels: Record<Category, string> = {
  legal: "Legal Aid",
  rights: "Human Rights",
  education: "Education",
  health: "Healthcare",
  welfare: "Social Welfare",
  cells: "Trust Cell",
};

const seedAims: Aim[] = [
  {
    id: 2,
    clause: "Clause 2",
    category: "legal",
    title: "Relief for Under-trials & Sentenced Prisoners",
    summary:
      "Working for victim Muslims and other inmates confined in Indian and foreign jails.",
    originalText:
      "To work for victim Muslims and others also, who is confined in various jail of India on under trials and awarded sentenced holder.",
    highlight: true,
  },
  {
    id: 4,
    clause: "Clause 4",
    category: "legal",
    title: "Jail Inspections & Free Legal Assistance",
    summary:
      "Routine legal inspection of correctional homes and extending free legal counsel to the needy.",
    originalText:
      "To inspect the Jails and provide them free legal helps to the orphans, poor, handicapped, widows, senior citizen and requestors.",
    highlight: true,
  },
  {
    id: 9,
    clause: "Clause 9",
    category: "rights",
    title: "Anti-Trafficking & Child Protection",
    summary:
      "Eradicating human trafficking, child exploitation, and forced begging mafias.",
    originalText:
      "Human Anti-trafficking and children trafficking, Beggar Trafficking works.",
    highlight: false,
  },
  {
    id: 18,
    clause: "Clause 18",
    category: "education",
    title: "Scholarship & Aid to Poor Law Students",
    summary:
      "Financial aid, book grants, and courtroom internship mentorship for underprivileged students.",
    originalText: "To help the poor law students.",
    highlight: true,
  },
  {
    id: 24,
    clause: "Clause 24",
    category: "health",
    title: "Free Charitable Dispensaries & Medicines",
    summary:
      "Establishing public dispensaries and making free or subsidized medicines accessible to the poor.",
    originalText:
      "To work towards opening dispensaries and to strive for making free medicines available to poor and needy persons.",
    highlight: true,
  },
  {
    id: 45,
    clause: "Clause 45",
    category: "cells",
    title: "Establishment of Specialized Operational Cells",
    summary:
      "Constitution of dedicated wings: Anti-Mob Lynching Cell, Legal Cell, Cyber Crime Cell, Medical Cell and more.",
    originalText:
      "The trust will constitute the legal cell, Legal Clerk Cell, Legal Penals, Medical Cell, Anti beggar Cell...",
    highlight: true,
  },
];

const emptyForm: Omit<Aim, "id"> = {
  clause: "",
  category: "legal",
  title: "",
  summary: "",
  originalText: "",
  highlight: false,
};

export default function AdminAimsPage() {
  const { showToast } = useAdminToast();
  const [aims, setAims] = useState<Aim[]>(seedAims);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Aim, "id">>(emptyForm);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return aims.filter((a) => {
      const matchesSearch =
        q === "" ||
        a.title.toLowerCase().includes(q) ||
        a.clause.toLowerCase().includes(q);
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
      clause: aim.clause,
      category: aim.category,
      title: aim.title,
      summary: aim.summary,
      originalText: aim.originalText,
      highlight: aim.highlight,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.clause.trim()) {
      showToast("Clause and title are required.", "error");
      return;
    }
    if (editingId !== null) {
      setAims((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
      );
      showToast("Aim updated successfully.");
    } else {
      setAims((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("New aim added successfully.");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this registered aim? This cannot be undone.")) {
      return;
    }
    setAims((prev) => prev.filter((a) => a.id !== id));
    showToast("Aim deleted.", "info");
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
          {filtered.length} of {aims.length} aims
        </p>
        <Button onClick={openAddModal} className="w-full sm:w-auto sm:ml-0">
          <AdminIcon name="plus" className="w-4 h-4" />
          Add New Aim
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] overflow-hidden">
        {filtered.length === 0 ? (
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
                    Highlighted
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
                        {aim.title}
                      </p>
                      <p className="text-[12px] text-slate-500 line-clamp-1">
                        {aim.summary}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <Badge color="blue">{categoryLabels[aim.category]}</Badge>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      {aim.highlight ? (
                        <Badge color="green">Yes</Badge>
                      ) : (
                        <Badge color="slate">No</Badge>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(aim)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0066FF] inline-flex items-center justify-center transition-colors"
                        aria-label="Edit aim"
                      >
                        <AdminIcon name="pencil" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(aim.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 inline-flex items-center justify-center transition-colors"
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
            <Button onClick={handleSave}>
              {editingId !== null ? "Save Changes" : "Add Aim"}
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
          <Field label="Title" className="sm:col-span-2">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title shown on the public aims card"
            />
          </Field>
          <Field label="Summary" className="sm:col-span-2">
            <Textarea
              rows={2}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              placeholder="Plain-language explanation of how the Trust executes this aim"
            />
          </Field>
          <Field label="Original Legal Text (Trust Deed Wording)" className="sm:col-span-2">
            <Textarea
              rows={3}
              value={form.originalText}
              onChange={(e) => setForm({ ...form, originalText: e.target.value })}
            />
          </Field>
          <label className="sm:col-span-2 flex items-center gap-2.5 text-[13.5px] font-medium text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={form.highlight}
              onChange={(e) => setForm({ ...form, highlight: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
            />
            Mark as a highlighted aim on the public page
          </label>
        </div>
      </Modal>
    </div>
  );
}
