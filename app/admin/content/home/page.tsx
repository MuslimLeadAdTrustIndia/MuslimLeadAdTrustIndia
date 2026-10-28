"use client";

import React, { useEffect, useState } from "react";
import AdminIcon from "../../_components/icons";
import { Button, Card, Field, Input, Textarea } from "../../_components/ui";
import { useAdminToast } from "../../_components/Toast";

interface StatItem {
  id: number;
  value: string;
  label_en: string;
  label_hi?: string;
  sort_order?: number;
}

export default function HomeContentPage() {
  const { showToast } = useAdminToast();
  const [loading, setLoading] = useState(true);

  const [hero, setHero] = useState({
    eyebrow: "JUSTICE • SUPPORT • REHABILITATION",
    eyebrow_hi: "न्याय • समर्थन • पुनर्वास",
    headingLine1: "Legal Support",
    headingLine1_hi: "कानूनी सहायता",
    headingHighlight: "Muslim Brothers",
    headingHighlight_hi: "मुस्लिम भाइयों के लिए",
    subtitle:
      "We provide legal assistance, rights protection and rehabilitation support for Muslim prisoners and their families, with dignity and hope.",
    subtitle_hi:
      "हम मुस्लिम कैदियों और उनके परिवारों के लिए सम्मान और आशा के साथ कानूनी सहायता, अधिकार संरक्षण और पुनर्वास सहायता प्रदान करते हैं।",
    ctaPrimaryText: "Get Legal Help",
    ctaPrimaryLink: "/legal-help",
    ctaSecondaryText: "Our Work",
    ctaSecondaryLink: "/our-aims",
  });

  const [stats, setStats] = useState<StatItem[]>([]);

  const [about, setAbout] = useState({
    eyebrow: "ABOUT US",
    title: "Muslim Legal Aid Trust (India)",
    hindiTitle: "मुस्लिम कानूनी सहायता दल भारत",
    description:
      "Muslim Legal Aid Trust is registered under the Indian Trust Act, 1882, working relentlessly to protect human rights, represent under-trial prisoners, support destitute families, and counter injustices through the power of law.",
    description_hi:
      "मुस्लिम लीगल एड ट्रस्ट भारतीय ट्रस्ट अधिनियम, 1882 के तहत पंजीकृत है, जो मानवाधिकारों की रक्षा, विचाराधीन कैदियों के प्रतिनिधित्व और कानून की शक्ति के माध्यम से अन्याय के खिलाफ काम करता है।",
    image: "/images/about-us.jpg",
  });

  const [donationBanner, setDonationBanner] = useState({
    eyebrow: "DONATION",
    title: "Make a Difference",
    description:
      "Your support helps us provide legal aid, support families, run awareness programs and work towards the rehabilitation of Muslim prisoners and needy communities.",
    ctaText: "Donate Now",
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/content/home_hero").then((r) => r.ok && r.json()),
      fetch("/api/admin/data/home_stats").then((r) => r.ok && r.json()),
      fetch("/api/admin/content/home_about").then((r) => r.ok && r.json()),
      fetch("/api/admin/content/home_donation_banner").then((r) => r.ok && r.json()),
    ])
      .then(([heroData, statsData, aboutData, donationData]) => {
        if (heroData && Object.keys(heroData).length) setHero((prev) => ({ ...prev, ...heroData }));
        if (Array.isArray(statsData)) setStats(statsData);
        if (aboutData && Object.keys(aboutData).length) setAbout((prev) => ({ ...prev, ...aboutData }));
        if (donationData && Object.keys(donationData).length) setDonationBanner((prev) => ({ ...prev, ...donationData }));
      })
      .finally(() => setLoading(false));
  }, []);

  const saveContent = async (key: string, val: unknown, name: string) => {
    try {
      const res = await fetch(`/api/admin/content/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(val),
      });
      if (!res.ok) throw new Error();
      showToast(`${name} section updated successfully.`);
    } catch {
      showToast(`Failed to update ${name}`, "error");
    }
  };

  const updateStat = (id: number, key: "value" | "label_en" | "label_hi", val: string) => {
    setStats((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: val } : s)));
  };

  const addStat = async () => {
    try {
      const res = await fetch("/api/admin/data/home_stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: "0+", label_en: "New Stat", label_hi: "", sort_order: stats.length + 1 }),
      });
      if (res.ok) {
        const item = await res.json();
        setStats((prev) => [...prev, item]);
        showToast("New stat added.");
      }
    } catch {
      showToast("Failed to add stat", "error");
    }
  };

  const removeStat = async (id: number) => {
    try {
      await fetch(`/api/admin/data/home_stats/${id}`, { method: "DELETE" });
      setStats((prev) => prev.filter((s) => s.id !== id));
      showToast("Stat removed.");
    } catch {
      showToast("Failed to remove stat", "error");
    }
  };

  const saveStats = async () => {
    try {
      await Promise.all(
        stats.map((s) =>
          fetch(`/api/admin/data/home_stats/${s.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value: s.value, label_en: s.label_en, label_hi: s.label_hi || "" }),
          })
        )
      );
      showToast("Stats updated successfully.");
    } catch {
      showToast("Failed to update stats", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-blue-50/70 border border-blue-100 px-5 py-3.5 flex items-start gap-3">
        <AdminIcon name="home" className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#2B4A72]">
          Edits here update the public homepage hero, about, stats and
          donation banner in real time. Values are securely loaded from and saved to the database.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-[14px]">Loading homepage content...</div>
      ) : (
        <>
          {/* Hero Section */}
          <Card
            title="Hero Section"
            description="The main banner visitors see first"
            action={<Button onClick={() => saveContent("home_hero", hero, "Hero")}>Save Changes</Button>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="English Eyebrow Tagline">
                <Input
                  value={hero.eyebrow}
                  onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
                />
              </Field>
              <Field label="Hindi Eyebrow Tagline">
                <Input
                  value={hero.eyebrow_hi || ""}
                  onChange={(e) => setHero({ ...hero, eyebrow_hi: e.target.value })}
                />
              </Field>

              <Field label="Heading Line 1 (English)">
                <Input
                  value={hero.headingLine1}
                  onChange={(e) => setHero({ ...hero, headingLine1: e.target.value })}
                />
              </Field>
              <Field label="Heading Line 1 (Hindi)">
                <Input
                  value={hero.headingLine1_hi || ""}
                  onChange={(e) => setHero({ ...hero, headingLine1_hi: e.target.value })}
                />
              </Field>

              <Field label="Highlighted Heading Text (English)" hint="Shown in brand blue">
                <Input
                  value={hero.headingHighlight}
                  onChange={(e) =>
                    setHero({ ...hero, headingHighlight: e.target.value })
                  }
                />
              </Field>
              <Field label="Highlighted Heading Text (Hindi)">
                <Input
                  value={hero.headingHighlight_hi || ""}
                  onChange={(e) =>
                    setHero({ ...hero, headingHighlight_hi: e.target.value })
                  }
                />
              </Field>

              <Field label="English Subtitle" className="sm:col-span-2">
                <Textarea
                  rows={2}
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                />
              </Field>
              <Field label="Hindi Subtitle" className="sm:col-span-2">
                <Textarea
                  rows={2}
                  value={hero.subtitle_hi || ""}
                  onChange={(e) => setHero({ ...hero, subtitle_hi: e.target.value })}
                />
              </Field>

              <Field label="Primary Button Text">
                <Input
                  value={hero.ctaPrimaryText}
                  onChange={(e) =>
                    setHero({ ...hero, ctaPrimaryText: e.target.value })
                  }
                />
              </Field>
              <Field label="Primary Button Link">
                <Input
                  value={hero.ctaPrimaryLink}
                  onChange={(e) =>
                    setHero({ ...hero, ctaPrimaryLink: e.target.value })
                  }
                />
              </Field>
              <Field label="Secondary Button Text">
                <Input
                  value={hero.ctaSecondaryText}
                  onChange={(e) =>
                    setHero({ ...hero, ctaSecondaryText: e.target.value })
                  }
                />
              </Field>
              <Field label="Secondary Button Link">
                <Input
                  value={hero.ctaSecondaryLink}
                  onChange={(e) =>
                    setHero({ ...hero, ctaSecondaryLink: e.target.value })
                  }
                />
              </Field>
            </div>
          </Card>

          {/* Stats Bar */}
          <Card
            title="Floating Stats Bar"
            description="Quick impact numbers shown below the hero"
            action={<Button onClick={saveStats}>Save Changes</Button>}
          >
            <div className="space-y-3">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col sm:flex-row items-center gap-2">
                  <Input
                    value={stat.value}
                    onChange={(e) => updateStat(stat.id, "value", e.target.value)}
                    className="w-full sm:w-28 font-bold"
                    placeholder="500+"
                  />
                  <Input
                    value={stat.label_en}
                    onChange={(e) => updateStat(stat.id, "label_en", e.target.value)}
                    placeholder="English Label"
                    className="w-full sm:flex-1"
                  />
                  <Input
                    value={stat.label_hi || ""}
                    onChange={(e) => updateStat(stat.id, "label_hi", e.target.value)}
                    placeholder="Hindi Label (वैकल्पिक)"
                    className="w-full sm:flex-1"
                  />
                  <button
                    onClick={() => removeStat(stat.id)}
                    className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    aria-label="Remove stat"
                  >
                    <AdminIcon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="mt-4" onClick={addStat}>
              <AdminIcon name="plus" className="w-4 h-4" />
              Add Stat
            </Button>
          </Card>

          {/* About Section */}
          <Card
            title="About Section"
            description="Introductory block about the Trust"
            action={<Button onClick={() => saveContent("home_about", about, "About")}>Save Changes</Button>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Eyebrow Tagline">
                <Input
                  value={about.eyebrow}
                  onChange={(e) => setAbout({ ...about, eyebrow: e.target.value })}
                />
              </Field>
              <Field label="Image URL">
                <Input
                  value={about.image}
                  onChange={(e) => setAbout({ ...about, image: e.target.value })}
                />
              </Field>
              <Field label="English Title">
                <Input
                  value={about.title}
                  onChange={(e) => setAbout({ ...about, title: e.target.value })}
                />
              </Field>
              <Field label="Hindi Title">
                <Input
                  value={about.hindiTitle}
                  onChange={(e) => setAbout({ ...about, hindiTitle: e.target.value })}
                />
              </Field>
              <Field label="English Description" className="sm:col-span-2">
                <Textarea
                  rows={3}
                  value={about.description}
                  onChange={(e) => setAbout({ ...about, description: e.target.value })}
                />
              </Field>
              <Field label="Hindi Description" className="sm:col-span-2">
                <Textarea
                  rows={3}
                  value={about.description_hi || ""}
                  onChange={(e) => setAbout({ ...about, description_hi: e.target.value })}
                />
              </Field>
            </div>
          </Card>

          {/* Donation Banner */}
          <Card
            title="Donation Banner"
            description="Call-to-action strip promoting donations"
            action={
              <Button onClick={() => saveContent("home_donation_banner", donationBanner, "Donation banner")}>
                Save Changes
              </Button>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Eyebrow Tagline">
                <Input
                  value={donationBanner.eyebrow}
                  onChange={(e) =>
                    setDonationBanner({ ...donationBanner, eyebrow: e.target.value })
                  }
                />
              </Field>
              <Field label="Button Text">
                <Input
                  value={donationBanner.ctaText}
                  onChange={(e) =>
                    setDonationBanner({ ...donationBanner, ctaText: e.target.value })
                  }
                />
              </Field>
              <Field label="Title" className="sm:col-span-2">
                <Input
                  value={donationBanner.title}
                  onChange={(e) =>
                    setDonationBanner({ ...donationBanner, title: e.target.value })
                  }
                />
              </Field>
              <Field label="Description" className="sm:col-span-2">
                <Textarea
                  rows={3}
                  value={donationBanner.description}
                  onChange={(e) =>
                    setDonationBanner({
                      ...donationBanner,
                      description: e.target.value,
                    })
                  }
                />
              </Field>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
