import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

export interface Equipment {
  id: number;
  name: string;
  status: "Active" | "Idle" | "Under Maintenance";
  location: string;
  lastUpdated: string;
}

export interface StatusHistory {
  id: number;
  equipmentId: number;
  previousStatus: string;
  newStatus: string;
  timestamp: string;
  changedBy: string;
}

interface DataStore {
  equipment: Equipment[];
  statusHistory: StatusHistory[];
}

// Default data
const defaultData: DataStore = {
  equipment: [
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
    }
  ],
  statusHistory: [
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
  ]
};

async function ensureDataFile() {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, JSON.stringify(defaultData, null, 2));
  }
}

async function readData(): Promise<DataStore> {
  await ensureDataFile();
  const data = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
  return data;
}

async function writeData(data: DataStore): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

export async function getEquipment(): Promise<Equipment[]> {
  const data = await readData();
  return data.equipment;
}

export async function addEquipment(equipment: Equipment): Promise<void> {
  const data = await readData();
  data.equipment.push(equipment);
  await writeData(data);
}

export async function updateEquipmentStatus(id: number, status: string, changedBy: string): Promise<Equipment | null> {
  const data = await readData();
  const equipmentIndex = data.equipment.findIndex(eq => eq.id === id);
  
  if (equipmentIndex === -1) return null;
  
  const previousStatus = data.equipment[equipmentIndex].status;
  data.equipment[equipmentIndex].status = status as "Active" | "Idle" | "Under Maintenance";
  data.equipment[equipmentIndex].lastUpdated = new Date().toISOString();
  
  // Add to history
  const nextHistoryId = Math.max(...data.statusHistory.map(h => h.id)) + 1;
  const historyEntry: StatusHistory = {
    id: nextHistoryId,
    equipmentId: id,
    previousStatus,
    newStatus: status,
    timestamp: new Date().toISOString(),
    changedBy
  };
  data.statusHistory.push(historyEntry);
  
  await writeData(data);
  return data.equipment[equipmentIndex];
}

export async function getStatusHistory(equipmentId?: number): Promise<StatusHistory[]> {
  const data = await readData();
  if (equipmentId) {
    return data.statusHistory.filter(h => h.equipmentId === equipmentId);
  }
  return data.statusHistory;
}

export async function resetData(): Promise<void> {
  await writeData(defaultData);
}