/** Shops that sell Mister Mellow, grouped by city on the Find os page. */
export interface Store {
  name: string;
  street: string;
  postcode: string;
  city: string;
}

export const stores: { area: string; stores: Store[] }[] = [
  {
    area: "Frederiksberg",
    stores: [
      { name: "Cherry Kiosk", street: "Værnedamsvej 17", postcode: "1819", city: "Frederiksberg" },
      { name: "Stationskiosken", street: "Peter Bangs Vej 82", postcode: "2000", city: "Frederiksberg" },
      { name: "Kiosk 52", street: "Godthåbsvej 52", postcode: "2000", city: "Frederiksberg" },
    ],
  },
  {
    area: "Silkeborg",
    stores: [{ name: "Kiosk 1", street: "Århusvej 25", postcode: "8600", city: "Silkeborg" }],
  },
];
