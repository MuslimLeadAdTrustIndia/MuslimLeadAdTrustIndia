"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Comprehensive Aims & Objectives parsed directly from the Registered Trust Deed (Govt of Haryana, Reg No: 16818)
interface AimItem {
  id: number;
  clause: string;
  category: "legal" | "rights" | "education" | "health" | "welfare" | "cells";
  title: string;
  originalText: string;
  summary: string;
  iconType: string;
  highlight?: boolean;
}

const aimsList: AimItem[] = [
  {
    id: 2,
    clause: "Clause 2",
    category: "legal",
    title: "Relief for Under-trials & Sentenced Prisoners",
    summary:
      "Working for victim Muslims and other inmates confined in Indian and foreign jails—including under-trials, convicts, and those languishing even after completing their sentences.",
    originalText:
      "To work for victim Muslims and others also, who is confined in various jail of India on under trials and awarded sentenced holder and also for the prisoner those have completed their awarded sentences terms inspite of completion of sentence, they are also lying in the various jails of India also various jails of abroad.",
    iconType: "scale",
    highlight: true,
  },
  {
    id: 3,
    clause: "Clause 3",
    category: "rights",
    title: "Legal Fight Against Injustice at Every Level",
    summary:
      "Upholding constitutional remedies and legal battles at every administrative and judicial stage to benefit humanity.",
    originalText:
      "Legal fight against injustice on every stage to benefit the humanity.",
    iconType: "shield",
  },
  {
    id: 4,
    clause: "Clause 4",
    category: "legal",
    title: "Jail Inspections & Free Legal Assistance",
    summary:
      "Routine legal inspection of correctional homes and extending free legal counsel to orphans, poor, handicapped persons, widows, and senior citizens.",
    originalText:
      "To inspect the Jails and provide them free legal helps to the orphans, poor, handicapped, widows, senior citizen and requestors.",
    iconType: "building",
    highlight: true,
  },
  {
    id: 5,
    clause: "Clause 5",
    category: "legal",
    title: "Deportation & Repatriation of Foreign Prisoners",
    summary:
      "Coordinating through diplomatic channels to help foreign nationals who have completed their sentences return safely to their home countries.",
    originalText:
      "To help the foreigner prisoners, those have completed their sentences to deport them to their nation through diplomatic channel.",
    iconType: "globe",
  },
  {
    id: 6,
    clause: "Clause 6",
    category: "rights",
    title: "Campaigns Against Anti-Social Elements",
    summary:
      "Organizing civic programs and awareness campaigns against criminal elements to protect peaceful communal harmony.",
    originalText:
      "To campaign programmes against anti-social elements in the society.",
    iconType: "alert",
  },
  {
    id: 7,
    clause: "Clause 7",
    category: "legal",
    title: "Legal Aid for Indians Imprisoned Abroad",
    summary:
      "Fighting legal battles for Indian citizens facing prosecution and trials in overseas countries to bring them back home.",
    originalText:
      "Legal fight for the Indian nationals, those are facing the trial in abroad to bring back them their native country.",
    iconType: "flag",
    highlight: true,
  },
  {
    id: 8,
    clause: "Clause 8",
    category: "rights",
    title: "Campaign Against Crimes on Women",
    summary:
      "Active public advocacy, victim assistance, and preventive social movements against domestic violence and crimes targeting women.",
    originalText: "Social campaign against Woman crimes.",
    iconType: "heart",
  },
  {
    id: 9,
    clause: "Clause 9",
    category: "rights",
    title: "Anti-Trafficking & Child Protection",
    summary:
      "Eradicating human trafficking, child exploitation, and forced begging mafias through legal enforcement and shelter support.",
    originalText:
      "Human Anti-trafficking and children trafficking, Beggar Trafficking works.",
    iconType: "shield",
  },
  {
    id: 10,
    clause: "Clause 10",
    category: "health",
    title: "Anti-Drugs & Youth Rehabilitation Movement",
    summary:
      "Social interventions, de-addiction awareness, and rehabilitation campaigns to steer youth away from substance abuse.",
    originalText: "To do the social activates for Anti-Drugs.",
    iconType: "shield",
  },
  {
    id: 11,
    clause: "Clause 11",
    category: "legal",
    title: "Universal Legal Aid Facility",
    summary:
      "Ensuring that no underprivileged person is denied justice due to financial incapacity by providing accessible legal representation.",
    originalText: "To provide legal aid facility to the persons.",
    iconType: "scale",
  },
  {
    id: 12,
    clause: "Clause 12",
    category: "health",
    title: "Eradication of Hunger, Poverty & Safe Water",
    summary:
      "Combating malnutrition, providing safe drinking water, sanitation facilities, and preventive healthcare drives.",
    originalText:
      "To eradicate hunger, poverty and malnutrition, promoting preventive health care and sanitation and making available safe drinking water.",
    iconType: "heart",
    highlight: true,
  },
  {
    id: 13,
    clause: "Clause 13",
    category: "welfare",
    title: "Gender Equality, Hostels & Senior Citizen Homes",
    summary:
      "Setting up shelter homes for women and orphans, establishing old-age day-care centers, and bridging socio-economic gaps.",
    originalText:
      "To promote gender equality, empowering women, setting up homes and hostels for women and orphans; setting up old age homes, day care centres and such other facilities for senior citizens and measures for reducing inequalities faced by socially and economically backward groups.",
    iconType: "home",
  },
  {
    id: 14,
    clause: "Clause 14",
    category: "welfare",
    title: "Protection of National Heritage & Public Libraries",
    summary:
      "Restoring historical monuments, promoting traditional handicrafts, establishing reading rooms, and preserving art & culture.",
    originalText:
      "To protect national heritage, art and culture including restoration of buildings and sites of historical importance and works of art, setting up public libraries, promotion and development of traditional arts and handicrafts.",
    iconType: "building",
  },
  {
    id: 15,
    clause: "Clause 15",
    category: "welfare",
    title: "Legal Aid for Widows of War Heroes",
    summary:
      "Providing dedicated free legal assistance and pension rights support to the widows and families of brave martyrs.",
    originalText: "To legally help the widows of war heros.",
    iconType: "flag",
  },
  {
    id: 16,
    clause: "Clause 16",
    category: "legal",
    title: "Rural & Urban Legal Camps",
    summary:
      "Conducting on-ground legal aid camps in villages, backward tehsils, and urban slums for direct on-spot counseling.",
    originalText: "To arrange the legal camps in rural and urban area.",
    iconType: "scale",
  },
  {
    id: 17,
    clause: "Clause 17",
    category: "welfare",
    title: "National Relief Fund Contributions",
    summary:
      "Supporting PM’s National Relief Fund and authorized government programs for the welfare of SC/ST, OBC, minorities, and women.",
    originalText:
      "To provide contribution to the Prime Minister's National Relief Fund or any other fund set up by the Central Government for socio-economic development and relief and welfare of the Scheduled Castes, the Scheduled Tribes, other Backward Classes, minorities and women.",
    iconType: "hand",
  },
  {
    id: 18,
    clause: "Clause 18",
    category: "education",
    title: "Scholarship & Aid to Poor Law Students",
    summary:
      "Financial aid, book grants, and courtroom internship mentorship to underprivileged students pursuing a legal career.",
    originalText: "To help the poor law students.",
    iconType: "book",
    highlight: true,
  },
  {
    id: 19,
    clause: "Clause 19",
    category: "education",
    title: "Child Welfare Activities & Programs",
    summary:
      "Organizing talent workshops, nutrition support, and recreational camps for orphan and underprivileged children.",
    originalText:
      "To arrange and organize various kinds of child welfare programs/ activities.",
    iconType: "heart",
  },
  {
    id: 20,
    clause: "Clause 20",
    category: "education",
    title: "Free & Subsidized Education for Needy Students",
    summary:
      "Delivering quality educational support completely free of cost or at minimal charges without any commercial profit motive.",
    originalText:
      "To provide relief to poor students free of cost or at minimum possible charges to others, without any profit motive whatsoever.",
    iconType: "book",
  },
  {
    id: 21,
    clause: "Clause 21",
    category: "education",
    title: "Legal Literacy in Slums & Backward Areas",
    summary:
      "Educating marginalized citizens about their fundamental rights, FIR procedures, and free legal aid systems.",
    originalText:
      "To organize and promote the legal literacy programmes particularly in Urban, slums and backward rural areas.",
    iconType: "book",
  },
  {
    id: 22,
    clause: "Clause 22",
    category: "welfare",
    title: "Universal Welfare Regardless of Caste or Religion",
    summary:
      "Solemn declaration that all services of the Trust are meant for the public at large without distinction of caste, creed, or color.",
    originalText:
      "Benefits provided by the trust are for public at large without distinction of caste, colour, creed or religion and the trust shall be at liberty to expend any amounts out of corpus on these objects.",
    iconType: "globe",
  },
  {
    id: 23,
    clause: "Clause 23",
    category: "health",
    title: "Environmental Care & Disability Rehabilitation",
    summary:
      "Afforestation, pollution awareness, and specialized rehabilitation facilities for differently-abled and infirm citizens.",
    originalText:
      "To upgrade and improve the environment and to motivate the people for removal of illiteracy, awareness towards health and living environment, to provide rehabilitation services for disable, houses for the old and firm people, widow house.",
    iconType: "heart",
  },
  {
    id: 24,
    clause: "Clause 24",
    category: "health",
    title: "Free Charitable Dispensaries & Medicines",
    summary:
      "Establishing public dispensaries and making free or subsidized life-saving medicines accessible to poor patients.",
    originalText:
      "To work towards opening dispensaries and to strive for making free medicines available to poor and needy persons and also to handicap persons and also to strive for making medicines available to general public at very low cost.",
    iconType: "heart",
    highlight: true,
  },
  {
    id: 25,
    clause: "Clause 25",
    category: "legal",
    title: "Suo-Moto Representation in High Courts & Tribunals",
    summary:
      "Taking suo-moto cognizance and engaging senior advocates to fight cases for oppressed victims before Hon'ble Courts and Tribunals.",
    originalText:
      "The trust will represent the matters before the various Hon'ble Court of law, Tribunals, administration and on others department offices in personal capacity after taking suo-moto action and on the request of the victims and also represent the matter through higher the lawyer for provide the equal, chief and easy justice to the Muslims and other requestors for their welfare.",
    iconType: "scale",
    highlight: true,
  },
  {
    id: 26,
    clause: "Clause 26",
    category: "welfare",
    title: "Livelihood & Employment Assistance",
    summary:
      "Connecting unemployed youth with vocational training, ethical employment opportunities, and skill development.",
    originalText:
      "To provide the employment, services to the unemployed persons of the society natural.",
    iconType: "hand",
  },
  {
    id: 27,
    clause: "Clause 27",
    category: "welfare",
    title: "Marriage Support & Ration / Sewing Machines",
    summary:
      "Assisting impoverished families with marriage expenses of daughters, and distributing monthly dry rations and sewing machines to widows.",
    originalText:
      "To promote and aid social and national interests/Public Libraries & reading rooms, and to contribute to marriage of poor girls and distribute monthly ration, sewing machines to widows and financially weak peoples.",
    iconType: "heart",
    highlight: true,
  },
  {
    id: 29,
    clause: "Clause 29",
    category: "rights",
    title: "Strictly Non-Political & Humanitarian Principle",
    summary:
      "Total commitment to peaceful, lawful, and strictly non-political humanitarian service with zero tolerance for violence or sectarian bias.",
    originalText:
      "Trust shall not be involved in any activity which promotes violence, terrorism, fanaticism or political favoritism between the political party verses another. Trust's objective is strictly humanitarian with no political agenda of any sort whatsoever.",
    iconType: "shield",
  },
  {
    id: 33,
    clause: "Clause 33",
    category: "legal",
    title: "Free Civil, Criminal & Constitutional Aid",
    summary:
      "Full spectrum litigation assistance in trial courts, High Courts, and the Supreme Court for victims of injustice and under-trials.",
    originalText:
      "To provide free legal aid and assistance to poor, needy, oppressed, under-trial prisoners, victims of injustice, women, children and minorities in civil, criminal and constitutional matters.",
    iconType: "scale",
    highlight: true,
  },
  {
    id: 34,
    clause: "Clause 34",
    category: "education",
    title: "Street-Law & Citizen Rights Workshops",
    summary:
      "Organizing grassroots street-law clinics, seminars, and training modules to teach fundamental constitutional rights and duties.",
    originalText:
      "To promote legal awareness and education among the public by organizing camps, seminars, workshops, street-law programmes, publications and training sessions regarding fundamental rights, legal remedies and duties of citizens.",
    iconType: "book",
  },
  {
    id: 35,
    clause: "Clause 35",
    category: "legal",
    title: "Bail Assistance & Post-Release Rehabilitation",
    summary:
      "Filing timely bail applications, furnishing sureties, providing psychological counseling, and reintegrating former inmates into society.",
    originalText:
      "To assist persons lodged in jails or detention centers by arranging legal representation, counselling, bail assistance and rehabilitation support in accordance with law.",
    iconType: "scale",
    highlight: true,
  },
  {
    id: 36,
    clause: "Clause 36",
    category: "rights",
    title: "Public Interest Litigation (PIL) & Human Rights",
    summary:
      "Filing strategic PILs and conducting legal research to defend constitutional guarantees and civil liberties.",
    originalText:
      "To safeguard human rights and constitutional rights of citizens through lawful means including advocacy, research, representation and public interest litigation.",
    iconType: "scale",
  },
  {
    id: 37,
    clause: "Clause 37",
    category: "legal",
    title: "Mediation & Family Dispute Counseling",
    summary:
      "Running peaceful alternative dispute resolution (ADR) and counseling clinics for matrimonial, family, and community disputes.",
    originalText:
      "To provide counseling and mediation services for settlement of disputes, family matters, matrimonial issues and community conflicts through lawful and peaceful methods.",
    iconType: "hand",
  },
  {
    id: 38,
    clause: "Clause 38",
    category: "legal",
    title: "Permanent Legal Help Clinics in Districts",
    summary:
      "Establishing physical legal help clinics in diverse court premises and district centers for walk-in litigants.",
    originalText:
      "To establish and run legal help centers, clinics and offices at various places for providing legal guidance to the public.",
    iconType: "building",
  },
  {
    id: 39,
    clause: "Clause 39",
    category: "legal",
    title: "Synergy with DLSA, Courts & Government Bodies",
    summary:
      "Partnering with District Legal Services Authorities (DLSA), bar associations, and state commissions for judicial reforms.",
    originalText:
      "To cooperate with Legal Services Authorities, Courts, NGOs and Government bodies in promoting access to justice and legal reforms.",
    iconType: "building",
  },
  {
    id: 40,
    clause: "Clause 40",
    category: "education",
    title: "Research & Documentation on Prison Reforms",
    summary:
      "Publishing authoritative white papers, case studies, and statistics on custodial conditions, minority rights, and penal reforms.",
    originalText:
      "To conduct research, documentation and publication on social justice, minority welfare, prison reforms, women's rights and legal development.",
    iconType: "book",
  },
  {
    id: 41,
    clause: "Clause 41",
    category: "health",
    title: "Disaster Management & Emergency Relief",
    summary:
      "Emergency rescue, food rations, shelter kits, and medical aid during floods, accidents, riots, and natural calamities.",
    originalText:
      "To extend charitable assistance in cases of natural calamities, accidents or emergencies to affected persons, subject to availability of funds.",
    iconType: "alert",
  },
  {
    id: 45,
    clause: "Clause 45",
    category: "cells",
    title: "Establishment of Specialized Operational Cells",
    summary:
      "Constitution of dedicated wings: Anti-Mob Lynching Cell, Legal Cell, Cyber Crime Cell, Medical Cell, Brotherhood Cell, and Minority Education Cell.",
    originalText:
      "The trust will constitute the legal cell, Legal Clerk Cell, Legal Penals, Medical Cell, Anti beggar Cell, Anti forcibly Religious slogan cell, Anti-Mob-lynching Cell, Anti fraud/Cyber Cell, brotherhood cell, Anti Child abuse Cell, Anti Gajwahind Cell, Anti Cow slaughter Cell, promotor cell, I.T. Cell, Muslim legal Education cell for the welfare of the Muslim Society and other needy person.",
    iconType: "shield",
    highlight: true,
  },
  {
    id: 68,
    clause: "Clause 68",
    category: "rights",
    title: "Protection of Waqf, Mosques & Religious Heritage",
    summary:
      "Legally safeguarding Mosques, Dargahs, Graveyards, and historic Muslim cultural properties against encroachment and false cases.",
    originalText:
      "To legally help to the Muslim to legally protect their fundamental rights, human rights and to legally protect them from the false cases imposed by the police and other agencies and also help them to protect their religious places Khanka, gravy yards, Dargaha, Mosque (Masjid and Muslim Religious School) and other religious places in running and new cases.",
    iconType: "building",
    highlight: true,
  },
  {
    id: 74,
    clause: "Clause 74",
    category: "welfare",
    title: "Legacy of Dr. APJ Abdul Kalam & 'Nation First'",
    summary:
      "Instilling patriotism, moral integrity, scientific mindset, and unconditional loyalty towards India following Dr. Kalam's life.",
    originalText:
      "The Trust will follow the moral, social and cultural life of Dr. A.P.J. Abdul Kalam and follow the policy of Nation first and honesty towards the our beloved country India and promote this thought among Muslim youth of India.",
    iconType: "flag",
    highlight: true,
  },
  {
    id: 77,
    clause: "Clause 77",
    category: "legal",
    title: "Borstal Jails, Juveniles & Marginalized Communities",
    summary:
      "Comprehensive legal defense for minors confined in Borstal institutions, individuals with mental distress, and third-gender citizens.",
    originalText:
      "To legally help the juveniles confined in various Borstal jails of India and also provide the legal help to the unsound mind, handicapped, senior citizen, widow ladies, orphan children, abundant parents, needy and poor persons and third gender also.",
    iconType: "scale",
    highlight: true,
  },
];

// Specialized Wings under Clause 45
interface TrustWing {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const trustWings: TrustWing[] = [
  {
    title: "Anti-Mob Lynching Cell",
    desc: "Immediate on-site fact finding, emergency police FIR registration, and High Court advocacy for hate-crime victims.",
    icon: (
      <svg
        className="w-5 h-5 text-[#60A5FA]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
  },
  {
    title: "Legal & Court Penal Cell",
    desc: "Empanelled High Court and Supreme Court advocates offering pro-bono representation across states.",
    icon: (
      <svg
        className="w-5 h-5 text-[#60A5FA]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
        />
      </svg>
    ),
  },
  {
    title: "Anti-Cyber Fraud Cell",
    desc: "Assisting victims of digital extortion, illegal online harassment, and banking fraud.",
    icon: (
      <svg
        className="w-5 h-5 text-[#60A5FA]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Medical & Health Cell",
    desc: "Free medical examinations, inmate healthcare checks in prisons, and medicine distribution drives.",
    icon: (
      <svg
        className="w-5 h-5 text-[#60A5FA]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 4v16m8-8H4"
        />
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Brotherhood & Peace Cell",
    desc: "Promoting interfaith dialogue, communal solidarity, and national integration across communities.",
    icon: (
      <svg
        className="w-5 h-5 text-[#60A5FA]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Anti-Child Abuse & Beggary Cell",
    desc: "Rescuing vulnerable street children, reporting abuse, and ensuring rehabilitative education.",
    icon: (
      <svg
        className="w-5 h-5 text-[#60A5FA]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Legal Clerks & Assistance Cell",
    desc: "Streamlining certified court copies, bail bond formalities, and case tracking for impoverished families.",
    icon: (
      <svg
        className="w-5 h-5 text-[#60A5FA]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Muslim Legal Education Cell",
    desc: "Legal workshops for madrasa students, youth, and civic leaders on constitutional safeguards.",
    icon: (
      <svg
        className="w-5 h-5 text-[#60A5FA]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
    ),
  },
];

// Foundational Core Values from Clause 68
const coreValues = [
  {
    num: "01",
    title: "Universal Brotherhood",
    text: "Upholding human dignity and peaceful coexistence without prejudice.",
  },
  {
    num: "02",
    title: "Equal Justice for All",
    text: "Uncompromising fight against injustice, discrimination, and police excesses.",
  },
  {
    num: "03",
    title: "Inclusive Education",
    text: "Empowering every child with education irrespective of caste, creed, or faith.",
  },
  {
    num: "04",
    title: "Constitutional Heritage",
    text: "Protection of historic cultural sites, waqf properties, and places of worship.",
  },
];

export default function OurAimsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAim, setSelectedAim] = useState<AimItem | null>(null);

  const categories = [
    { id: "all", label: "All Aims & Objects", count: aimsList.length },
    {
      id: "legal",
      label: "Legal Aid & Prisoners",
      count: aimsList.filter((a) => a.category === "legal").length,
    },
    {
      id: "rights",
      label: "Human Rights & Protection",
      count: aimsList.filter((a) => a.category === "rights").length,
    },
    {
      id: "welfare",
      label: "Women & Senior Welfare",
      count: aimsList.filter((a) => a.category === "welfare").length,
    },
    {
      id: "education",
      label: "Education & Youth",
      count: aimsList.filter((a) => a.category === "education").length,
    },
    {
      id: "health",
      label: "Health & Relief",
      count: aimsList.filter((a) => a.category === "health").length,
    },
    {
      id: "cells",
      label: "Specialized Cells",
      count: aimsList.filter((a) => a.category === "cells").length,
    },
  ];

  const filteredAims = useMemo(() => {
    return aimsList.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.clause.toLowerCase().includes(q) ||
        item.originalText.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Hero Banner with Official Verification Badge */}
        <div className="bg-gradient-to-b from-[#0D233A] via-[#122E4D] to-[#0D233A] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="max-w-[1280px] mx-auto">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-[13px] text-slate-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#00A3FF] font-medium">Our Aims & Objects</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] text-[12px] font-semibold uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse"></span>
                  Official Trust Deed Declaration
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Aims & Objectives of the Trust
                </h1>
                <p className="font-hindi text-lg sm:text-xl text-[#F3C77D] mt-2 font-medium">
                  मुस्लिम कानूनी सहायता दल भारत — उद्देश्य एवं संकल्प
                </p>
                <p className="mt-4 text-slate-300 text-[15px] sm:text-[16px] leading-relaxed">
                  Extracted directly from the Public Charitable Trust Deed
                  registered with the Government of Haryana (Registration No.
                  16818, Joint / Sub-Registrar Panipat). These objectives guide
                  our relentless fight for justice, equality, and human dignity.
                </p>
              </div>

              {/* Trust Deed Verification Stamp Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl shrink-0 lg:w-[340px] text-[13px] text-slate-200 shadow-xl">
                <div className="flex items-center gap-2.5 text-white font-bold pb-3 border-b border-white/10">
                  <svg
                    className="w-5 h-5 text-[#00A3FF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Government Registered Deed</span>
                </div>
                <div className="mt-3.5 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deed No:</span>
                    <span className="font-semibold text-white">16818</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jurisdiction:</span>
                    <span className="text-white">Sub-Registrar Panipat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Authority:</span>
                    <span className="text-white">Govt. of Haryana</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Registered Objects:</span>
                    <span className="text-[#00A3FF] font-bold">45+ Clauses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search, Filter, and Stats Section */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-7">
          <div className="bg-white rounded-2xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-4 sm:p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              {/* Live Search Input */}
              <div className="relative w-full md:w-96">
                <svg
                  className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search clause, keyword (e.g. bail, prisoners, waqf)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    aria-label="Clear search"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Showing Count */}
              <div className="text-[13px] text-slate-500 font-medium self-end md:self-center">
                Showing{" "}
                <span className="font-bold text-[#0D233A]">
                  {filteredAims.length}
                </span>{" "}
                of {aimsList.length} Registered Clauses
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-4 border-t border-slate-100 mt-4 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? "bg-[#0D233A] text-white shadow-sm"
                      : "bg-slate-100 text-[#4A5D73] hover:bg-slate-200/70"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                      selectedCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-white text-slate-600 border border-slate-200"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 45+ Aims Cards Grid */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {filteredAims.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <p className="text-lg font-bold text-[#0D233A]">
                No matching aims found
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Try searching for different keywords or clear your filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 bg-[#0066FF] text-white text-sm font-semibold rounded-full hover:bg-[#0052CC] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAims.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${
                    item.highlight
                      ? "border-[#0066FF]/30 shadow-[0_4px_20px_rgba(0,102,255,0.06)]"
                      : "border-slate-200/90 shadow-sm hover:border-slate-300"
                  }`}
                >
                  <div className="p-6">
                    {/* Top Row: Clause badge & Category */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0D233A] text-white text-[11.5px] font-bold tracking-wider uppercase">
                        {item.clause}
                      </span>
                      <span className="text-[11.5px] font-semibold text-[#0066FF] uppercase tracking-wider">
                        {item.category === "legal"
                          ? "Legal Aid"
                          : item.category === "rights"
                          ? "Human Rights"
                          : item.category === "education"
                          ? "Education"
                          : item.category === "health"
                          ? "Healthcare"
                          : item.category === "welfare"
                          ? "Social Welfare"
                          : "Trust Cell"}
                      </span>
                    </div>

                    {/* Aim Title */}
                    <h3 className="text-[17px] font-extrabold text-[#0D233A] leading-snug">
                      {item.title}
                    </h3>

                    {/* Summary Description */}
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#4A5D73]">
                      {item.summary}
                    </p>
                  </div>

                  {/* Card Bottom with Original Text Expansion Button */}
                  <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between rounded-b-2xl">
                    <span className="text-[11px] font-medium text-slate-400">
                      Trust Deed Clause
                    </span>
                    <button
                      onClick={() => setSelectedAim(item)}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors"
                    >
                      <span>Read Full Legal Text</span>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Trust Deed Section 45: Specialized Operational Wings */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-[#0D233A] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] text-[12px] font-bold tracking-wider uppercase mb-3">
                Clause 45 of Trust Deed
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Specialized Operational Wings & Cells
              </h2>
              <p className="mt-2 text-slate-300 text-[14.5px] max-w-2xl">
                As mandated under Clause 45 of the Registered Trust Deed, the Trust has
                constituted dedicated executive units to address specific legal and
                humanitarian emergencies.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8">
                {trustWings.map((cell, idx) => (
                  <div
                    key={idx}
                    className="group bg-white/10 hover:bg-white/15 transition-all backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/35 text-[#60A5FA] flex items-center justify-center mb-3.5 group-hover:bg-[#0066FF]/30 group-hover:scale-105 transition-all">
                        {cell.icon}
                      </div>
                      <h4 className="text-[16px] font-bold text-white">
                        {cell.title}
                      </h4>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-slate-300">
                        {cell.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Foundational Beliefs & Values (Clause 68) */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#0066FF] mb-1.5">
              Clause 68 • Foundational Principles
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D233A]">
              Core Principles Guiding Every Action
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              >
                <span className="text-2xl font-extrabold text-[#0066FF]/20 block mb-2">
                  {v.num}
                </span>
                <h3 className="text-[16.5px] font-bold text-[#0D233A] mb-2">
                  {v.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#52657A]">
                  {v.text}
                </p>
              </div>
            ))}
          </div>

          {/* Real-World Case in Focus: Panipat Court Action */}
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#0D233A] via-[#163554] to-[#0D233A] p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[12px] font-bold uppercase tracking-wider mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Trust Objectives in Action • Court Precedent
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold">
                  Panipat Court Notice to Nazia Elahi Khan on Trust&apos;s Legal Petition
                </h3>
                <p className="mt-2 text-slate-300 text-[13.5px] sm:text-[14px] leading-relaxed">
                  Demonstrating its commitment under Clauses 3, 25 &amp; 68, the Trust, led by Chairman
                  Advocate Momin Malik, filed a formal petition in the Court of CJM / Civil Judge, Panipat
                  against objectionable remarks targeting Prophet Muhammad, Hazrat Aisha, and the Muslim community.
                  Taking judicial cognizance, the court issued official notice directing appearance to face trial.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/#legal-actions"
                  className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13.5px] font-bold px-5 py-2.5 rounded-full transition-all shadow-md"
                >
                  <span>View Case Details</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA for Legal Help & Support */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-[#1A56DB] to-[#0D233A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Do You or a Family Member Need Free Legal Aid?
              </h3>
              <p className="mt-2 text-[14.5px] text-blue-100 max-w-xl">
                Our advocates provide free legal assistance to under-trial prisoners,
                poor victims, and marginalized individuals across India.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/#contact"
                className="bg-white text-[#0D233A] hover:bg-slate-100 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Apply for Legal Help
              </Link>
              <Link
                href="/#donation"
                className="bg-[#00A3FF] hover:bg-[#008FE0] text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Donate to the Cause
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Modal Dialog for Reading Full Legal Clause Text */}
      {selectedAim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedAim(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-[#0D233A] text-white text-[12px] font-bold">
                {selectedAim.clause}
              </span>
              <span className="text-[12px] font-semibold text-[#0066FF] uppercase">
                Registered Deed Object
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D233A] leading-snug">
              {selectedAim.title}
            </h3>

            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Exact Legal Wording from Registered Trust Deed
              </h4>
              <p className="text-[14px] leading-relaxed text-[#1E293B] italic">
                &ldquo;{selectedAim.originalText}&rdquo;
              </p>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-blue-50/70 border border-blue-100">
              <h4 className="text-[12px] font-bold text-[#0066FF] uppercase tracking-wider mb-1.5">
                Practical Execution by the Trust
              </h4>
              <p className="text-[13.5px] leading-relaxed text-[#1E3A8A]">
                {selectedAim.summary}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedAim(null)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-700 transition-colors"
              >
                Close
              </button>
              <Link
                href="/#contact"
                className="px-5 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-semibold transition-colors"
              >
                Contact for this Cause
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
