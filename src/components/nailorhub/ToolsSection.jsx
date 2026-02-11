import React from "react";
import { motion } from "framer-motion";
import { Triangle, Layout, Zap } from "lucide-react";

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const toolGroups = [
  {
    label: "Development",
    tools: [
      { name: "React", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nodedotjs.svg" },
      { name: "Express", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/express.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/mongodb.svg" },
      { name: "GraphQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/graphql.svg" },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg" },
    ],
  },
  {
    label: "Deployment",
    description: "Azure for production apps. Vercel for lightweight sites and prototypes.",
    tools: [
      { name: "Azure", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftazure.svg" },
      { name: "Vercel", icon: Triangle },
    ],
  },
  {
    label: "No-code / Low-code",
    tools: [
      { name: "Airtable", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/airtable.svg" },
      { name: "Google Sheets", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlesheets.svg" },
      { name: "Zapier", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/zapier.svg" },
      { name: "DronaHQ", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ac925114a3f98d329cc51/5bd3658b1_IMG_3542.jpg" },
    ],
  },
  {
    label: "Web & Design",
    tools: [
      { name: "WordPress", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/wordpress.svg" },
      { name: "WooCommerce", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/woocommerce.svg" },
      { name: "Divi", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ac925114a3f98d329cc51/d4cad6c57_IMG_3543.jpeg" },
      { name: "Breakdance", logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698ac925114a3f98d329cc51/4b46648fe_IMG_3544.png" },
      { name: "Cloudways", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cloudways.svg" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg" },
    ],
  },
];

export default function ToolsSection() {
  return (
    <section className="py-24 md:py-28 bg-gradient-to-b from-white via-[#fafbfd] to-white">
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
        </motion.div>

        <div className="space-y-12">
          {toolGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={isMobile ? { duration: 0 } : { delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">
                {group.label}
              </p>
              {group.description && (
                <p className="text-[12px] text-gray-500 mb-5">{group.description}</p>
              )}
              <div className="flex flex-wrap justify-center gap-4">
                {group.tools.map((tool, j) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={j}
                      className="inline-flex flex-col items-center justify-center w-[140px] px-4 py-4 bg-white border border-gray-200/80 rounded-xl hover:border-[#1a6fb5]/40 hover:shadow-md transition-all duration-200 cursor-default shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    >
                      {tool.logo ? (
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className={`h-6 w-6 mb-2 opacity-70 hover:opacity-100 transition-opacity ${tool.grayscale ? 'grayscale brightness-75 contrast-150' : ''}`}
                        />
                      ) : (
                        <Icon className="h-6 w-6 mb-2 text-gray-600 opacity-70 hover:opacity-100 transition-opacity" />
                      )}
                      <span className="text-[11px] font-semibold text-gray-700 text-center">{tool.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}