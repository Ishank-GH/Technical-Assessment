import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  // Get the query parameter 'resolved' from the URL
  const { searchParams } = new URL(request.url);
  const resolvedParam = searchParams.get('resolved');

  // We only want to filter if the parameter is explicitly 'true' or 'false'
  let whereClause = {};
  if (resolvedParam === 'true' || resolvedParam === 'false') {
    whereClause.resolved = resolvedParam === 'true';
  }

  try {
    const incidents = await prisma.incident.findMany({
      where: whereClause,
      // Include the related camera's name and location
      include: {
        camera: {
          select: {
            name: true,
            location: true,
          },
        },
      },
      orderBy: {
        tsStart: 'desc', // Show newest incidents first
      },
    });
    return NextResponse.json(incidents);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}