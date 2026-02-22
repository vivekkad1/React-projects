export const FILTER_CONFIG = {
  flights: {
    sections: [
      {
        id: "airline",
        title: "Airlines",
        options: [
          "IndiGo",
          "Air India",
          "Vistara",
          "SpiceJet",
          "Akasa Air",
          "Air India Express",
        ],
      },
      {
        id: "departure",
        title: "Departure Time",
        options: [
          "Morning (6AM–12PM)",
          "Afternoon (12PM–6PM)",
          "Evening (6PM–12AM)",
          "Night (12AM–6AM)",
        ],
      },
      {
        id: "price",
        title: "Price Range",
        options: [
          "Under ₹4,000",
          "₹4,000 – ₹5,000",
          "₹5,000 – ₹6,000",
          "Above ₹6,000",
        ],
      },
    ],
  },
  hotels: {
    sections: [
      {
        id: "rating",
        title: "Rating",
        options: ["4.5★ & above", "4.0★ & above", "3.5★ & above"],
      },
      {
        id: "price",
        title: "Price Range",
        options: [
          "Under ₹5,000",
          "₹5,000 – ₹10,000",
          "₹10,000 – ₹20,000",
          "Above ₹20,000",
        ],
      },
    ],
  },
  trains: {
    sections: [
      {
        id: "class",
        title: "Train Class",
        options: ["SL", "3A", "2A", "1A", "CC", "EC"],
      },
      {
        id: "departure",
        title: "Departure Time",
        options: [
          "Morning (6AM–12PM)",
          "Afternoon (12PM–6PM)",
          "Evening (6PM–12AM)",
          "Night (12AM–6AM)",
        ],
      },
      {
        id: "price",
        title: "Price Range",
        options: [
          "Under ₹1,000",
          "₹1,000 – ₹1,500",
          "₹1,500 – ₹2,000",
          "Above ₹2,000",
        ],
      },
    ],
  },
  buses: {
    sections: [
      {
        id: "busType",
        title: "Bus Type",
        options: ["A/C", "Non A/C", "Sleeper", "Seater", "Volvo"],
      },
      {
        id: "departure",
        title: "Departure Time",
        options: [
          "Morning (6AM–12PM)",
          "Afternoon (12PM–6PM)",
          "Evening (6PM–12AM)",
          "Night (12AM–6AM)",
        ],
      },
      {
        id: "price",
        title: "Price Range",
        options: [
          "Under ₹800",
          "₹800 – ₹1,000",
          "₹1,000 – ₹1,300",
          "Above ₹1,300",
        ],
      },
    ],
  },
  cabs: {
    sections: [
      {
        id: "cabType",
        title: "Cab Type",
        options: ["Hatchback", "Sedan", "SUV", "Mini", "Luxury", "Electric"],
      },
      {
        id: "price",
        title: "Price Range",
        options: ["Under ₹2,500", "₹2,500 – ₹4,000", "Above ₹4,000"],
      },
    ],
  },
};
