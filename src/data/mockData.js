// mockData.js

export const products = [
  {
    id: 1,
    name: "Test Product 1",
    code: "T001",
    createdAt: "2024-12-01T15:00:00.000Z",
    updatedAt: "2024-12-01T15:00:00.000Z",
    Measurements: [
      {
        id: 1,
        timestamp: "2024-12-01T18:00:00.000Z",
        lastUpdatedBy: "Usuario Actual",
        containers: [
          {
            tare: 0.3,
            initialGross: 4.5,
            currentGross: 4.2,
          },
          {
            tare: 0.4,
            initialGross: 5.0,
            currentGross: 4.7,
          },
          {
            tare: 0.4,
            initialGross: 5.0,
            currentGross: 4.7,
          }
        ]
      },
  
    ]
  },
  {
    id: 2,
    name: "Test Product 2",
    code: "T002",
    createdAt: "2024-12-02T21:19:46.000Z",
    updatedAt: "2024-12-02T21:19:46.000Z",
    Measurements: [
      {
        id: 2,
        timestamp: "2024-12-02T11:00:00.000Z",
        lastUpdatedBy: "Usuario Actual",
        containers: [
          {
            tare: 0.5,
            initialGross: 5.1,
            currentGross: 4.6,
          },
          {
            tare: 0.4,
            initialGross: 5.5,
            currentGross: 3.9,
          },
          {
            tare: 0.5,
            initialGross: 5.1,
            currentGross: 4.8,
          }
        ]
      },
      {
        id: 3,
        timestamp: "2024-12-02T15:00:00.000Z",
        lastUpdatedBy: "Usuario Actual",
        containers: [
          {
            tare: 0.4,
            initialGross: 5.5,
            currentGross: 3.7,
          },
          {
            tare: 0.5,
            initialGross: 5.1,
            currentGross: 4.6,
          },
          {
            tare: 0.5,
            initialGross: 5.1,
            currentGross: 4.6,
          }
        ]
      }
    ]
  },
];
