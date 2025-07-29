// In-memory database that persists during runtime but resets on server restart
export const equipment = [
    {
      id: 1,
      name: "Excavator CAT 320",
      status: "Active",
      location: "Site A",
      lastUpdated: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Bulldozer Komatsu D65",
      status: "Idle",
      location: "Site B",
      lastUpdated: "2024-01-15T09:15:00Z"
    },
    {
      id: 3,
      name: "Crane Liebherr LTM",
      status: "Under Maintenance",
      location: "Workshop",
      lastUpdated: "2024-01-14T16:45:00Z"
    },
    {
      id: 4,
      name: "Loader Volvo L120",
      status: "Active",
      location: "Site C",
      lastUpdated: "2024-01-15T11:20:00Z"
    },
    {
      id: 5,
      name: "Dump Truck Terex TA300",
      status: "Idle",
      location: "Yard",
      lastUpdated: "2024-01-15T08:30:00Z"
    },
    {
      id: 6,
      name: "", // BUG: Empty equipment name
      status: "Active",
      location: "Site D",
      lastUpdated: "2024-01-15T12:00:00Z"
    }
  ];
  
  // In-memory status history database
  export const statusHistory = [
    {
      id: 1,
      equipmentId: 1,
      previousStatus: "Idle",
      newStatus: "Active",
      timestamp: "2024-01-15T10:30:00Z",
      changedBy: "Operator John"
    },
    {
      id: 2,
      equipmentId: 1,
      previousStatus: "Under Maintenance",
      newStatus: "Idle",
      timestamp: "2024-01-14T14:20:00Z",
      changedBy: "Technician Mike"
    },
    {
      id: 3,
      equipmentId: 2,
      previousStatus: "Active",
      newStatus: "Idle",
      timestamp: "2024-01-15T09:15:00Z",
      changedBy: "Operator Sarah"
    },
    {
      id: 4,
      equipmentId: 3,
      previousStatus: "Active",
      newStatus: "Under Maintenance",
      timestamp: "2024-01-14T16:45:00Z",
      changedBy: "Technician Mike"
    },
    {
      id: 5,
      equipmentId: 4,
      previousStatus: "Idle",
      newStatus: "Active",
      timestamp: "2024-01-15T11:20:00Z",
      changedBy: "Operator David"
    },
    {
      id: 6,
      equipmentId: 5,
      previousStatus: "Active",
      newStatus: "Idle",
      timestamp: "2024-01-15T08:30:00Z",
      changedBy: "Operator Lisa"
    }
  ];