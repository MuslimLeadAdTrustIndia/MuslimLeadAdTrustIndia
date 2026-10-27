"use client";

import React, { useState } from "react";
import AdminIcon from "../../_components/icons";
import { Badge, Button, EmptyState, Field, Input, Modal, Select } from "../../_components/ui";
import { useAdminToast } from "../../_components/Toast";

type Role = "Super Admin" | "Content Editor" | "Viewer";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  active: boolean;
}

const seedUsers: AdminUser[] = [
  { id: 1, name: "Admin User", email: "admin@mlatrust.org", role: "Super Admin", active: true },
  { id: 2, name: "Advocate Momin Malik", email: "momin.malik@mlatrust.org", role: "Content Editor", active: true },
  { id: 3, name: "Office Secretary", email: "secretary@mlatrust.org", role: "Viewer", active: false },
];

const roleColor: Record<Role, "blue" | "amber" | "slate"> = {
  "Super Admin": "blue",
  "Content Editor": "amber",
  Viewer: "slate",
};

const emptyForm: Omit<AdminUser, "id"> = {
  name: "",
  email: "",
  role: "Content Editor",
  active: true,
};

export default function AdminUsersPage() {
  const { showToast } = useAdminToast();
  const [users, setUsers] = useState<AdminUser[]>(seedUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<AdminUser, "id">>(emptyForm);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (u: AdminUser) => {
    setEditingId(u.id);
    setForm({ name: u.name, email: u.email, role: u.role, active: u.active });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      showToast("Name and email are required.", "error");
      return;
    }
    if (editingId !== null) {
      setUsers((prev) => prev.map((u) => (u.id === editingId ? { ...u, ...form } : u)));
      showToast("Admin user updated successfully.");
    } else {
      setUsers((prev) => [...prev, { ...form, id: Date.now() }]);
      showToast("Admin user invited successfully.");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Remove this admin user's access?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("Admin user removed.", "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13.5px] text-slate-500 max-w-lg">
          Manage who can access this dashboard and what they&apos;re allowed
          to do.
        </p>
        <Button onClick={openAdd} className="shrink-0">
          <AdminIcon name="plus" className="w-4 h-4" />
          Invite Admin
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] overflow-hidden">
        {users.length === 0 ? (
          <EmptyState icon="user-cog" title="No admin users yet" description="Invite your team to manage the dashboard." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">User</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Role</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Status</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#0D233A] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                          {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <p className="text-[13.5px] font-bold text-[#0D233A]">{u.name}</p>
                          <p className="text-[12px] text-slate-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge color={roleColor[u.role]}>{u.role}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Badge color={u.active ? "green" : "slate"}>
                        {u.active ? "Active" : "Disabled"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(u)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0066FF] inline-flex items-center justify-center transition-colors"
                        aria-label="Edit"
                      >
                        <AdminIcon name="pencil" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 inline-flex items-center justify-center transition-colors"
                        aria-label="Delete"
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
        title={editingId !== null ? "Edit Admin User" : "Invite Admin User"}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId !== null ? "Save Changes" : "Send Invite"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Full Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Email Address">
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field label="Role">
            <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
              <option value="Super Admin">Super Admin</option>
              <option value="Content Editor">Content Editor</option>
              <option value="Viewer">Viewer</option>
            </Select>
          </Field>
          <label className="flex items-center gap-2.5 text-[13.5px] font-medium text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
            />
            Account is active
          </label>
        </div>
      </Modal>
    </div>
  );
}
