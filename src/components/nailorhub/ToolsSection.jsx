import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Triangle, Zap, Cloud, Code2, Database, Workflow, Wand2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const toolGroups = [
  {
    label: "Development",
    tools: [
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg",
        blurb: "Fast, app-like interfaces with smooth state-driven UX.",
        details: ["Component-based UI", "Reusable design system patterns", "App-style navigation and interactions"],
      },
      {
        name: "TypeScript",
        icon: Code2,
        blurb: "Safer code and fewer regressions as the app grows.",
        details: ["Typed data contracts", "Better IDE support", "More maintainable feature work"],
      },
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nodedotjs.svg",
        blurb: "Backend services and APIs for internal tools.",
        details: ["REST and GraphQL APIs", "Job runners and automations", "Secure integrations"],
      },
      {
        name: "Express",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/express.svg",
        blurb: "Clean API layers with predictable routing and middleware.",
        details: ["Auth and permissions", "Webhook endpoints", "Request validation"],
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/mongodb.svg",
        blurb: "Flexible data models that evolve with your workflows.",
        details: ["Fast iteration", "Schema evolution", "Operational data storage"],
      },
      {
        name: "GraphQL",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/graphql.svg",
        blurb: "One API for multiple dashboards and views.",
        details: ["Single endpoint querying", "Front-end friendly data", "Reduced over-fetching"],
      },
      {
        name: "GitHub",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg",
        blurb: "Source control and clean deployment workflows.",
        details: ["PR review flows", "Release history", "Rollback-friendly deployments"],
      },
    ],
  },
  {
    label: "Tooling",
    tools: [
      {
        name: "Vite",
        icon: Zap,
        blurb: "Lightning-fast dev environment for modern React builds.",
        details: ["Instant HMR", "Optimized bundling", "Great DX for small and medium apps"],
      },
      {
        name: "Cursor",
        icon: Wand2,
        blurb: "AI-assisted development for faster iteration.",
        details: ["Refactors and cleanup", "Component scaffolding", "Review and improvement cycles"],
      },
    ],
  },
  {
    label: "Backend services",
    tools: [
      {
        name: "Supabase",
        icon: Database,
        blurb: "Managed Postgres and auth for rapid prototypes and simple apps.",
        details: ["Auth and storage options", "Postgres as a service", "Quick iteration for MVPs"],
      },
    ],
  },
  {
    label: "Deployment",
    description:
      "Azure for production apps. Vercel for lightweight sites and prototypes. DigitalOcean for flexible hosting.",
    tools: [
      {
        name: "Azure",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftazure.svg",
        blurb: "Production-grade cloud hosting and enterprise integrations.",
        details: ["Azure hosting and services", "Enterprise friendly", "Scales with internal ops needs"],
      },
      {
        name: "Vercel",
        icon: Triangle,
        blurb: "Fast deploys for websites and simple projects.",
        details: ["Preview deployments", "Great for marketing sites", "Simple project hosting"],
      },
      {
        name: "DigitalOcean",
        icon: Cloud,
        blurb: "Straightforward cloud for apps, APIs, and workers.",
        details: ["Droplets and managed services", "Cost-effective", "Flexible server deployments"],
      },
    ],
  },
  {
    label: "Automation",
    tools: [
      {
        name: "Zapier",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/zapier.svg",
        blurb: "Connect tools quickly with reliable no-code workflows.",
        details: ["Event-driven automations", "Integrations across apps", "Notifications and sync jobs"],
      },
      {
        name: "Pabbly",
        icon: Workflow,
        blurb: "Cost-effective automation and workflow routing.",
        details: ["Multi-step workflows", "Webhook handling", "Lower cost automation option"],
      },
    ],
  },
  {
    label: "Web & Design",
    tools: [
      {
        name: "WordPress",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/wordpress.svg",
        blurb: "Fast, editable sites when a CMS makes sense.",
        details: ["Marketing pages", "SEO friendly structure", "Client editable content"],
      },
      {
        name: "WooCommerce",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/woocommerce.svg",
        blurb: "Flexible ecommerce for WordPress projects.",
        details: ["Product catalogs", "Checkout flows", "Payments and shipping setup"],
      },
      {
        name: "Divi",
        logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ac925114a3f98d329cc51/d4cad6c57_IMG_3543.jpeg",
        blurb: "Rapid WordPress layouts with a proven builder.",
        details: ["Reusable sections", "Quick iteration", "Modern site templates"],
      },
      {
        name: "Breakdance",
        logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ac925114a3f98d329cc51/4b46648fe_IMG_3544.png",
        blurb: "High-performance WordPress builder for clean designs.",
        details: ["Lean output", "Design control", "Great performance focus"],
      },
      {
        name: "Cloudways",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cloudways.svg",
        blurb: "Managed hosting to keep WordPress stable and fast.",
        details: ["Managed updates and caching", "Performance tuning", "Operational stability"],
      },
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg",
        blurb: "Design systems and layouts before development.",
        details: ["Wireframes and UI kits", "Clickable prototypes", "Fast iteration on visuals"],
      },
    ],
  },
];

function ToolCard({ tool }) {
  const Icon = tool.icon;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative text-left inline-flex flex-col items-center justify-center w-[150px] sm:w-[160px] px-4 py-4 bg-white border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          {/* icon */}
          {tool.logo ? (
            <img
              src={tool.logo}
              alt={tool.name}
              className={`h-6 w-6 mb-2 opacity-70 group-hover:opacity-100 transition-opacity ${
                tool.grayscale ? "grayscale brightness-75 contrast-150" : ""
              }`}
            />
          ) : (
            <Icon className="h-6 w-6 mb-2 text-gray-600 opacity-70 group-hover:opacity-100 transition-opacity" />
          )}

          <span className="text-[11px] font-semibold text-gray-700 text-center">
            {tool.name}
          </span>

          {/* hover popout */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[220px] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hidden md:block z-20">
            <div className="rounded-xl border border-gray-300 bg-white shadow-xl p-3">
              <div className="text-[12px] font-semibold text-[#1e1e2f] mb-1">
                {tool.name}
              </div>
              <div className="text-[12px] text-gray-600 leading-snug">
                {tool.blurb}
              </div>
              <div className="mt-2 text-[11px] text-[#1a6fb5] font-semibold">
                Click for details
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#1a6fb5]/10 border border-[#1a6fb5]/20">
              {tool.logo ? (
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-5 h-5 opacity-80"
                />
              ) : (
                <Icon className="w-5 h-5 text-[#1a6fb5]" />
              )}
            </span>
            <span>{tool.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 text-[13px] text-gray-600 leading-relaxed">
          {tool.blurb}
        </div>

        {tool.details?.length ? (
          <ul className="mt-4 space-y-2">
            {tool.details.map((d, idx) => (
              <li key={idx} className="flex gap-2 text-[13px] text-gray-700">
                <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#1a6fb5]/70 flex-shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default function ToolsSection() {
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  }, []);

  return (
    <section
      className="py-24 md:py-28 bg-gradient-to-b from-white via-[#fafbfd] to-white"
      id="stack"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="text-[13px] font-semibold text-[#1a6fb5] uppercase tracking-widest mb-3">
            Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1e2f] tracking-tight">
            Tools we work with
          </h2>
          <p className="text-[13px] text-gray-600 mt-3 max-w-2xl mx-auto">
            A mix of modern development, fast prototyping, and reliable deployment
            options depending on the project.
          </p>
        </motion.div>

        <div className="space-y-12">
          {toolGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                isMobile
                  ? { duration: 0 }
                  : { delay: i * 0.08, duration: 0.6, ease: "easeOut" }
              }
              className="text-center"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">
                {group.label}
              </p>

              {group.description ? (
                <p className="text-[12px] text-gray-500 mb-5">
                  {group.description}
                </p>
              ) : null}

              <div className="flex flex-wrap justify-center gap-4">
                {group.tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
