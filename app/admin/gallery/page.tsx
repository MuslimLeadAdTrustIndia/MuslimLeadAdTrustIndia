"use client";

import React, { useEffect, useRef, useState } from "react";
import AdminIcon from "../_components/icons";
import { Button, EmptyState, Field, Input, Modal, Select } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

interface GalleryImage {
  id: number;
  url: string;
  file_id?: string;
  alt_en: string;
  alt_hi?: string;
  category: string;
}

const categories = ["All", "Legal Aid", "Prisoners Welfare", "Community", "Education", "Health"];

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
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [altText, setAltText] = useState("");
  const [category, setCategory] = useState("Legal Aid");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/data/gallery_images");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch {
      showToast("Failed to fetch gallery images", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filtered =
    activeCategory === "All" ? images : images.filter((i) => i.category === activeCategory);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl("");
    setAltText("");
    setDragActive(false);
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file.", "error");
      return;
    }
    setSelectedFile(file);
    setAltText((prev) => prev || filenameToAlt(file.name));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile || !altText.trim()) {
      showToast("Please select an image and enter a description.", "error");
      return;
    }
    setUploading(true);
    try {
      // 1. Upload to ImageKit
      const fd = new FormData();
      fd.append("file", selectedFile);
      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || "ImageKit upload failed");
      }
      const { url, fileId } = await uploadRes.json();

      // 2. Save in database
      const dbRes = await fetch("/api/admin/data/gallery_images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          file_id: fileId,
          alt_en: altText.trim(),
          category,
          sort_order: 0,
        }),
      });
      if (!dbRes.ok) throw new Error("Failed to save to database");
      const created = await dbRes.json();

      setImages((prev) => [created, ...prev]);
      showToast("Image uploaded and published successfully!");
      closeModal();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img: GalleryImage) => {
    if (!window.confirm("Remove this image from the gallery?")) return;
    try {
      const res = await fetch(`/api/admin/data/gallery_images/${img.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();

      if (img.file_id) {
        fetch(`/api/admin/upload?fileId=${encodeURIComponent(img.file_id)}`, { method: "DELETE" }).catch(() => {});
      }

      setImages((prev) => prev.filter((i) => i.id !== img.id));
      showToast("Image removed.", "info");
    } catch {
      showToast("Failed to remove image", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2 overflow-x-auto flex-1 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
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

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-[14px]">Loading gallery images...</div>
      ) : filtered.length === 0 ? (
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
              <img src={img.url} alt={img.alt_en} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0D233A]/0 group-hover:bg-[#0D233A]/60 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 p-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                  {img.category}
                </span>
                <p className="text-white text-[11.5px] font-semibold text-center line-clamp-2">
                  {img.alt_en}
                </p>
                <button
                  onClick={() => handleDelete(img)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-red-500 flex items-center justify-center text-white transition-colors cursor-pointer mt-1"
                  aria-label="Delete image"
                >
                  <AdminIcon name="trash" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title="Upload to Gallery"
        description="Images will be securely hosted on ImageKit and displayed on the website"
        maxWidth="max-w-md"
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={uploading || !selectedFile}>
              {uploading ? "Uploading to ImageKit..." : "Upload Image"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
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
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? "border-[#0066FF] bg-blue-50/50"
                : "border-slate-300 hover:border-slate-400 bg-slate-50/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {previewUrl ? (
              <div className="space-y-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-40 mx-auto rounded-xl object-cover"
                />
                <p className="text-[12px] font-semibold text-[#0066FF]">Click to change photo</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto">
                  <AdminIcon name="upload" className="w-5 h-5" />
                </div>
                <p className="text-[13.5px] font-bold text-[#0D233A]">Click to select an image</p>
                <p className="text-[12px] text-slate-400">PNG, JPG, WEBP up to 8MB</p>
              </div>
            )}
          </div>

          <Field label="Category">
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories
                .filter((c) => c !== "All")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </Select>
          </Field>

          <Field label="Image Caption / Alt Text">
            <Input
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="e.g. Legal literacy camp in Panipat"
            />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
