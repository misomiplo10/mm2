/**
 * Lab tests (certificates of analysis), the same reports as on the Bliss site. `product` links a report
 * to a shop product so its page can link to it. Values are copied from the reports in % (as is);
 * "< LOQ" means below the limit of quantification (0.05 %).
 */
export interface LabTest {
  id: string;
  name: string;
  /** Slug of the shop product the report belongs to */
  product: string;
  lab: string;
  date: string;
  sample: string;
  pdf: string;
  results: { thca: string; d9thc: string; sumThc: string; cbd: string; cbda: string; cbg: string };
}

export const labTests: LabTest[] = [
  {
    id: "static",
    name: "Static",
    product: "cosa-nostra",
    lab: "LabCore, Ljubljana",
    date: "23.10.2025",
    sample: "CL_STATICTA_169663",
    pdf: "/docs/coa/static-coa.pdf",
    results: { thca: "46,79", d9thc: "0,19", sumThc: "0,19", cbd: "1,16", cbda: "17,78", cbg: "0,14" },
  },
  {
    id: "la-mousse",
    name: "La Mousse",
    product: "la-mousse",
    lab: "LabCore, Ljubljana",
    date: "13.07.2025",
    sample: "CL_LAMOUSSTA_166893",
    pdf: "/docs/coa/la-mousse-coa.pdf",
    results: { thca: "34,93", d9thc: "0,14", sumThc: "0,14", cbd: "15,24", cbda: "0,29", cbg: "10,36" },
  },
];

export const labFor = (slug: string) => labTests.find((t) => t.product === slug);
