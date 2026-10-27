"use client";

import React, { useState } from "react";
import AdminIcon from "../_components/icons";
import { Button, Card, EmptyState, Field, Input, Modal, Textarea } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

interface Bearer {
  id: number;
  name: string;
  role: string;
  description: string;
  address: string;
  isChairman?: boolean;
}

const seedBearers: Bearer[] = [
  {
    id: 1,
    name: "Advocate Momin Malik",
    role: "Chairman",
    description:
      "Leading the Trust's legal and humanitarian mission, personally representing petitions before the Courts of Haryana on behalf of victims of injustice.",
    address: "Chamber No. 177, District & Sessions Courts, Panipat, Haryana",
    isChairman: true,
  },
  {
    id: 2,
    name: "Position Open",
    role: "Vice Chairman",
    description:
      "Assists the Chairman in strategic direction, judicial liaison and inter-state coordination of legal aid camps.",
    address: "",
  },
  {
    id: 3,
    name: "Position Open",
    role: "General Secretary",
    description:
      "Oversees day-to-day administration, correspondence with government bodies, and the Trust's annual reporting.",
    address: "",
  },
  {
    id: 4,
    name: "Position Open",
    role: "Treasurer",
    description:
      "Manages donations, disbursement of welfare funds, and statutory financial compliance of the Trust.",
    address: "",
  },
  {
    id: 5,
    name: "Position Open",
    role: "Legal Advisor",
    description:
      "Panel of empanelled advocates guiding case strategy for prisoners' welfare and constitutional matters.",
    address: "",
  },
];

const emptyForm: Omit<Bearer, "id"> = {
  name: "",
  role: "",
  description: "",
  address: "",
};

export default function AdminOfficeBearersPage() {
  const { showToast } = useAdminToast();
  const [bearers, setBearers] = useState<Bearer[]>(seedBearers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Bearer, "id">>(emptyForm);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (b: Bearer) => {
    setEditingId(b.id);
    setForm({ name: b.name, role: b.role, description: b.description, address: b.address });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.role.trim()) {
      showToast("Name and role are required.", "error");
      return;
    }
    if (editingId !== null) {
      setBearers((prev) =>
        prev.map((b) => (b.id === editingId ? { ...b, ...form } : b))
      );
      showToast("Office bearer updated successfully.");
    } else {
      setBearers((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("Office bearer added successfully.");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Remove this office bearer?")) return;
    setBearers((prev) => prev.filter((b) => b.id !== id));
    showToast("Office bearer removed.", "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button onClick={openAdd}>
          <AdminIcon name="plus" className="w-4 h-4" />
          Add Office Bearer
        </Button>
      </div>

      {bearers.length === 0 ? (
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
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-[0_4px_20px_rgba(13,35,58,0.04)] ${
                b.isChairman ? "border-[#0066FF]/30" : "border-slate-200/80"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0D233A] text-white flex items-center justify-center font-bold text-[13px] shrink-0">
                    {b.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-[15px] font-extrabold text-[#0D233A] leading-snug">
                      {b.name}
                    </p>
                    <p className="text-[12.5px] font-semibold text-[#0066FF]">
                      {b.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(b)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0066FF] inline-flex items-center justify-center transition-colors"
                    aria-label="Edit"
                  >
                    <AdminIcon name="pencil" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 inline-flex items-center justify-center transition-colors"
                    aria-label="Delete"
                  >
                    <AdminIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                {b.description}
              </p>
              {b.address && (
                <p className="mt-2.5 text-[12px] text-slate-400 flex items-start gap-1.5">
                  <AdminIcon name="building" className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  {b.address}
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
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId !== null ? "Save Changes" : "Add Bearer"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Full Name">
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Advocate Momin Malik"
            />
          </Field>
          <Field label="Role / Designation">
            <Input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Chairman"
            />
          </Field>
          <Field label="Description">
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>
          <Field label="Chamber / Office Address" hint="Optional">
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
