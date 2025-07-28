import { NextResponse } from 'next/server';
import { equipment, statusHistory } from '../../route';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const equipmentId = parseInt(params.id);
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

    // Find equipment
    const equipmentIndex = equipment.findIndex(eq => eq.id === equipmentId);
    if (equipmentIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Equipment not found' },
        { status: 404 }
      );
    }

    const previousStatus = equipment[equipmentIndex].status;
    const timestamp = new Date().toISOString();

    // Update equipment status
    equipment[equipmentIndex].status = status;
    equipment[equipmentIndex].lastUpdated = timestamp;

    // Add to history
    const nextHistoryId = Math.max(...statusHistory.map(h => h.id)) + 1;
    const historyEntry = {
      id: nextHistoryId,
      equipmentId,
      previousStatus,
      newStatus: status,
      timestamp,
      changedBy
    };
    statusHistory.push(historyEntry);

    return NextResponse.json({
      success: true,
      data: {
        equipment: equipment[equipmentIndex],
        historyEntry
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update equipment status' },
      { status: 500 }
    );
  }
} 