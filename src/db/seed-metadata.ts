import { db } from "./index";
import { users, categories, progressStatuses, tags, associationTypes } from "./schema";
import * as bcrypt from "bcryptjs";

export async function seedMetadata() {
  console.log("Seeding metadata...");

  await db.insert(associationTypes).values([
    { id: "assoc_lead", name: "Lead Professor" },
    { id: "assoc_copi", name: "Co-Principal Investigator" },
    { id: "assoc_researcher", name: "Researcher" },
    { id: "assoc_phd", name: "PhD Student" },
    { id: "assoc_mtech", name: "MTech Student" },
    { id: "assoc_btech", name: "BTech Student" },
    { id: "assoc_postdoc", name: "Post Doctoral Researcher" },
  ]);

  await db.insert(categories).values([
    { id: "cat_scm", name: "Supply Chain & Modelling" },
    { id: "cat_infra", name: "Logistics Infrastructure" },
    { id: "cat_wellness", name: "Worker & Driver Wellness" },
    { id: "cat_algo", name: "Algorithms & ML" },
    { id: "cat_ev", name: "Electric Vehicles" },
    { id: "cat_drone", name: "Drone & Autonomous Delivery" },
    { id: "cat_ai", name: "AI & Data Intelligence" },
  ]);

  await db.insert(progressStatuses).values([
    { id: "status_ideation", statusName: "Ideation" },
    { id: "status_inprogress", statusName: "In Progress" },
    { id: "status_completed", statusName: "Completed" },
    { id: "status_onhold", statusName: "On Hold" },
  ]);

  await db.insert(tags).values([
    { id: "tag_ai", name: "AI" },
    { id: "tag_ml", name: "Machine Learning" },
    { id: "tag_rl", name: "Reinforcement Learning" },
    { id: "tag_nlp", name: "NLP" },
    { id: "tag_optimization", name: "Optimization" },
    { id: "tag_forecasting", name: "Forecasting" },
    { id: "tag_routing", name: "Vehicle Routing" },
    { id: "tag_drone", name: "Drone Delivery" },
    { id: "tag_ev", name: "Electric Vehicles" },
    { id: "tag_sustainability", name: "Sustainability" },
    { id: "tag_warehouse", name: "Warehouse" },
    { id: "tag_lastmile", name: "Last Mile" },
    { id: "tag_safety", name: "Safety" },
    { id: "tag_quantum", name: "Quantum Computing" },
    { id: "tag_supplychain", name: "Supply Chain" },
    { id: "tag_digital_twin", name: "Digital Twin" },
    { id: "tag_llm", name: "LLM" },
    { id: "tag_computer_vision", name: "Computer Vision" },
    { id: "tag_logistics", name: "Logistics" },
    { id: "tag_wellbeing", name: "Employee Wellbeing" },
  ]);

  const hash = await bcrypt.hash("password123", 10);
  await db.insert(users).values([
    { id: "user_admin", name: "Admin User", email: "admin@fedex.com", passwordHash: hash, role: "admin", affiliation: "fedex" },
    { id: "user_manager_iitb", name: "IITB Manager", email: "manager@iitb.ac.in", passwordHash: hash, role: "manager", affiliation: "iitb" },
    { id: "user_manager_iitm", name: "IITM Manager", email: "manager@iitm.ac.in", passwordHash: hash, role: "manager", affiliation: "iitm" },
  ]);

  console.log("Metadata seeded.");
}
