import { NextResponse } from 'next/server';
import { resetData } from '@/app/lib/data';

export async function POST() {
  try {
    await resetData();
    
    return NextResponse.json({
      success: true,
      message: 'Data reset to default state'
    });
  } catch (error) {
    console.error('Error resetting data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset data' },
      { status: 500 }
    );
  }
}