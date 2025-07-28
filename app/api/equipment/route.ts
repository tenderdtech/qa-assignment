import { NextResponse } from 'next/server';
import { getEquipment, addEquipment } from '@/app/lib/data';

export async function GET() {
  try {
    const equipment = await getEquipment();
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

    const equipment = await getEquipment();
    const nextId = Math.max(...equipment.map(eq => eq.id)) + 1;

    const newEquipment = {
      id: nextId,
      name,
      status: status as "Active" | "Idle" | "Under Maintenance",
      location,
      lastUpdated: new Date().toISOString()
    };

    await addEquipment(newEquipment);

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