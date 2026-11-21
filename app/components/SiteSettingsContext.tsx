"use client";

import React, { createContext, useContext } from "react";

export type SiteGeneralSettings = {
  orgName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  officeHours: string;
};

export type SiteSocialSettings = {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube?: string;
};

export interface SiteSettingsValue {
  general: SiteGeneralSettings;
  social: SiteSocialSettings;
}

export const DEFAULT_SITE_GENERAL: SiteGeneralSettings = {
  orgName: "Muslim Legal Aid Trust (India)",
  tagline: "Justice • Support • Rehabilitation",
  email: "muslimlegalaidtrustindia80@gmail.com",
  phone: "+91 80593 11777",
  address:
    "Chamber No. 177, 1st Floor, Lawyers Chambers, Distt. Court, Panipat - 132103, Haryana, India",
  officeHours: "Mon - Sat: 10:00 AM - 6:00 PM, Sunday: Closed",
};

export const DEFAULT_SITE_SOCIAL: SiteSocialSettings = {
  facebook: "https://www.facebook.com/share/1HprBS1mQN/",
  instagram:
    "https://www.instagram.com/muslimlegalaidtrustindia?cplk=MXBoNGJ6Zmk3MHV3OA==",
  twitter: "",
  linkedin: "",
  youtube: "https://youtube.com/@muslimlegalaidtrustindia?si=gX6Sqkiu2Pm6krZl",
};

const SiteSettingsContext = createContext<SiteSettingsValue>({
  general: DEFAULT_SITE_GENERAL,
  social: DEFAULT_SITE_SOCIAL,
});

export function SiteSettingsProvider({
  general,
  social,
  children,
}: SiteSettingsValue & { children: React.ReactNode }) {
  return (
    <SiteSettingsContext.Provider value={{ general, social }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
