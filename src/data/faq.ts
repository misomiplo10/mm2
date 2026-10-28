import { company } from "./company";
import type { Lang } from "../i18n";

/**
 * Practical answers only. Nothing about effects, strength, legality or the police: on a site for
 * herbal smoking products that counts as advertising (tobaksreklameloven § 3).
 */
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
    title: "Bestilling og betaling",
    items: [
      { q: "Hvem kan købe?", a: ["Kun personer over 18 år. Din alder kontrolleres med MitID, før et køb kan gennemføres. Fragtfirmaet kan også bede om legitimation ved levering."] },
      { q: "Hvordan betaler jeg?", a: ["Med VISA eller Mastercard. Beløbet trækkes, når ordren sendes."] },
      { q: "Kan jeg få et analysecertifikat?", a: [`Ja. Skriv til ${company.serviceEmail} med produktnavn og batchnummer, så sender vi analysecertifikatet for den pågældende batch.`] },
    ],
  },
  {
    title: "Levering",
    items: [
      { q: "Hvor leverer I?", a: ["Kun til adresser i Danmark."] },
      { q: "Hvad koster fragt?", a: ["Fragtprisen afhænger af vægt og fragtfirma og vises i kurven, før du betaler."] },
      { q: "Hvor lang er leveringstiden?", a: [`Normalt ${company.deliveryDays} hverdage fra bestilling.`] },
    ],
  },
  {
    title: "Fortrydelse og reklamation",
    items: [
      { q: "Kan jeg fortryde?", a: ["Ja, uåbnede varer kan returneres inden for 14 dage. Fortrydelsesretten bortfalder for en vare, hvis forseglingen er brudt efter leveringen. Brug siden Fortryd aftale."] },
      { q: "Hvad gør jeg, hvis en vare er mangelfuld?", a: ["Kontakt os. Du har 2 års reklamationsret efter købeloven. Læs mere i handelsbetingelserne."] },
      { q: "Hvordan kontakter jeg jer?", a: [`På ${company.serviceEmail} eller ${company.phone}.`] },
    ],
  },
];

const en: FaqGroup[] = [
  {
    title: "Ordering and payment",
    items: [
      { q: "Who can buy?", a: ["Only people aged 18 or over. Your age is checked with MitID before a purchase can be completed. The carrier may also ask for ID on delivery."] },
      { q: "How do I pay?", a: ["By VISA or Mastercard. You are charged when the order ships."] },
      { q: "Can I get a certificate of analysis?", a: [`Yes. Email ${company.serviceEmail} with the product name and batch number and we will send the certificate for that batch.`] },
    ],
  },
  {
    title: "Delivery",
    items: [
      { q: "Where do you deliver?", a: ["Only to addresses in Denmark."] },
      { q: "What does shipping cost?", a: ["The price depends on weight and carrier and is shown in the cart before you pay."] },
      { q: "How long does delivery take?", a: [`Usually ${company.deliveryDays} business days from ordering.`] },
    ],
  },
  {
    title: "Cancellation and complaints",
    items: [
      { q: "Can I cancel?", a: ["Yes, unopened items can be returned within 14 days. The right to cancel lapses for an item if its seal is broken after delivery. Use the Cancel your purchase page."] },
      { q: "What if an item is faulty?", a: ["Contact us. You have 2 years to complain under the Danish Sale of Goods Act. See the terms and conditions."] },
      { q: "How do I contact you?", a: [`At ${company.serviceEmail} or ${company.phone}.`] },
    ],
  },
];

export const faq: Record<Lang, FaqGroup[]> = { da, en };
