import { NextResponse } from 'next/server';
import { getStatusHistory } from '@/app/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const equipmentId = parseInt(id);
    
    // Get URL parameters for filtering
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    // Get history for specific equipment
    const equipmentHistory = await getStatusHistory(equipmentId);
    
    // Sort by timestamp (newest first)
    const sortedHistory = equipmentHistory.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Apply pagination
    const paginatedHistory = sortedHistory.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: {
        equipmentId,
        history: paginatedHistory,
        total: equipmentHistory.length,
        limit,
        offset,
        hasMore: offset + limit < equipmentHistory.length
      }
    });
  } catch (error) {
    console.error('Error fetching equipment history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch equipment history' },
      { status: 500 }
    );
  }
}