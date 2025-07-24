const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  await prisma.incident.deleteMany({});
  await prisma.camera.deleteMany({});
  console.log('Cleared previous data.');

  const camera1 = await prisma.camera.create({ data: { name: 'Shop Floor Camera 1', location: 'Main Vault' } });
  const camera2 = await prisma.camera.create({ data: { name: 'Shop Floor Camera 2', location: 'Entrance' } });
  const camera3 = await prisma.camera.create({ data: { name: 'Rooftop Camera', location: 'East Wing' } });
  console.log('Created cameras.');

  const now = new Date();
  const hour = 60 * 60 * 1000;

  const incidentsData = [
    // Camera 1 Incidents (with overlaps)
    { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 23 * hour), tsEnd: new Date(now.getTime() - 22.5 * hour), thumbnailUrl: '/thumbnails/thumb1.png', cameraId: camera1.id },
    { type: 'Face Recognised', tsStart: new Date(now.getTime() - 15 * hour), tsEnd: new Date(now.getTime() - 14 * hour), thumbnailUrl: '/thumbnails/thumb2.png', cameraId: camera1.id },
    { type: 'Multiple Events', tsStart: new Date(now.getTime() - 14.5 * hour), tsEnd: new Date(now.getTime() - 13.5 * hour), thumbnailUrl: '/thumbnails/thumb3.png', cameraId: camera1.id },
    { type: 'Gun Threat', tsStart: new Date(now.getTime() - 4 * hour), tsEnd: new Date(now.getTime() - 3 * hour), thumbnailUrl: '/thumbnails/thumb4.png', cameraId: camera1.id },
    { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 4.5 * hour), tsEnd: new Date(now.getTime() - 3.5 * hour), thumbnailUrl: '/thumbnails/thumb5.png', cameraId: camera1.id },

    // Camera 2 Incidents
    { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 22 * hour), tsEnd: new Date(now.getTime() - 21 * hour), thumbnailUrl: '/thumbnails/thumb1.png', cameraId: camera2.id },
    { type: 'Face Recognised', tsStart: new Date(now.getTime() - 14 * hour), tsEnd: new Date(now.getTime() - 13 * hour), thumbnailUrl: '/thumbnails/thumb2.png', cameraId: camera2.id },
    
    // Camera 3 Incidents
    { type: 'Traffic Congestion', tsStart: new Date(now.getTime() - 16 * hour), tsEnd: new Date(now.getTime() - 15 * hour), thumbnailUrl: '/thumbnails/thumb3.png', cameraId: camera3.id },
    { type: 'Unauthorised Access', tsStart: new Date(now.getTime() - 10 * hour), tsEnd: new Date(now.getTime() - 9 * hour), thumbnailUrl: '/thumbnails/thumb4.png', cameraId: camera3.id },
  ];

  await prisma.incident.createMany({ data: incidentsData });
  console.log('Seeding finished with original overlapping data.');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });