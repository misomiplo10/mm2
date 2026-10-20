import { company } from "./company";
import type { Lang } from "../i18n";

export interface FaqItem {
  q: string;
  /** One paragraph per entry. */
  a: string[];
  list?: string[];
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

const da: FaqGroup[] = [
  {
    title: "Cannabinoider",
    items: [
      {
        q: "Hvad er THC-A?",
        a: [
          "THC-A (tetrahydrocannabinolsyre) er en cannabinoid, der dannes naturligt i den rå cannabisplante. I sin rå form er THC-A ikke psykoaktiv – det er forstadiet til THC, det stof, der giver den kendte rus.",
          "Når THC-A opvarmes, fx ved rygning eller bagning, omdannes det til THC. Processen kaldes decarboxylering. Derfor er indholdet af THC-A det tal, der siger mest om styrken i et produkt – og det er det tal, vi viser på hver pakke og i lab-rapporterne.",
        ],
      },
      {
        q: "Hvad er CBD?",
        a: [
          "CBD (cannabidiol) er en anden naturlig cannabinoid fra cannabisplanten. CBD er ikke psykoaktiv og giver ingen rus. Mængden af CBD varierer fra sort til sort, og du kan se det præcise indhold i lab-rapporterne.",
        ],
      },
      {
        q: "Er produkterne laboratorietestet?",
        a: [
          "Ja. Alt testes af LabCore, et EMA-akkrediteret laboratorium (GMP), før det kommer i posen. Du kan se tallene og hente de fulde rapporter under Lab-rapporter.",
        ],
      },
      {
        q: "Hvad er forskellen på Fresh Frozen og Dry Sift?",
        a: [
          "Fresh Frozen er lavet af frisk frosset plantemateriale og er blød og aromatisk. Dry Sift er klassisk hash, hvor tørrede trichomer sigtes fra – ren, tør og aromatisk.",
        ],
      },
      {
        q: "Hvordan opbevarer jeg produkterne?",
        a: [
          "Køligt, tørt og mørkt i den lukkede emballage. THC-A omdannes langsomt ved varme og lys, så undgå vindueskarme og varmekilder. Opbevares altid utilgængeligt for børn og dyr.",
        ],
      },
    ],
  },
  {
    title: "Bestilling og levering",
    items: [
      {
        q: "Hvor kan jeg købe Mister Mellow?",
        a: [
          `Hos udvalgte butikker og her i webshoppen. Spørg efter os ved kassen, eller følg ${company.instagram} på Instagram for at se, hvor du finder os.`,
        ],
      },
      {
        q: "Bliver min pakke sendt diskret?",
        a: [
          "Ja. Vi pakker i en neutral, lugttæt forsendelse uden logo eller tekst, der afslører indholdet. Udefra ligner den enhver anden pakke.",
        ],
      },
      {
        q: "Kan jeg købe større mængder?",
        a: [
          `Ja. Skriv til ${company.email}, så finder vi en løsning sammen.`,
        ],
      },
      {
        q: "Hvad er aldersgrænsen?",
        a: [
          "Vi sælger kun til personer over 18 år – både i webshoppen og i butikkerne, hvor der spørges efter legitimation. Det har vi valgt af tre grunde:",
        ],
        list: [
          "Ansvarligt salg: Vores produkter skal kun ende hos voksne, der kan træffe et informeret valg.",
          "Branchestandard: 18 år er den grænse, de seriøse aktører i branchen arbejder efter, og den står vi bag.",
          "Ingen misforståelser: Produkterne kan forveksles med andre cannabisprodukter, og vi vil undgå unødige konflikter.",
        ],
      },
    ],
  },
  {
    title: "Lovgivning",
    items: [
      {
        q: "Hvad indeholder produkterne – og hvad indeholder de ikke?",
        a: [
          "Vores produkter er lab-testet og indeholder under 0,2 % Δ9-THC. De indeholder ikke HHC, HHC-P, THC-P, H4CBD eller andre syntetiske eller semisyntetiske cannabinoider. Du kan selv tjekke tallene for hver sort under Lab-rapporter.",
        ],
      },
      {
        q: "Hvad gør jeg, hvis jeg bliver stoppet af politiet?",
        a: [
          "Politiet kan ikke se forskel på vores produkter og andre cannabisprodukter med det blotte øje. Vi anbefaler derfor, at du altid opbevarer produkterne i den originale, forseglede emballage og gemmer din kvittering.",
          "Bliver produkterne taget i bevaring, så bed om en kvittering for beslaglæggelsen og henvis til lab-rapporten for den pågældende sort. Kontakt os gerne bagefter – så hjælper vi med dokumentationen.",
        ],
      },
      {
        q: "Hvad sker der, hvis min pakke bliver beslaglagt?",
        a: [
          "Bliver en forsendelse tilbageholdt, får du normalt besked fra politiet eller toldmyndighederne om hvorfor, og hvad du skal gøre for at få den udleveret.",
          "Typisk sender myndighederne produktet til test for at kontrollere indholdet. Det kan tage tid – nogle gange flere uger – så hav lidt tålmodighed, og kontakt os, så hjælper vi med papirerne.",
        ],
      },
    ],
  },
  {
    title: "Forhandlere",
    items: [
      {
        q: "Hvordan bliver jeg forhandler af Mister Mellow?",
        a: [
          `Ring på ${company.phone} eller skriv til ${company.email} – du finder alle oplysninger på siden For forhandlere. Vi vender tilbage hurtigt, og når samarbejdet er på plads, leverer vi personligt inden for 1–2 dage med opstartspakke og display.`,
        ],
      },
      {
        q: "Hvad kræver I af en forhandler?",
        a: ["Vi vil gerne arbejde sammen med butikker, der deler vores fokus på kvalitet og god service. Vi forventer:"],
        list: [
          "En fysisk butik eller aktiv webshop med gyldigt CVR-nummer.",
          "Interesse for og viden om cannabisprodukter.",
          "At produkterne kun sælges til kunder over 18 år og markedsføres i overensstemmelse med gældende lovgivning.",
        ],
      },
    ],
  },
];

const en: FaqGroup[] = [
  {
    title: "Cannabinoids",
    items: [
      {
        q: "What is THC-A?",
        a: [
          "THC-A (tetrahydrocannabinolic acid) is a cannabinoid that forms naturally in the raw cannabis plant. In its raw form THC-A is not psychoactive – it is the precursor to THC, the compound behind the well-known high.",
          "When THC-A is heated, for example by smoking or baking, it converts into THC. The process is called decarboxylation. That is why the THC-A content is the number that says most about a product's strength – and it is the number we show on every pack and in the lab reports.",
        ],
      },
      {
        q: "What is CBD?",
        a: [
          "CBD (cannabidiol) is another natural cannabinoid from the cannabis plant. CBD is not psychoactive and does not get you high. The amount of CBD varies from strain to strain, and you can see the exact content in the lab reports.",
        ],
      },
      {
        q: "Are the products lab-tested?",
        a: [
          "Yes. Everything is tested by LabCore, an EMA-accredited (GMP) laboratory, before it goes in the pouch. You can see the numbers and download the full reports under Lab reports.",
        ],
      },
      {
        q: "What is the difference between Fresh Frozen and Dry Sift?",
        a: [
          "Fresh Frozen is made from freshly frozen plant material and is soft and aromatic. Dry Sift is classic hash made by sifting dried trichomes – clean, dry and aromatic.",
        ],
      },
      {
        q: "How should I store the products?",
        a: [
          "Cool, dry and dark in the sealed packaging. THC-A slowly converts with heat and light, so keep it away from windowsills and heat sources. Always keep out of reach of children and pets.",
        ],
      },
    ],
  },
  {
    title: "Orders and delivery",
    items: [
      {
        q: "Where can I buy Mister Mellow?",
        a: [
          `In selected stores and here in the web shop. Ask for us at the till, or follow ${company.instagram} on Instagram to see where to find us.`,
        ],
      },
      {
        q: "Will my parcel be sent discreetly?",
        a: [
          "Yes. We pack everything in a neutral, smell-proof parcel with no logo or text that gives away what's inside. From the outside it looks like any other parcel.",
        ],
      },
      {
        q: "Can I buy larger quantities?",
        a: [`Yes. Email ${company.email} and we'll work something out together.`],
      },
      {
        q: "What is the age limit?",
        a: [
          "We only sell to adults aged 18 and over – both in the web shop and in stores, where ID is checked. We chose this for three reasons:",
        ],
        list: [
          "Responsible sales: our products should only end up with adults who can make an informed choice.",
          "Industry standard: 18 is the limit the serious players in the industry work by, and we stand behind it.",
          "No misunderstandings: the products can be mistaken for other cannabis products, and we want to avoid needless trouble.",
        ],
      },
    ],
  },
  {
    title: "Legislation",
    items: [
      {
        q: "What do the products contain – and what don't they contain?",
        a: [
          "Our products are lab-tested and contain less than 0.2% Δ9-THC. They contain no HHC, HHC-P, THC-P, H4CBD or other synthetic or semi-synthetic cannabinoids. You can check the numbers for each strain yourself under Lab reports.",
        ],
      },
      {
        q: "What should I do if I'm stopped by the police?",
        a: [
          "The police cannot tell our products apart from other cannabis products with the naked eye. We therefore recommend that you always keep the products in their original, sealed packaging and hold on to your receipt.",
          "If the products are taken into custody, ask for a receipt for the seizure and refer to the lab report for that strain. Feel free to contact us afterwards – we'll help with the paperwork.",
        ],
      },
      {
        q: "What happens if my parcel is seized?",
        a: [
          "If a shipment is held, you will normally hear from the police or customs about why, and what you need to do to have it released.",
          "The authorities usually send the product for testing to check its content. This can take time – sometimes several weeks – so be patient, and contact us so we can help with the paperwork.",
        ],
      },
    ],
  },
  {
    title: "Retailers",
    items: [
      {
        q: "How do I become a Mister Mellow retailer?",
        a: [
          `Call ${company.phone} or email ${company.email} – you'll find all the details on the For retailers page. We get back to you quickly, and once we're set up, we deliver in person within 1–2 days with a starter pack and display.`,
        ],
      },
      {
        q: "What do you require from a retailer?",
        a: ["We'd love to work with stores that share our focus on quality and good service. We expect:"],
        list: [
          "A physical store or active web shop with a valid Danish CVR number.",
          "An interest in and knowledge of cannabis products.",
          "That the products are only sold to customers aged 18+ and marketed in line with current legislation.",
        ],
      },
    ],
  },
];

export const faq: Record<Lang, FaqGroup[]> = { da, en };
