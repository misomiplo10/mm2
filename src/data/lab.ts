import type { L } from "../i18n";

export const labName: L = { da: "LabCore (EMA-akkrediteret, GMP)", en: "LabCore (EMA-accredited, GMP)" };

export interface LabResult {
  strain: string;
  thca: string;
  d9thc: string;
  cbd: string;
  coa: string;
  /** Shop product this report belongs to; reports without one only show on the lab page */
  product?: string;
}

/** "< LOQ" means below LabCore's limit of quantitation (0,05 %). */
export const labResults: LabResult[] = [
  { strain: "Fresh Frozen", thca: "51,06 %", d9thc: "0,19 %", cbd: "9,21 %", coa: "/docs/fresh-frozen-coa.pdf", product: "fresh-frozen" },
  { strain: "Static", thca: "46,79 %", d9thc: "0,19 %", cbd: "1,16 %", coa: "/docs/static-coa.pdf" },
  { strain: "La Mousse", thca: "34,93 %", d9thc: "0,14 %", cbd: "15,24 %", coa: "/docs/la-mousse-coa.pdf" },
  { strain: "Dry Sift", thca: "34,11 %", d9thc: "0,08 %", cbd: "3,68 %", coa: "/docs/dry-sift-coa.pdf", product: "dry-sift" },
  { strain: "Amnesia Haze", thca: "25,12 %", d9thc: "0,17 %", cbd: "14,01 %", coa: "/docs/amnesia-haze-coa.pdf" },
  { strain: "Orangello", thca: "19,57 %", d9thc: "0,11 %", cbd: "2,27 %", coa: "/docs/orangello-coa.pdf" },
];

export const labFor = (slug: string) => labResults.find((r) => r.product === slug);
