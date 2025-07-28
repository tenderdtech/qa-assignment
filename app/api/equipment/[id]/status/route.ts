import { NextResponse } from 'next/server';
import { updateEquipmentStatus } from '@/app/lib/data';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const equipmentId = parseInt(id);
    const body = await request.json();
    const { status, changedBy = "System" } = body;

    // Validation
    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
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

    const updatedEquipment = await updateEquipmentStatus(equipmentId, status, changedBy);
    
    if (!updatedEquipment) {
      return NextResponse.json(
        { success: false, error: 'Equipment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        equipment: updatedEquipment
      }
    });
  } catch (error) {
    console.error('Error updating equipment status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update equipment status' },
      { status: 500 }
    );
  }
}