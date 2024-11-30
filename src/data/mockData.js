export const products = [
  { name: "Arroz hervido", code: "A001" },
  { name: "Frijoles secos", code: "B002" },
  { name: "Maíz molido", code: "C003" },
];

export const measurements = {
  A001: [
    { tare: 0.5, initialGross: 5, currentGross: 4.8, lastUpdatedBy: "Usuario Actual", timestamp: "2024-11-29T10:00:00Z" },
    { tare: 0.4, initialGross: 4, currentGross: 3.9, lastUpdatedBy: "Usuario Actual", timestamp: "2024-11-29T11:00:00Z" },
    { tare: 0.6, initialGross: 6, currentGross: 5.7, lastUpdatedBy: "Usuario Actual", timestamp: "2024-11-29T12:00:00Z" },
  ],
  B002: [
    { tare: 0.3, initialGross: 4.5, currentGross: 4.2, lastUpdatedBy: "Usuario Actual", timestamp: "2024-11-29T13:00:00Z" },
  ],
  C003: [
    { tare: 0.5, initialGross: 5.5, currentGross: 5.1, lastUpdatedBy: "Usuario Actual", timestamp: "2024-11-29T14:00:00Z" },
  ],
};