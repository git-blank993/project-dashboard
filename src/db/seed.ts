import { db } from "./index";
import {
  users, people, categories, progressStatuses,
  tags, projectTags, projects, projectContributors, associationTypes,
} from "./schema";
import { seedMetadata } from "./seed-metadata";
import { seedPeople } from "./seed-people";
import { seedProjectsBatch1 } from "./seed-projects-1";
import { seedProjectsBatch2 } from "./seed-projects-2";
import { seedProjectsBatch3 } from "./seed-projects-3";
import { seedProjectsBatch4 } from "./seed-projects-4";

async function seed() {
  console.log("Starting full database seed...\n");

  // Clear all tables in dependency order
  console.log("Clearing existing data...");
  await db.delete(projectContributors);
  await db.delete(projectTags);
  await db.delete(projects);
  await db.delete(users);
  await db.delete(people);
  await db.delete(tags);
  await db.delete(categories);
  await db.delete(progressStatuses);
  await db.delete(associationTypes);

  await seedMetadata();
  await seedPeople();
  await seedProjectsBatch1();
  await seedProjectsBatch2();
  await seedProjectsBatch3();
  await seedProjectsBatch4();

  console.log("\n✓ Database seeded successfully!");
  console.log("  38 IITM FedEx Smart Center projects seeded.");
  console.log("  Login: admin@fedex.com / password123");
  console.log("  Login: manager@iitm.ac.in / password123");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
