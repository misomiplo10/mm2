/**
 * Lab tests (certificates of analysis), the same reports as on the Bliss site. `product` links a report
 * to a shop product so its page can link to it. Values are copied from the reports in % (as is);
 * "< LOQ" means below the limit of quantification (0.05 %).
 */
export interface LabTest {
  id: string;
  name: string;
  /** Slug of the shop product the report belongs to, when it is sold in the shop */
  product?: string;
  lab: string;
  date: string;
  sample: string;
  pdf: string;
  results: { thca: string; d9thc: string; sumThc: string; cbd: string; cbda: string; cbg: string };
}

export const labTests: LabTest[] = [
  {
    id: "fresh-frozen",
    name: "Fresh Frozen",
    lab: "LabCore, Ljubljana",
    date: "01.07.2026",
    sample: "CT_FREFR_1929801",
    pdf: "/docs/coa/fresh-frozen-coa.pdf",
    results: { thca: "51,06", d9thc: "0,19", sumThc: "0,17", cbd: "9,21", cbda: "0,41", cbg: "19,16" },
  },
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
    id: "amnesia-haze",
    name: "Amnesia Haze",
    lab: "LabCore, Ljubljana",
    date: "13.10.2025",
    sample: "CL_AMNESIAHAZETA_398221",
    pdf: "/docs/coa/amnesia-haze-coa.pdf",
    results: { thca: "25,12", d9thc: "0,17", sumThc: "0,17", cbd: "14,01", cbda: "0,11", cbg: "0,07" },
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
  {
    id: "dry-sift",
    name: "Dry Sift",
    lab: "LabCore, Ljubljana",
    date: "26.05.2025",
    sample: "CL_DRYSIFTTA_200455",
    pdf: "/docs/coa/dry-sift-coa.pdf",
    results: { thca: "34,11", d9thc: "0,08", sumThc: "< LOQ", cbd: "3,68", cbda: "< LOQ", cbg: "9,26" },
  },
];

export const labFor = (slug: string) => labTests.find((t) => t.product === slug);
