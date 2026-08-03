# Studio Vanadium Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Studio Vanadium clone from scratch to match the visual reference exactly — massive light hero text, local fonts, real images, black CTA, clean minimal aesthetic.

**Architecture:** Next.js 16 App Router with Tailwind CSS 4. Single-page site with 9 sections (Navigation, Hero, Clients, Services, SelectedWorks, Process, Team, Contact, Footer). All fonts served locally from `public/fonts/`. All images from downloaded assets in `public/images/`. Static export via `output: "export"`.

**Tech Stack:** Next.js 16.2.12, React 19.2.4, Tailwind CSS 4, TypeScript 5

## Global Constraints
- Background: `#ffffff`, Text: `#131313`, Accent: `#6350c0`, Gray: `#7d7d7d`
- Font family: "Neue Haas Grotesk Display Pro" (local woff2 files)
- Hero: weight 300, `clamp(60px, 12vw, 180px)`, single line, solid black
- Nav: fixed, white bg, "SV" bold logo, black pill CTA `#131313`
- output: "export" for static site
- No placeholder images — use real downloaded assets
- "Powered by Quantum Hive" in footer

---

## File Structure

```
studio-vanadium/
├── public/
│   ├── fonts/           (5 woff2 files)
│   └── images/          (44 image files from assets)
├── src/
│   ├── app/
│   │   ├── layout.tsx   (metadata, font import)
│   │   ├── page.tsx     (section composition)
│   │   └── globals.css  (theme, font-face, animations)
│   └── components/
│       ├── Navigation.tsx
│       ├── Hero.tsx
│       ├── Clients.tsx
│       ├── Services.tsx
│       ├── SelectedWorks.tsx
│       ├── Process.tsx
│       ├── Team.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

### Task 1: Clean project and copy assets

**Files:**
- Delete: `src/`, `public/`, `.next/`, `out/`, `node_modules/` (keep config files)
- Create: `public/fonts/`, `public/images/`

**Steps:**

- [ ] **Step 1: Remove old source files**

```powershell
Remove-Item -Recurse -Force "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\src"
Remove-Item -Recurse -Force "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\public"
Remove-Item -Recurse -Force "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\.next"
Remove-Item -Recurse -Force "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\out"
```

- [ ] **Step 2: Create directories**

```powershell
New-Item -ItemType Directory -Path "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\public\fonts" -Force
New-Item -ItemType Directory -Path "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\public\images" -Force
New-Item -ItemType Directory -Path "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\src\app" -Force
New-Item -ItemType Directory -Path "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\src\components" -Force
```

- [ ] **Step 3: Copy font files**

```powershell
$assetDir = "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\work\outputs\studio-vanadium-clone\assets"
$fontDir = "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\public\fonts"
Copy-Item "$assetDir\font_vQyevYAyHtARFwPqUzQGpnDs.woff2" "$fontDir\neue-haas-300.woff2"
Copy-Item "$assetDir\font_7v88vbNPUPh3PX8XhEqCZvmuic.woff2" "$fontDir\neue-haas-400.woff2"
Copy-Item "$assetDir\font_tmLwqa5rh55YXw6gAs9GB7y6CY.woff2" "$fontDir\neue-haas-500.woff2"
Copy-Item "$assetDir\font_ml8WBou3qLRVFQzTmsYLrcQlG3s.woff2" "$fontDir\neue-haas-600.woff2"
Copy-Item "$assetDir\font_GOW5fAs7vHkKuMlMQBmQpkLcM.woff2" "$fontDir\neue-haas-700.woff2"
```

- [ ] **Step 4: Copy image files**

```powershell
$assetDir = "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\work\outputs\studio-vanadium-clone\assets"
$imgDir = "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium\public\images"
Get-ChildItem "$assetDir\img_*" | ForEach-Object { Copy-Item $_.FullName "$imgDir\$($_.Name)" }
Get-ChildItem "$assetDir\*.mp4" | ForEach-Object { Copy-Item $_.FullName "$imgDir\$($_.Name)" }
```

- [ ] **Step 5: Install dependencies**

```powershell
cd "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium"; npm install
```

---

### Task 2: Write globals.css with local fonts

**Files:**
- Create: `src/app/globals.css`

**Steps:**

- [ ] **Step 1: Create globals.css**

```css
@import "tailwindcss";

@theme {
  --color-violet-primary: #6350c0;
  --color-violet-light: #b4a7fa;
  --color-white: #ffffff;
  --color-black: #131313;
  --color-gray-100: #e9e9e9;
  --color-gray-200: #c5c5c5;
  --color-gray-300: #a1a1a1;
  --color-gray-400: #7d7d7d;
  --color-gray-500: #595959;
  --color-gray-600: #353535;
  --color-gray-700: #1e1e1e;
  --color-gray-800: #171717;
}

@font-face {
  font-family: "Neue Haas Grotesk Display Pro";
  src: url("/fonts/neue-haas-300.woff2");
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: "Neue Haas Grotesk Display Pro";
  src: url("/fonts/neue-haas-400.woff2");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Neue Haas Grotesk Display Pro";
  src: url("/fonts/neue-haas-500.woff2");
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "Neue Haas Grotesk Display Pro";
  src: url("/fonts/neue-haas-600.woff2");
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: "Neue Haas Grotesk Display Pro";
  src: url("/fonts/neue-haas-700.woff2");
  font-weight: 700;
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  background: #ffffff;
  color: #131313;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scroll animations */
.fade-in-up {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

.slide-in-left {
  opacity: 0;
  transform: translateX(-150px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-in-left.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Marquee */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-track {
  animation: marquee 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

/* Nav link underline */
.nav-link {
  position: relative;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #131313;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover::after {
  width: 100%;
}

/* Work card hover */
.work-card {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.work-card:hover {
  transform: scale(1.02);
}

.work-card img {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.work-card:hover img {
  transform: scale(1.08);
}

/* Service card */
.service-card {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-card:hover {
  transform: translateY(-4px);
}

/* Team card */
.team-card {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.team-card:hover {
  transform: translateY(-4px);
}

/* Stagger children */
.stagger-children > * {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-children.visible > *:nth-child(1) { transition-delay: 0ms; opacity: 1; transform: translateY(0); }
.stagger-children.visible > *:nth-child(2) { transition-delay: 100ms; opacity: 1; transform: translateY(0); }
.stagger-children.visible > *:nth-child(3) { transition-delay: 200ms; opacity: 1; transform: translateY(0); }
.stagger-children.visible > *:nth-child(4) { transition-delay: 300ms; opacity: 1; transform: translateY(0); }
.stagger-children.visible > *:nth-child(5) { transition-delay: 400ms; opacity: 1; transform: translateY(0); }
.stagger-children.visible > *:nth-child(6) { transition-delay: 500ms; opacity: 1; transform: translateY(0); }
.stagger-children.visible > *:nth-child(7) { transition-delay: 600ms; opacity: 1; transform: translateY(0); }
.stagger-children.visible > *:nth-child(8) { transition-delay: 700ms; opacity: 1; transform: translateY(0); }
```

---

### Task 3: Write layout.tsx and page.tsx

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

**Steps:**

- [ ] **Step 1: Create layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Vanadium",
  description: "Studio Vanadium is a Surabaya based design studio specializing in branding and graphic design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Create page.tsx**

```tsx
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import SelectedWorks from "@/components/SelectedWorks";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navigation />
      <Hero />
      <Clients />
      <Services />
      <SelectedWorks />
      <Process />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
```

---

### Task 4: Write Navigation component

**Files:**
- Create: `src/components/Navigation.tsx`

**Key changes from old version:**
- Logo: "SV" in bold (weight 700), not "Studio — Vanadium" text
- CTA button: black `#131313` background, white text, border-radius 100px
- Nav links: weight 400, size 13px, gray-400 color

**Steps:**

- [ ] **Step 1: Create Navigation.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Works", href: "#works" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
        <a href="#home" className="text-[18px] font-bold tracking-tight">
          SV
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-[13px] text-gray-400 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-[#131313] text-white px-6 py-3 rounded-full text-[13px] font-medium hover:bg-black transition-colors"
        >
          Let&apos;s Collaborate
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <button className="md:hidden flex flex-col gap-1.5 w-6">
          <span className="block h-[1.5px] bg-black w-full" />
          <span className="block h-[1.5px] bg-black w-full" />
        </button>
      </div>
    </nav>
  );
}
```

---

### Task 5: Write Hero component

**Files:**
- Create: `src/components/Hero.tsx`

**Key changes from old version:**
- Font size: `clamp(60px, 12vw, 180px)` (massive)
- Font weight: 300 (light)
- Single line: "Studio — Vanadium" (no line break)
- Solid black text (no gradient)
- Below info: GPS coords left, clock center, date right
- Uses weight 300 font from local assets

**Steps:**

- [ ] **Step 1: Create Hero.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const dateStr = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setTime(`Surabaya, ${timeStr}`);
      setDate(dateStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-end px-6 md:px-12 pb-12 relative"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <h1
          className="font-light leading-[0.9] tracking-tight text-[#131313] mb-8"
          style={{ fontSize: "clamp(60px, 12vw, 180px)" }}
        >
          Studio — Vanadium
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px] text-gray-400 font-normal">
          <span>7° 18&apos; 38.664&apos;&apos; S 112° 45&apos; 32.1084&apos;&apos; E</span>
          <span>{mounted ? time : "Surabaya, --:--:-- --"}</span>
          <span>{mounted ? date : ""}</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-gray-300" />
      </div>
    </section>
  );
}
```

---

### Task 6: Write Clients component

**Files:**
- Create: `src/components/Clients.tsx`

**Steps:**

- [ ] **Step 1: Create Clients.tsx**

```tsx
"use client";

export default function Clients() {
  const clients = [
    "MCI", "HUSSEL", "YELLOW CLINIC", "PLN", "&KINN",
    "RIMBAWAN", "TRIPATRA", "ITS", "FREAKY JUNK", "OUTLOOK PAREKRAF",
    "MANDALIKA", "GAPURA", "JOTUN", "KONSILI", "UNAIR",
  ];

  return (
    <section className="py-16 overflow-hidden border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
          Trusted By
        </p>
      </div>

      <div className="relative">
        <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={i}
              className="text-[clamp(14px,2vw,18px)] font-medium text-gray-300 tracking-wide uppercase"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 7: Write Services component

**Files:**
- Create: `src/components/Services.tsx`

**Key changes:** Services displayed as numbered rows [01]-[06] with slide-in-left animation.

**Steps:**

- [ ] **Step 1: Create Services.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    number: "01",
    title: "Brand Identity Design",
    items: [
      "Brand Strategy + Positioning",
      "Brand Naming + Story",
      "Brand Activation",
      "Logotype & Logomarks",
    ],
    details: ["Verbal Identity", "Visual Identity System"],
  },
  {
    number: "02",
    title: "Creative Communication Design",
    items: [
      "Company Branding",
      "Copywriting",
      "Media Relations",
      "Leader Branding",
    ],
    details: ["Social Media Management", "Public Relations Handling"],
  },
  {
    number: "03",
    title: "Graphic Design",
    items: [
      "Collaterals Design",
      "Editorial Design",
      "Graphic Elements",
      "Pattern/Icon Design",
    ],
    details: [
      "Mascot Design",
      "Packaging Design",
      "Data Visualization/Infographics",
      "Illustrations",
      "Digital Imaging",
    ],
  },
  {
    number: "04",
    title: "Environmental Graphic Design",
    items: [
      "Wayfinding Systems",
      "Signage Design",
      "Graphic Environments",
      "Exhibitions Design",
      "Booth Design",
    ],
    details: [],
  },
  {
    number: "05",
    title: "UI/UX Design",
    items: [
      "User Research & Strategy",
      "Wireframing & Prototyping",
      "Visual Design",
      "Usability Testing",
    ],
    details: ["Design System", "Responsive Design"],
  },
  {
    number: "06",
    title: "Multimedia",
    items: [
      "Motion Graphics",
      "Video Production",
      "Animation",
      "Interactive Media",
    ],
    details: ["3D Visualization", "AR/VR Experiences"],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = containerRef.current?.querySelectorAll(".slide-in-left");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            What We Do
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
            Our Services
          </h2>
        </div>

        <div ref={containerRef} className="space-y-0">
          {services.map((service, index) => (
            <div
              key={index}
              className="slide-in-left border-t border-gray-100 py-8 md:py-12"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
                <div className="md:col-span-1">
                  <span className="text-[13px] text-gray-400 font-medium">
                    [{service.number}]
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-[clamp(24px,3vw,36px)] font-medium leading-[1.1]">
                    {service.title}
                  </h3>
                </div>

                <div className="md:col-span-3">
                  <p className="text-[14px] leading-[1.8] text-gray-500">
                    {service.items.join("\n")}
                  </p>
                </div>

                <div className="md:col-span-4">
                  {service.details.length > 0 && (
                    <p className="text-[14px] leading-[1.8] text-gray-400">
                      {service.details.join("\n")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-100" />
        </div>
      </div>
    </section>
  );
}
```

---

### Task 8: Write SelectedWorks component

**Files:**
- Create: `src/components/SelectedWorks.tsx`

**Key changes:** White background (not dark), real downloaded images from `/images/`, proper grid layout.

**Steps:**

- [ ] **Step 1: Create SelectedWorks.tsx**

Map the portfolio items to actual downloaded images. Use images like `img_hTM8Ua60kel4i0FV0qnx.jpg`, `img_KVCl5aOJ6v1SGqIYUqzI.jpg`, and other portfolio-relevant images from the assets folder.

```tsx
"use client";

import { useEffect, useRef } from "react";

const works = [
  { title: "MCI", category: "Brand Identity", year: "2024", image: "/images/img_hTM8Ua60kel4i0FV0qnx.jpg" },
  { title: "Hussel", category: "Visual Identity", year: "2024", image: "/images/img_KVCl5aOJ6v1SGqIYUqzI.jpg" },
  { title: "Yellow Clinic", category: "Brand Strategy", year: "2024", image: "/images/img_3cSHbtwfT4o2qmhnGofp.png" },
  { title: "Outlook Parekraf", category: "Editorial Design", year: "2024", image: "/images/img_42fB29ZQNHAWNZIQhfiY.png" },
  { title: "PLN", category: "Environmental Graphic", year: "2024", image: "/images/img_4XZa6cu9C0va0alY04Mn.png" },
  { title: "&Kinn", category: "Packaging Design", year: "2024", image: "/images/img_8zff8AuZRPV3H0YQAE2O.png" },
  { title: "Rimbawan", category: "Brand Identity", year: "2024", image: "/images/img_9pO3UOjw2woNCiBfLu9I.png" },
  { title: "Tripatra", category: "Corporate Identity", year: "2024", image: "/images/img_abP4uDEcRoN0kCxMD0H7.png" },
  { title: "ITS", category: "Visual Identity", year: "2024", image: "/images/img_APNF5EWxGvkUN6VrH5S4.png" },
  { title: "Freaky Junk", category: "Brand Activation", year: "2024", image: "/images/img_BOgB7bdtc7hpItafSrvD.png" },
];

export default function SelectedWorks() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = gridRef.current?.querySelectorAll(".work-card");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="works" className="py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            Portfolio
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
            Selected Works
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {works.map((work, index) => (
            <div
              key={index}
              className="work-card group cursor-pointer opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-[11px] uppercase tracking-[0.15em] mb-1">
                      {work.category}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-[clamp(18px,2vw,24px)] font-medium">
                  {work.title}
                </h3>
                <span className="text-gray-400 text-[13px]">
                  {work.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: Write Process component

**Files:**
- Create: `src/components/Process.tsx`

**Steps:**

- [ ] **Step 1: Create Process.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Absorb",
    description: "We immerse ourselves in your brand world — understanding your vision, audience, and the landscape you operate in.",
  },
  {
    number: "02",
    title: "Encode",
    description: "We distill insights into strategic frameworks, defining the visual language and narrative that will drive your brand forward.",
  },
  {
    number: "03",
    title: "Generate",
    description: "We bring ideas to life through design — crafting identities, systems, and experiences that resonate and endure.",
  },
  {
    number: "04",
    title: "Apply",
    description: "We implement across every touchpoint — ensuring consistency and impact from digital to physical environments.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = containerRef.current?.querySelectorAll(".fade-in-up");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            Our Approach
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
            The Process
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="fade-in-up"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-[80px] font-bold leading-none bg-gradient-to-br from-[#6350c0] to-[#b4a7fa] bg-clip-text text-transparent mb-6">
                {step.number}
              </div>
              <h3 className="text-[clamp(24px,3vw,32px)] font-bold mb-4">
                {step.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 10: Write Team component

**Files:**
- Create: `src/components/Team.tsx`

**Key changes:** Dark background `#131313`, real team photos from downloaded images, 8 members.

**Steps:**

- [ ] **Step 1: Create Team.tsx**

Use actual team/person images from the assets. The assets include various portrait-style images.

```tsx
"use client";

import { useEffect, useRef } from "react";

const team = [
  { name: "Ahmad Fauzi", role: "Founder & Creative Director", image: "/images/img_CqWfc6odKDKl00O9x8GJ.png" },
  { name: "Dian Permata", role: "Art Director", image: "/images/img_cxWodNk8NATVleyLRxes.png" },
  { name: "Rizky Pratama", role: "Senior Designer", image: "/images/img_dHpKsis5uPWRhXtRmis7.png" },
  { name: "Maya Sari", role: "Brand Strategist", image: "/images/img_dJkt1R26KNxsXVEcbDXg.png" },
  { name: "Budi Santoso", role: "UI/UX Designer", image: "/images/img_dp9o3RY5mZO5a0KdNWz7.png" },
  { name: "Putri Wulandari", role: "Graphic Designer", image: "/images/img_drjRg84rpjxCErCSUTBi.png" },
  { name: "Farhan Hidayat", role: "Motion Designer", image: "/images/img_gctsSrLVNfCFJLuLzhOn.png" },
  { name: "Ayu Lestari", role: "Project Manager", image: "/images/img_GeLmXL1oh8faw3AWNQJa.png" },
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = containerRef.current?.querySelectorAll(".team-card");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#131313]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            The People
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight text-white">
            Our Team
          </h2>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {team.map((member, index) => (
            <div
              key={index}
              className="team-card opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] rounded-xl bg-gray-700 mb-4 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-white text-[15px] font-medium mb-1">
                {member.name}
              </h3>
              <p className="text-gray-500 text-[12px]">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 11: Write Contact component

**Files:**
- Create: `src/components/Contact.tsx`

**Steps:**

- [ ] **Step 1: Create Contact.tsx**

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = containerRef.current?.querySelectorAll(".fade-in-up");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            Get in Touch
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
            Contact
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6 fade-in-up">
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.7] text-gray-500 mb-12">
              Have a project in mind? We&apos;d love to hear about it. Let&apos;s create something extraordinary together.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-2">Address</p>
                <p className="text-[15px] text-gray-600">
                  Jl. Raya Darmo No. 50<br />
                  Surabaya, Jawa Timur 60241<br />
                  Indonesia
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-2">Email</p>
                <a href="mailto:hello@studiovanadium.com" className="text-[15px] text-gray-600 hover:text-[#6350c0] transition-colors">
                  hello@studiovanadium.com
                </a>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-2">Phone</p>
                <a href="tel:+62311234567" className="text-[15px] text-gray-600 hover:text-[#6350c0] transition-colors">
                  +62 31 1234 567
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 fade-in-up" style={{ transitionDelay: "200ms" }}>
            <div className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-2">Social</p>
                <div className="flex flex-col gap-3">
                  {["Instagram", "Behance", "Dribbble", "LinkedIn"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-[15px] text-gray-600 hover:text-[#6350c0] transition-colors w-fit"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 12: Write Footer component

**Files:**
- Create: `src/components/Footer.tsx`

**Steps:**

- [ ] **Step 1: Create Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-gray-400">
          &copy; 2024 Studio Vanadium. All rights reserved.
        </p>
        <p className="text-[12px] text-gray-300">
          Powered by Quantum Hive
        </p>
      </div>
    </footer>
  );
}
```

---

### Task 13: Build and verify

**Files:**
- Verify: `out/` directory contains static HTML

**Steps:**

- [ ] **Step 1: Build the project**

```powershell
cd "C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\studio-vanadium"; npm run build
```

Expected: Build completes successfully, `out/` directory generated.

- [ ] **Step 2: Verify output**

Check that `out/index.html` exists and contains the rendered sections.

- [ ] **Step 3: Test locally (optional)**

```powershell
npx serve out
```

Open browser to verify visual match with reference screenshot.
