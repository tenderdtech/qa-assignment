import { NextResponse } from 'next/server';

// In-memory database that persists during runtime but resets on server restart
const equipment = [
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
];

// In-memory status history database
const statusHistory = [
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

// Export the databases so they can be shared between API routes
export { equipment, statusHistory };

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: equipment,
      count: equipment.length
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch equipment' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, status, location } = body;

    // Validation
    if (!name || !status || !location) {
      return NextResponse.json(
        { success: false, error: 'Name, status, and location are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['Active', 'Idle', 'Under Maintenance'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be Active, Idle, or Under Maintenance' },
        { status: 400 }
      );
    }

    // Find the next available ID
    const nextId = Math.max(...equipment.map(eq => eq.id)) + 1;

    const newEquipment = {
      id: nextId,
      name,
      status,
      location,
      lastUpdated: new Date().toISOString()
    };

    equipment.push(newEquipment);

    return NextResponse.json({
      success: true,
      data: newEquipment
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating equipment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create equipment' },
      { status: 500 }
    );
  }
} 