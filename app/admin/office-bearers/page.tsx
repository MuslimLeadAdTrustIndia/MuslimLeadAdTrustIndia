"use client";

import React, { useEffect, useState } from "react";
import AdminIcon from "../_components/icons";
import { Button, Card, EmptyState, Field, Input, Modal, Textarea } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

interface Bearer {
  id: number;
  name_en: string;
  name_hi?: string;
  role_en: string;
  role_hi?: string;
  description_en: string;
  description_hi?: string;
  address_en: string;
  address_hi?: string;
  photo_url?: string;
  sort_order: number;
}

const emptyForm: Omit<Bearer, "id"> = {
  name_en: "",
  name_hi: "",
  role_en: "",
  role_hi: "",
  description_en: "",
  description_hi: "",
  address_en: "",
  address_hi: "",
  sort_order: 0,
};

export default function AdminOfficeBearersPage() {
  const { showToast } = useAdminToast();
  const [bearers, setBearers] = useState<Bearer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Bearer, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchBearers = async () => {
    try {
      const res = await fetch("/api/admin/data/office_bearers");
      if (res.ok) {
        const data = await res.json();
        setBearers(data);
      }
    } catch {
      showToast("Failed to fetch office bearers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBearers();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (b: Bearer) => {
    setEditingId(b.id);
    setForm({
      name_en: b.name_en || "",
      name_hi: b.name_hi || "",
      role_en: b.role_en || "",
      role_hi: b.role_hi || "",
      description_en: b.description_en || "",
      description_hi: b.description_hi || "",
      address_en: b.address_en || "",
      address_hi: b.address_hi || "",
      sort_order: b.sort_order ?? 0,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name_en.trim() || !form.role_en.trim()) {
      showToast("English Name and Role are required.", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingId !== null) {
        const res = await fetch(`/api/admin/data/office_bearers/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        setBearers((prev) => prev.map((b) => (b.id === editingId ? updated : b)));
        showToast("Office bearer updated successfully.");
      } else {
        const res = await fetch("/api/admin/data/office_bearers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setBearers((prev) => [...prev, created]);
        showToast("Office bearer added successfully.");
      }
      setModalOpen(false);
    } catch {
      showToast("Failed to save office bearer", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Remove this office bearer?")) return;
    try {
      const res = await fetch(`/api/admin/data/office_bearers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setBearers((prev) => prev.filter((b) => b.id !== id));
      showToast("Office bearer removed.", "info");
    } catch {
      showToast("Failed to delete office bearer", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[13.5px] text-slate-500">
          Manage the leadership team and committee members displayed on the website.
        </p>
        <Button onClick={openAdd}>
          <AdminIcon name="plus" className="w-4 h-4" />
          Add Office Bearer
        </Button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-[14px]">Loading office bearers...</div>
      ) : bearers.length === 0 ? (
        <Card>
          <EmptyState
            icon="users"
            title="No office bearers yet"
            description="Add the Trust's leadership and committee roles."
            action={
              <Button onClick={openAdd}>
                <AdminIcon name="plus" className="w-4 h-4" />
                Add Office Bearer
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bearers.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgba(13,35,58,0.04)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0D233A] text-white flex items-center justify-center font-bold text-[13px] shrink-0 uppercase">
                    {(b.name_en || "OB")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0D233A]">{b.name_en}</h3>
                    {b.name_hi && (
                      <p className="text-[12px] text-slate-500">{b.name_hi}</p>
                    )}
                    <span className="inline-block mt-1 text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200">
                      {b.role_en} {b.role_hi ? `(${b.role_hi})` : ""}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(b)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0066FF] inline-flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Edit"
                  >
                    <AdminIcon name="pencil" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 inline-flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Delete"
                  >
                    <AdminIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-[13px] text-slate-600 mt-4 leading-relaxed">
                {b.description_en}
              </p>
              {b.description_hi && (
                <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
                  {b.description_hi}
                </p>
              )}

              {b.address_en && (
                <p className="text-[11.5px] text-slate-400 mt-3 pt-3 border-t border-slate-100">
                  📍 {b.address_en}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId !== null ? "Edit Office Bearer" : "Add Office Bearer"}
        description="Leadership details shown on the public Office Bearers page"
        maxWidth="max-w-xl"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingId !== null ? "Save Changes" : "Add Bearer"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="English Full Name">
              <Input
                value={form.name_en}
                onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                placeholder="Advocate Momin Malik"
              />
            </Field>
            <Field label="Hindi Full Name (वैकल्पिक)">
              <Input
                value={form.name_hi || ""}
                onChange={(e) => setForm({ ...form, name_hi: e.target.value })}
                placeholder="एडवोकेट मोमिन मलिक"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="English Role / Designation">
              <Input
                value={form.role_en}
                onChange={(e) => setForm({ ...form, role_en: e.target.value })}
                placeholder="Chairman"
              />
            </Field>
            <Field label="Hindi Role / पद (वैकल्पिक)">
              <Input
                value={form.role_hi || ""}
                onChange={(e) => setForm({ ...form, role_hi: e.target.value })}
                placeholder="अध्यक्ष"
              />
            </Field>
          </div>

          <Field label="English Description">
            <Textarea
              rows={2}
              value={form.description_en}
              onChange={(e) => setForm({ ...form, description_en: e.target.value })}
              placeholder="Brief summary of duties and representation"
            />
          </Field>
          <Field label="Hindi Description (वैकल्पिक)">
            <Textarea
              rows={2}
              value={form.description_hi || ""}
              onChange={(e) => setForm({ ...form, description_hi: e.target.value })}
              placeholder="हिंदी में संक्षिप्त विवरण"
            />
          </Field>

          <Field label="Chamber / Office Address" hint="Optional">
            <Input
              value={form.address_en}
              onChange={(e) => setForm({ ...form, address_en: e.target.value })}
              placeholder="Chamber No., Court Complex, City"
            />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
