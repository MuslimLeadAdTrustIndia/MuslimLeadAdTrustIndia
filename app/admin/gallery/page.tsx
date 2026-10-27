"use client";

import React, { useRef, useState } from "react";
import AdminIcon from "../_components/icons";
import { Button, EmptyState, Field, Input, Modal } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const categories = ["All", "Legal Aid", "Prisoners Welfare", "Community", "Education", "Health"];

const seedImages: GalleryImage[] = [
  { id: 1, src: "/images/new/p1.png", alt: "Legal aid visit and prisoner consultation", category: "Legal Aid" },
  { id: 2, src: "/images/new/p2.png", alt: "Community legal consultation meeting", category: "Community" },
  { id: 3, src: "/images/new/p3.png", alt: "Supporting prisoners awaiting justice", category: "Prisoners Welfare" },
  { id: 4, src: "/images/new/p4.png", alt: "Legal rights awareness seminar", category: "Education" },
  { id: 5, src: "/images/new/p5.png", alt: "Legal documentation and family guidance", category: "Legal Aid" },
  { id: 6, src: "/images/legal-help-card.jpg", alt: "Legal help and representation", category: "Legal Aid" },
  { id: 7, src: "/images/family-support-card.jpg", alt: "Family support program", category: "Community" },
  { id: 8, src: "/images/new/health and rehabilitation.png", alt: "Health and rehabilitation", category: "Health" },
];

const emptyForm = { src: "", alt: "", category: "Legal Aid" };

function filenameToAlt(filename: string): string {
  const withoutExt = filename.replace(/\.[^/.]+$/, "");
  return withoutExt
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminGalleryPage() {
  const { showToast } = useAdminToast();
  const [images, setImages] = useState<GalleryImage[]>(seedImages);
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered =
    activeCategory === "All" ? images : images.filter((i) => i.category === activeCategory);

  const closeModal = () => {
    setModalOpen(false);
    setForm(emptyForm);
    setDragActive(false);
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        src: reader.result as string,
        alt: prev.alt || filenameToAlt(file.name),
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!form.src.trim() || !form.alt.trim()) {
      showToast("Please select an image and add alt text.", "error");
      return;
    }
    setImages((prev) => [{ ...form, id: Date.now() }, ...prev]);
    showToast("Image added to gallery successfully.");
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Remove this image from the gallery?")) return;
    setImages((prev) => prev.filter((i) => i.id !== id));
    showToast("Image removed.", "info");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2 overflow-x-auto flex-1 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#0D233A] text-white shadow-sm"
                  : "bg-slate-100 text-[#4A5D73] hover:bg-slate-200/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <Button onClick={() => setModalOpen(true)} className="w-full sm:w-auto shrink-0">
          <AdminIcon name="upload" className="w-4 h-4" />
          Upload New Image
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80">
          <EmptyState
            icon="image"
            title="No images in this category"
            description="Upload a new image or choose a different category."
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/80 aspect-[4/3]"
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0D233A]/0 group-hover:bg-[#0D233A]/60 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <p className="text-white text-[11.5px] font-semibold px-3 text-center line-clamp-2">
                  {img.alt}
                </p>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                  aria-label="Delete image"
                >
                  <AdminIcon name="trash" className="w-4 h-4" />
                </button>
              </div>
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[10.5px] font-bold text-[#0D233A]">
                {img.category}
              </span>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Upload New Image"
        description="Select a photo from your device to publish it in the public gallery"
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!form.src}>
              <AdminIcon name="upload" className="w-4 h-4" />
              Add to Gallery
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Photo">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {form.src ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-100 group">
                <img src={form.src} alt="Selected preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-full bg-white text-[#0D233A] text-[12.5px] font-bold"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, src: "" })}
                    className="px-3.5 py-2 rounded-full bg-red-500 text-white text-[12.5px] font-bold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  handleFile(e.dataTransfer.files?.[0]);
                }}
                className={`w-full flex flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
                  dragActive
                    ? "border-[#0066FF] bg-blue-50/70"
                    : "border-slate-300 bg-slate-50 hover:border-[#0066FF]/50 hover:bg-blue-50/40"
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-[#0066FF] flex items-center justify-center">
                  <AdminIcon name="upload" className="w-5 h-5" />
                </div>
                <p className="text-[13.5px] font-bold text-[#0D233A]">
                  Click to choose a photo, or drag &amp; drop
                </p>
                <p className="text-[12px] text-slate-400">PNG, JPG or WEBP</p>
              </button>
            )}
          </Field>
          <Field label="Alt Text / Caption">
            <Input
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              placeholder="Describe the photo"
            />
          </Field>
          <Field label="Category">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13.5px] text-[#0D233A] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
            >
              {categories.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Modal>
    </div>
  );
}
