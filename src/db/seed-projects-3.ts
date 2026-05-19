import { db } from "./index";
import { projects, projectContributors, projectTags } from "./schema";

export async function seedProjectsBatch3() {
  console.log("Seeding projects batch 3 (Infrastructure & Drone Delivery)...");

  await db.insert(projects).values([
    {
      id: "proj_iitm_19",
      title: "Feasibility of Drone Delivery in India",
      shortDesc: "Evaluating the feasibility and unit economics of drone-based logistics in India, including corridor mapping, regulatory analysis, and real-world pilot trials in Bengaluru.",
      detailedInfoMarkdown: `# Feasibility of Drone Delivery in India

## Overview
India's logistics sector demands faster, greener, and more cost-effective last-mile solutions. This project evaluates the feasibility of drone-based logistics using industry partner assets to pilot real-world delivery scenarios.

## Milestone: India's First Intra-City Drone Delivery (March 26, 2026)
- Route: Electronic City Phase II → new FedEx hub near Kempegowda International Airport
- 53 km road journey normally takes over 60 minutes
- **Successfully reduced one-way transit time to ~21 minutes using ATVA-1 drone**
- Implementation partner: Amber Wings
- Joint press release issued by FedEx & IITM

## Objectives
- Assess feasibility of drone-based deliveries in India
- Identify regulatory, operational, and infrastructure challenges
- Map viable drone delivery corridors in urban areas
- Develop a unit economics and delivery viability framework

## Progress
- Completed corridor-level feasibility and unit economics for Bangalore
- Strengthened hotspot identification using residential and commercial demand mixes
- Extended stakeholder engagement for permissions and regulatory pathway validation
- Established SOP and scale-up recommendations foundation

## Team
- **PI:** Dr. Satya Chakravarthy
- **Researcher:** Varun Mathivadan (MTech)
`,
      categoryId: "cat_drone",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_20",
      title: "Development of Integration-Ready Modules for Autonomous Advanced Delivery Vehicles",
      shortDesc: "Developing interoperable modules enabling end-to-end orchestration, data sharing, and fleet management for autonomous drone and rover delivery systems.",
      detailedInfoMarkdown: `# Development of Integration-Ready Modules for Autonomous Advanced Delivery Vehicles

## Overview
Autonomous delivery vehicles like drones and rovers offer significant potential to streamline last-mile logistics. However, fragmented systems hinder seamless integration. This project develops interoperable modules for end-to-end orchestration across multi-modal transport networks.

## Objectives
- Develop standardized interfaces for autonomous delivery vehicle integration
- Enable data sharing across logistics operators, technology providers, and regulators
- Build fleet management modules for multi-modal autonomous networks
- Accelerate adoption of advanced delivery systems

## Team
- **PI:** Dr. Satya Chakravarthy
- **Researchers:** Abirami S. (Masters), Varun Mathivadan (MTech)
`,
      categoryId: "cat_drone",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_21",
      title: "AMP-LOGIC: Advanced Mobility Planning for Logistics & EV Charging",
      shortDesc: "A data-driven framework for optimal EV charging network placement and fleet size optimization for last-mile logistics operations.",
      detailedInfoMarkdown: `# AMP-LOGIC: Advanced Mobility Planning for Logistics & Charging

## Overview
This project develops a comprehensive framework for planning EV charging infrastructure and fleet sizing to support sustainable last-mile logistics operations.

## Objectives
- Optimize placement of EV charging stations for logistics fleets
- Determine optimal EV fleet size under operational constraints
- Integrate charging schedules with delivery routing
- Minimize total cost of ownership for EV-based last-mile logistics

## Team
- **PI:** Dr. Gitakrishnan Ramadurai
- **Researcher:** Samrudh R. (MTech)
`,
      categoryId: "cat_ev",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_22",
      title: "Sustainable and Resilient Last-Mile Distribution: A Holistic System Design Framework",
      shortDesc: "A holistic decision-support framework integrating demand behavior models, continuous-approximation methods, and sustainability trade-off analysis for last-mile delivery.",
      detailedInfoMarkdown: `# Sustainable and Resilient Last-Mile Distribution

## Overview
This project evaluates the sustainability of last-mile delivery systems and proposes a holistic framework integrating demand modelling, route optimization, and multi-modal alternatives including EVs, drones, and cargo cycles.

## Objectives
- Develop demand generators from behavioral and frequency models for regional forecasting
- Integrate demand and supply modules into a decision-support prototype tool
- Extend framework for EVs, drones, and cargo cycle alternatives
- Run policy and operator scenarios for sustainability and resilience benchmarking

## Progress
- Analyzed demand patterns across in-store and online channels using ITUS data
- Compared pre- and post-COVID shopping behavior (2019 vs 2024)
- Developed continuous-approximation models for single- and multi-echelon systems
- Completed multi-scenario sustainability trade-off analysis covering cost, VMT, emissions, and labor sensitivity

## Team
- **PI:** Dr. Anmol Pahwa
- **Researcher:** Blessy (PhD)
`,
      categoryId: "cat_infra",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_23",
      title: "Optimization of 3D Bin Packing Using Deep Reinforcement Learning and Heuristic Algorithms",
      shortDesc: "Improving logistics packing efficiency using deep reinforcement learning integrated with robotic pick-and-place systems for real-world 3D bin packing.",
      detailedInfoMarkdown: `# Optimization of 3D Bin Packing Using Deep Reinforcement Learning

## Overview
Efficiently packing items into limited-capacity containers is a key logistics challenge. Traditional heuristics often fall short in complex 3D scenarios. This project combines deep RL with robotic execution for smarter, scalable logistics packing.

## Objectives
- Explore 2D and 3D bin packing strategies for logistics optimization
- Implement and assess deep reinforcement learning methods for 3D bin packing
- Integrate packing logic with robotic pick-and-place systems

## Progress
- Integrated heuristic 3D packing logic with robotic pick-and-place execution workflows
- Built ChArUco-based calibration and board-verification pipeline for eye-in-hand alignment
- Developed generalized object-aware Z-placement heuristics for stacked non-convex objects
- Validated multi-object placements with improved release safety

## Team
- **PIs:** Dr. Chandrashekar L., Dr. Datta Prasad
`,
      categoryId: "cat_algo",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_24",
      title: "Quantum Algorithms for Logistics Optimization",
      shortDesc: "Exploring quantum and hybrid quantum-classical algorithms for demand forecasting, dynamic route optimization, and 3D bin packing at FedEx.",
      detailedInfoMarkdown: `# Quantum Algorithms for Logistics Optimization

## Overview
This project explores quantum and hybrid quantum-classical algorithms to address key logistics challenges at FedEx, including demand forecasting, dynamic route optimization, and 3D bin packing.

## Objectives
- Improve demand forecasting accuracy using dual error metrics (MAE & MAPE)
- Design a dynamic routing system using real-time traffic, weather, and emissions data
- Develop hybrid quantum-classical algorithms for 3D bin packing and routing
- Benchmark quantum and hybrid solutions against classical approaches

## Progress
- Designed a dual-metric forecasting framework for varying time horizons
- Implemented Python-based dynamic route planner with emissions estimation
- Defined QUBO formulations for packing and routing with auxiliary variables
- Set up benchmarking pipeline for quantum vs classical performance
- Integrated Python APIs (TomTom, Google Maps, AQICN, OSRM) for real-time routing

## Team
- **PIs:** Dr. Anil Prabhakar, Dr. Rahul M.
- **Researcher:** Hrushikesh
`,
      categoryId: "cat_algo",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_25",
      title: "Scalable Solutions to CVRP Problems Using Parallelization",
      shortDesc: "Utilizing GPU-based parallelism to improve scalability of Capacitated Vehicle Routing Problems to million-scale instances, achieving strong performance vs accuracy tradeoffs.",
      detailedInfoMarkdown: `# Scalable Solutions to CVRP Problems Using Parallelization

## Overview
The total execution time of CVRP continues to be practically high, with existing solutions not scaling beyond a few thousand customers. This project uses parallelism to dramatically improve CVRP scalability.

## Objectives
- Analyze bottlenecks in state-of-the-art parallel CVRP solutions
- Propose solutions reducing time and memory bottlenecks
- Evaluate new solutions on million-scale inputs
- Ensure high accuracy is maintained

## Methodology
- Implemented CVRP on GPU, optimized for parallelism and throughput for million-scale instances
- Also implemented CVRP with time-windows on CPU and GPU for million-scale instances
- Exploits cone-based clustering to ensure nearby customers are grouped
- Built upon minimum-spanning tree to ensure short distances
- Uses Clarke-and-Wright algorithm to improve overall gap

## Progress
- Implemented and validated million-scale CVRP on GPU
- Demonstrated performance vs gap tradeoff against state-of-the-art
- Patent and publication in progress

## Team
- **PIs:** Dr. Rupesh Nasre, Dr. Narayanaswamy
- **Researchers:** Sneh Patel, Dinesh Kumar
`,
      categoryId: "cat_algo",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
  ]);

  await db.insert(projectTags).values([
    { projectId: "proj_iitm_19", tagId: "tag_drone" },
    { projectId: "proj_iitm_19", tagId: "tag_lastmile" },
    { projectId: "proj_iitm_19", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_20", tagId: "tag_drone" },
    { projectId: "proj_iitm_20", tagId: "tag_logistics" },
    { projectId: "proj_iitm_21", tagId: "tag_ev" },
    { projectId: "proj_iitm_21", tagId: "tag_optimization" },
    { projectId: "proj_iitm_21", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_22", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_22", tagId: "tag_lastmile" },
    { projectId: "proj_iitm_23", tagId: "tag_rl" },
    { projectId: "proj_iitm_23", tagId: "tag_optimization" },
    { projectId: "proj_iitm_23", tagId: "tag_warehouse" },
    { projectId: "proj_iitm_24", tagId: "tag_quantum" },
    { projectId: "proj_iitm_24", tagId: "tag_optimization" },
    { projectId: "proj_iitm_24", tagId: "tag_ml" },
    { projectId: "proj_iitm_25", tagId: "tag_routing" },
    { projectId: "proj_iitm_25", tagId: "tag_optimization" },
    { projectId: "proj_iitm_25", tagId: "tag_logistics" },
  ]);

  await db.insert(projectContributors).values([
    { projectId: "proj_iitm_19", personId: "person_satya", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_19", personId: "person_varun", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_20", personId: "person_satya", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_20", personId: "person_abirami", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_20", personId: "person_varun", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_21", personId: "person_gitakrishnan", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_21", personId: "person_samrudh", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_22", personId: "person_anmol", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_22", personId: "person_blessy", associationTypeId: "assoc_phd" },
    { projectId: "proj_iitm_23", personId: "person_chandrashekar", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_23", personId: "person_datta", associationTypeId: "assoc_researcher" },
    { projectId: "proj_iitm_24", personId: "person_anil", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_24", personId: "person_rahul_m", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_24", personId: "person_hrushikesh", associationTypeId: "assoc_researcher" },
    { projectId: "proj_iitm_25", personId: "person_rupesh", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_25", personId: "person_sneh", associationTypeId: "assoc_researcher" },
  ]);

  console.log("Projects batch 3 seeded.");
}
