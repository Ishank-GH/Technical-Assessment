import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request, { params }) {
  // Get the incident ID from the dynamic route segment
  const incidentId = parseInt(params.id, 10);

  // Check if the ID is a valid number
  if (isNaN(incidentId)) {
    return NextResponse.json({ error: 'Invalid incident ID' }, { status: 400 });
  }

  try {
    const updatedIncident = await prisma.incident.update({
      where: {
        id: incidentId,
      },
      data: {
        resolved: true, // Flip the resolved status to true
      },
    });
    // Return the updated row as requested
    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error('API Error:', error);
    // Handle cases where the incident might not exist
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update incident' }, { status: 500 });
  }
}