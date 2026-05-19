import { db } from "./index";
import { projects, projectContributors, projectTags } from "./schema";

export async function seedProjectsBatch4() {
  console.log("Seeding projects batch 4 (CFP 2025 projects)...");

  await db.insert(projects).values([
    {
      id: "proj_iitm_26",
      title: "Resilient Supply Chain Control Under Carbon Emission Constraints",
      shortDesc: "A Model Predictive Control-based framework to optimize material flow in a multi-echelon EV charging supply chain while enforcing carbon emission constraints.",
      detailedInfoMarkdown: `# Resilient Supply Chain Control Under Carbon Emission Constraints

## Overview
This project develops a Model Predictive Control (MPC)-based framework to optimize material flow in a multi-echelon EV charging supply chain while enforcing carbon emission constraints for sustainable logistics operations.

## Objectives
- Develop MPC-based supply chain control framework
- Integrate carbon emission constraints into operational decisions
- Optimize multi-echelon material flow for EV logistics
- Enable resilient operations under supply chain disruptions

## Team
- **PI:** Dr. Anuj Kumar Tiwari
- **Co-PI:** Dr. Rachel K. Kalaimani
`,
      categoryId: "cat_scm",
      progressId: "status_ideation",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_27",
      title: "Autonomous Inventory Handling: Guaranteed Safety and Optimality",
      shortDesc: "A safe and optimal navigation framework for warehouse robots using Control Barrier Functions and optimization-based control for guaranteed collision-free operation.",
      detailedInfoMarkdown: `# Autonomous Inventory Handling: Guaranteed Safety and Optimality

## Overview
This project develops a safe and optimal navigation framework for warehouse robots using Control Barrier Functions (CBFs) and optimization-based control to guarantee collision-free, efficient autonomous operation.

## Objectives
- Develop provably safe robot navigation using CBF-based controllers
- Ensure optimal path planning in cluttered warehouse environments
- Enable real-time obstacle avoidance with formal safety guarantees
- Deploy and validate on physical warehouse robot platforms

## Team
- **PI:** Dr. Arunkumar D. Mahindrakar
`,
      categoryId: "cat_algo",
      progressId: "status_ideation",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_28",
      title: "Scalable RF-Driven Navigation Infrastructure for Cluttered Warehouse Environments",
      shortDesc: "A wireless navigation system using a multimodal digital twin combining RF and visual data for high-accuracy, infrastructure-light indoor positioning in warehouses.",
      detailedInfoMarkdown: `# Scalable RF-Driven Navigation Infrastructure for Cluttered Warehouse Environments

## Overview
This project develops a wireless navigation system using a multimodal digital twin (RF + visual data) to enable high-accuracy, infrastructure-light indoor positioning for autonomous warehouse robots.

## Objectives
- Build RF-based indoor positioning system for warehouse environments
- Develop multimodal digital twin integrating RF and visual data
- Enable scalable, infrastructure-light deployment across warehouse facilities
- Achieve high-accuracy localization without GPS or dense sensor arrays

## Team
- **PI:** Dr. Ayon Chakraborty
- **Co-PI:** Dr. Bharadwaj Satchidanandan
`,
      categoryId: "cat_algo",
      progressId: "status_ideation",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_29",
      title: "Sustainable and Sensor-Driven Routing Optimization for Last-Mile Logistics Using CVRP and IoT",
      shortDesc: "An end-to-end optimization engine for last-mile logistics integrating CVRP-based routing, IoT sensor data, and 3D packing for sustainable delivery operations.",
      detailedInfoMarkdown: `# Sustainable and Sensor-Driven Routing Optimization for Last-Mile Logistics

## Overview
This project develops an end-to-end optimization engine for last-mile logistics, integrating CVRP-based routing, IoT data, and 3D bin packing for sustainable and efficient delivery operations.

## Objectives
- Integrate IoT sensor data into real-time routing decisions
- Combine CVRP routing with 3D packing optimization
- Minimize emissions and cost for last-mile delivery
- Deploy sensor-driven dynamic re-routing capabilities

## Team
- **PI:** Dr. Bharath Bhikkaji
`,
      categoryId: "cat_algo",
      progressId: "status_ideation",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_30",
      title: "EmotionSync: Customer Emotion & Satisfaction Tracker for Logistics Services",
      shortDesc: "A real-time emotion intelligence platform analyzing customer feedback across channels to detect sentiment, dissatisfaction triggers, and service quality gaps.",
      detailedInfoMarkdown: `# EmotionSync: Customer Emotion & Satisfaction Tracker for Logistics Services

## Overview
This project develops a real-time emotion intelligence platform that analyzes customer feedback across channels to detect sentiment patterns, dissatisfaction triggers, and service quality gaps for FedEx.

## Objectives
- Build multi-channel customer feedback analysis pipeline
- Detect real-time emotions and satisfaction levels from unstructured data
- Identify key dissatisfaction triggers in logistics service delivery
- Provide actionable insights for service quality improvement

## Team
- **PI:** Dr. Prathamesh Vivek Kittur
`,
      categoryId: "cat_ai",
      progressId: "status_ideation",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_31",
      title: "Unlocking Digital Futures: Sustainable Transitions in India's Informal Logistics Ecosystem",
      shortDesc: "Exploring how low-cost digital interventions can improve efficiency, coordination, and sustainability in India's informal logistics ecosystem.",
      detailedInfoMarkdown: `# Unlocking Digital Futures: Sustainable Transitions in India's Informal Logistics Ecosystem

## Overview
This project explores how low-cost digital interventions can improve efficiency, coordination, and sustainability in India's informal logistics ecosystem, which forms a critical backbone of last-mile delivery.

## Objectives
- Map and analyze India's informal logistics ecosystem
- Identify key inefficiencies in informal logistics coordination
- Develop and test low-cost digital intervention models
- Measure impact on efficiency, worker welfare, and sustainability

## Team
- **PI:** Dr. Imon Chakraborty
`,
      categoryId: "cat_scm",
      progressId: "status_ideation",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_32",
      title: "Resilient Scheduling for Grid-Aware EV Swarms: AI-Driven Sustainable Last-Mile Logistics",
      shortDesc: "A decentralized, AI-driven EV fleet coordination framework integrating routing, charging schedules, and grid interaction for sustainable last-mile delivery.",
      detailedInfoMarkdown: `# Resilient Scheduling for Grid-Aware EV Swarms

## Overview
This project develops a decentralized, AI-driven EV fleet coordination framework that integrates routing, charging, and grid interaction for sustainable last-mile logistics operations.

## Objectives
- Develop AI-driven coordination for large EV delivery fleets
- Integrate grid-aware charging scheduling with delivery routing
- Enable decentralized, resilient fleet management
- Minimize grid stress while maximizing delivery efficiency

## Team
- **PI:** Dr. K. Shanti Swarup
`,
      categoryId: "cat_ev",
      progressId: "status_ideation",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_33",
      title: "Identity, Affect, and Voice: Worker Well-Being in VR-Simulated Supply Chain Dilemmas",
      shortDesc: "A neurocognitive study using VR simulations to examine how work design, identity, and affect influence logistics worker well-being and decision-making.",
      detailedInfoMarkdown: `# Identity, Affect, and Voice: Worker Well-Being in VR-Simulated Supply Chain Dilemmas

## Overview
This project examines how work design, identity, and affect influence logistics worker well-being, using VR-based simulations to study ethical dilemmas and neurocognitive responses in supply chain contexts.

## Objectives
- Study impact of work design and identity on logistics worker well-being
- Use VR simulations to create realistic supply chain ethical dilemmas
- Measure neurocognitive and affective responses to work pressure
- Develop evidence-based recommendations for humane logistics work design

## Team
- **PI:** Dr. Lata Dayaram
`,
      categoryId: "cat_wellness",
      progressId: "status_ideation",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_34",
      title: "Bio-Inspired Strategies for Multimodal Navigation of Autonomous Warehouse Robots",
      shortDesc: "A decentralized navigation framework inspired by biological systems enabling warehouse robots to navigate dynamically in dense environments without central coordination.",
      detailedInfoMarkdown: `# Bio-Inspired Strategies for Multimodal Navigation of Autonomous Warehouse Robots

## Overview
This project develops a decentralized navigation framework inspired by biological systems, enabling warehouse robots to navigate autonomously in dense, dynamic environments without central coordination.

## Progress
- Developed local sensing and ego-centric navigation policies
- Developed RL-based grid-world testbed to simulate warehouse environments
- Demonstrated emergent strategy switching based on obstacle density
- Validated alignment with percolation theory threshold (~0.59) for navigation breakdown
- Established strong policy generalization from low-density to high-density environments

## Next Steps
- Identify minimal sensor requirements for effective navigation
- Introduce stochasticity to simulate real-world uncertainty
- Extend framework to real warehouse layouts and robot deployment
- Evaluate multi-robot coordination under decentralized control

## Team
- **PI:** Dr. Ganga Prasath S.
`,
      categoryId: "cat_algo",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_35",
      title: "Accelerating Vehicle Routing Using Column Generation and Machine Learning",
      shortDesc: "A hybrid optimization-AI framework solving large-scale VRPTW faster by replacing computational bottlenecks with Graph Neural Networks.",
      detailedInfoMarkdown: `# Accelerating Vehicle Routing Problems Using Column Generation and Machine Learning

## Overview
This project develops a hybrid optimization-AI framework to solve large-scale Vehicle Routing Problems with Time Windows (VRPTW) faster by replacing computational bottlenecks with Graph Neural Networks (GNNs).

## Objectives
- Solve large-scale vehicle routing problems with time window constraints
- Reduce computational time of column generation algorithms
- Integrate machine learning into classical optimization pipelines

## Progress
- Formulated VRPTW as set-partitioning problem using column generation
- Developed Restricted Master Problem (RMP) and pricing subproblem framework
- Designed MILP-based column selection model for optimal route filtering
- Identified column selection as key computational bottleneck in CG pipeline

## Methodology
- Solve VRPTW using column generation (RMP + pricing subproblem)
- Use MILP as expert oracle for selecting high-quality routes
- Generate dataset from CG iterations with route features and labels
- Train GNN to learn column selection policy
- Replace MILP with GNN to create hybrid fast optimization framework

## Team
- **PI:** Dr. Sridharakumar Narasimhan
`,
      categoryId: "cat_algo",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_36",
      title: "Turing Patterns of Misinformation: A Novel Early-Warning System for Fake News",
      shortDesc: "A network-based early-warning system detecting misinformation outbreaks using reaction-diffusion dynamics and complex network theory.",
      detailedInfoMarkdown: `# Turing Patterns of Misinformation: Early-Warning System for Fake News

## Overview
This project develops a network-based early-warning system to detect misinformation by modeling the interaction between fake and true news propagation using principles from reaction-diffusion systems and complex networks.

## Objectives
- Model misinformation spread using network dynamics and pattern formation theory
- Understand interaction between fake (amplifier) and true (inhibitor) information
- Develop early-warning indicators for misinformation outbreaks
- Enable scalable detection across large social networks

## Progress
- Completed literature review on fake news propagation and network dynamics
- Developed conceptual activator-inhibitor model (fake vs true news interaction)
- Collected and curated Twitter datasets (PHEME, Twitter15/16) for analysis
- Initiated analysis of cascade structures, temporal spread, and virality metrics
- Constructed time-dependent adjacency matrices for modeling propagation dynamics

## Team
- **PI:** Dr. Syan Gupta
`,
      categoryId: "cat_ai",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_37",
      title: "Digital Platform-Based Hyperlocal Marketplace for Sustainable Quick Commerce",
      shortDesc: "Evaluating the sustainability of quick commerce and proposing an ONDC-based hyperlocal marketplace model aligning incentives for inclusive last-mile logistics.",
      detailedInfoMarkdown: `# Digital Platform-Based Hyperlocal Marketplace for Sustainable Quick Commerce

## Overview
This project evaluates the sustainability of quick commerce and proposes a hyperlocal, ONDC-based marketplace model to align incentives across customers, firms, and gig workers for scalable and inclusive last-mile logistics.

## Objectives
- Analyze incentives and sustainability challenges in quick commerce ecosystems
- Identify gaps in delivery cost structures and gig worker welfare
- Compare operational dynamics across high-density and low-density markets
- Develop a scalable hyperlocal marketplace model aligned with ONDC

## Progress
- Completed literature review on quick commerce, sustainability, and gig economy dynamics
- Defined stakeholder incentive framework (customers, firms, delivery partners)
- Identified key challenges in cost, delivery expectations, and worker welfare
- Designed conceptual hyperlocal marketplace model for decentralized clusters

## Methodology
- Apply game theory models to analyze stakeholder incentives
- Conduct field visits and empirical data collection across locations
- Build integrated simulation + game-theoretic framework

## Team
- **PI:** Dr. Rahul R. Marathe
`,
      categoryId: "cat_scm",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_38",
      title: "Continuous Health Monitoring of On-the-Job Drivers for FedEx Wellness Program",
      shortDesc: "A real-time driver wellness monitoring framework using physiological wearables and behavioral analytics to detect fatigue and improve fleet safety.",
      detailedInfoMarkdown: `# Continuous Health Monitoring of On-the-Job Drivers

## Overview
This project develops a real-time driver wellness monitoring framework using physiological and behavioral analytics to improve safety, reduce fatigue-related risks, and enhance operational reliability in logistics transportation.

## Objectives
- Develop continuous wellness monitoring framework for on-the-job drivers
- Detect fatigue, stress, distraction, and cognitive overload in real time
- Integrate physiological and behavioral signals into unified driver-risk assessment
- Enable proactive interventions for safer and healthier logistics operations

## Progress
- Defined architecture for multimodal driver wellness monitoring system
- Identified physiological indicators using wearable wristband-based sensing
- Designed in-cabin behavioral monitoring workflow for fatigue and distraction detection
- Established edge-computing framework for privacy-conscious real-time analysis
- Aligned solution with existing safety infrastructure including VEDR and SMS

## Methodology
- Collect physiological data including heart-rate variability using wearable sensors
- Capture behavioral indicators through in-cabin camera monitoring
- Fuse multimodal data streams using signal processing and AI-based analytics
- Process data locally using edge-computing architecture

## Team
- **PI:** Dr. S. Ramakrishnan
`,
      categoryId: "cat_wellness",
      progressId: "status_ideation",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
  ]);

  await db.insert(projectTags).values([
    { projectId: "proj_iitm_26", tagId: "tag_supplychain" },
    { projectId: "proj_iitm_26", tagId: "tag_ev" },
    { projectId: "proj_iitm_26", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_27", tagId: "tag_warehouse" },
    { projectId: "proj_iitm_27", tagId: "tag_safety" },
    { projectId: "proj_iitm_27", tagId: "tag_rl" },
    { projectId: "proj_iitm_28", tagId: "tag_warehouse" },
    { projectId: "proj_iitm_28", tagId: "tag_digital_twin" },
    { projectId: "proj_iitm_29", tagId: "tag_routing" },
    { projectId: "proj_iitm_29", tagId: "tag_lastmile" },
    { projectId: "proj_iitm_29", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_30", tagId: "tag_nlp" },
    { projectId: "proj_iitm_30", tagId: "tag_ai" },
    { projectId: "proj_iitm_31", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_31", tagId: "tag_logistics" },
    { projectId: "proj_iitm_32", tagId: "tag_ev" },
    { projectId: "proj_iitm_32", tagId: "tag_optimization" },
    { projectId: "proj_iitm_32", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_33", tagId: "tag_wellbeing" },
    { projectId: "proj_iitm_33", tagId: "tag_safety" },
    { projectId: "proj_iitm_34", tagId: "tag_rl" },
    { projectId: "proj_iitm_34", tagId: "tag_warehouse" },
    { projectId: "proj_iitm_35", tagId: "tag_routing" },
    { projectId: "proj_iitm_35", tagId: "tag_ml" },
    { projectId: "proj_iitm_35", tagId: "tag_optimization" },
    { projectId: "proj_iitm_36", tagId: "tag_nlp" },
    { projectId: "proj_iitm_36", tagId: "tag_ai" },
    { projectId: "proj_iitm_37", tagId: "tag_lastmile" },
    { projectId: "proj_iitm_37", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_38", tagId: "tag_safety" },
    { projectId: "proj_iitm_38", tagId: "tag_wellbeing" },
  ]);

  await db.insert(projectContributors).values([
    { projectId: "proj_iitm_26", personId: "person_anuj", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_26", personId: "person_rachel", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_27", personId: "person_arunkumar", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_28", personId: "person_ayon", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_28", personId: "person_bharadwaj", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_29", personId: "person_bharath", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_30", personId: "person_prathamesh", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_31", personId: "person_imon", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_32", personId: "person_shanti", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_33", personId: "person_lata", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_34", personId: "person_ganga", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_35", personId: "person_sridharakumar", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_36", personId: "person_syan", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_37", personId: "person_rahul_m", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_38", personId: "person_ramakrishnan", associationTypeId: "assoc_lead" },
  ]);

  console.log("Projects batch 4 seeded.");
}
