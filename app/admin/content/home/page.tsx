"use client";

import React, { useState } from "react";
import AdminIcon from "../../_components/icons";
import { Button, Card, Field, Input, Textarea } from "../../_components/ui";
import { useAdminToast } from "../../_components/Toast";

interface StatItem {
  id: number;
  value: string;
  label: string;
}

export default function HomeContentPage() {
  const { showToast } = useAdminToast();

  const [hero, setHero] = useState({
    eyebrow: "JUSTICE • SUPPORT • REHABILITATION",
    headingLine1: "Legal Support",
    headingHighlight: "Muslim Brothers",
    subtitle:
      "We provide legal assistance, rights protection and rehabilitation support for Muslim prisoners and their families, with dignity and hope.",
    ctaPrimaryText: "Get Legal Help",
    ctaPrimaryLink: "/legal-help",
    ctaSecondaryText: "Our Work",
    ctaSecondaryLink: "/our-aims",
  });

  const [stats, setStats] = useState<StatItem[]>([
    { id: 1, value: "500+", label: "Families Supported" },
    { id: 2, value: "120+", label: "Legal Cases Assisted" },
    { id: 3, value: "50+", label: "Volunteers" },
    { id: 4, value: "10+", label: "Awareness Programs" },
  ]);

  const [about, setAbout] = useState({
    eyebrow: "ABOUT US",
    title: "Muslim Legal Aid Trust (India)",
    hindiTitle: "मुस्लिम कानूनी सहायता दल भारत",
    description:
      "Muslim Legal Aid Trust (India) is a non-profit organisation working towards the welfare of Muslim prisoners and their families. We provide legal assistance, create awareness, and support rehabilitation programs to protect rights, promote justice and rebuild lives with dignity and hope.",
    image: "/images/new/banner3.jpg",
  });

  const [donationBanner, setDonationBanner] = useState({
    eyebrow: "DONATION",
    title: "Make a Difference",
    description:
      "Your support helps us provide legal aid, support families, run awareness programs and work towards the rehabilitation of Muslim prisoners and needy communities.",
    ctaText: "Donate Now",
  });

  const updateStat = (id: number, key: "value" | "label", val: string) => {
    setStats((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: val } : s)));
  };

  const addStat = () => {
    setStats((prev) => [
      ...prev,
      { id: Date.now(), value: "0", label: "New Stat" },
    ]);
  };

  const removeStat = (id: number) => {
    setStats((prev) => prev.filter((s) => s.id !== id));
  };

  const saveSection = (section: string) => {
    showToast(`${section} section updated successfully.`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-blue-50/70 border border-blue-100 px-5 py-3.5 flex items-start gap-3">
        <AdminIcon name="home" className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#2B4A72]">
          Edits here update the public homepage hero, about, stats and
          donation banner. The homepage layout itself stays fixed — only the
          text, links and images shown below are editable.
        </p>
      </div>

      {/* Hero Section */}
      <Card
        title="Hero Section"
        description="The main banner visitors see first"
        action={<Button onClick={() => saveSection("Hero")}>Save Changes</Button>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Eyebrow Tagline" className="sm:col-span-2">
            <Input
              value={hero.eyebrow}
              onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
            />
          </Field>
          <Field label="Heading Line 1">
            <Input
              value={hero.headingLine1}
              onChange={(e) => setHero({ ...hero, headingLine1: e.target.value })}
            />
          </Field>
          <Field label="Highlighted Heading Text" hint="Shown in brand blue">
            <Input
              value={hero.headingHighlight}
              onChange={(e) =>
                setHero({ ...hero, headingHighlight: e.target.value })
              }
            />
          </Field>
          <Field label="Subtitle" className="sm:col-span-2">
            <Textarea
              rows={3}
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
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
        action={<Button onClick={() => saveSection("Stats")}>Save Changes</Button>}
      >
        <div className="space-y-3">
          {stats.map((stat) => (
            <div key={stat.id} className="flex items-center gap-3">
              <Input
                value={stat.value}
                onChange={(e) => updateStat(stat.id, "value", e.target.value)}
                className="w-28 font-bold"
                placeholder="500+"
              />
              <Input
                value={stat.label}
                onChange={(e) => updateStat(stat.id, "label", e.target.value)}
                placeholder="Label"
                className="flex-1"
              />
              <button
                onClick={() => removeStat(stat.id)}
                className="w-9 h-9 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 inline-flex items-center justify-center transition-colors shrink-0"
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
        action={<Button onClick={() => saveSection("About")}>Save Changes</Button>}
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
          <Field label="Title">
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
          <Field label="Description" className="sm:col-span-2">
            <Textarea
              rows={4}
              value={about.description}
              onChange={(e) => setAbout({ ...about, description: e.target.value })}
            />
          </Field>
        </div>
      </Card>

      {/* Donation Banner */}
      <Card
        title="Donation Banner"
        description="Call-to-action strip promoting donations"
        action={
          <Button onClick={() => saveSection("Donation banner")}>
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
    </div>
  );
}
