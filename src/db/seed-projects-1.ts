import { db } from "./index";
import { projects, projectContributors, projectTags } from "./schema";

export async function seedProjectsBatch1() {
  console.log("Seeding projects batch 1 (SCM & Forecasting)...");

  await db.insert(projects).values([
    {
      id: "proj_iitm_01",
      title: "Customer Voice Analysis – Comparative Analysis of FedEx Customer Emails",
      shortDesc: "Automating customer email labelling and topic modelling using HDBSCAN clustering and VAE anomaly detection to reduce misclassification and improve satisfaction.",
      detailedInfoMarkdown: `# Customer Voice Analysis

## Overview
This project focuses on automating real-time topic modelling of FedEx customer emails using Large Language Models (LLMs) and clustering techniques. It extracts key insights like sentiment, topics, and named entities from streaming email data.

## The Challenge
- **Problem:** Inefficient labelling system and lost latent topics lead to low customer satisfaction.
- **Gap:** Manual human labelling leads to potential misclassification and data loss.
- **Goal:** Automate the entire labelling process using AI and ML techniques for clean, fast classification.

## Proposed Solution
1. **Data Preprocessing** — Raw input data is cleaned and embeddings are created for semantic analysis.
2. **Cluster Analysis** — HDBSCAN finds dense regions, grouping similar sentences together.
3. **Anomaly Detection** — VAE identifies uncommonly occurring data that could indicate misclassification.
4. **Results** — Cluster Purity, Visualization, and misclassification reports are generated.

## Results
Results show customer complaint narratives with high reconstruction error and HDBSCAN clustering identifying high-density zones of similar complaints.

## Team
- **PI:** Dr. Nargis Pervin
- **Researchers:** Aditi Deo Singh, Utsav Bhardwaj, Alan Alex Mathew
`,
      categoryId: "cat_ai",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_02",
      title: "Demand Forecasting and Capacity Planning for International Shipping",
      shortDesc: "A granular demand forecasting model for FedEx international shipping using advanced feature engineering and ML models to align predicted shipments with actual demand.",
      detailedInfoMarkdown: `# Demand Forecasting and Capacity Planning

## Overview
This project develops a granular demand model to flawlessly align predicted shipments across FedEx's international shipping operations, addressing the inefficiencies of relying solely on calendar-based features.

## The Challenge
- **Problem:** Inefficient forecasting forces a choice between underutilized capacity or exorbitant last-minute booking costs.
- **Gap:** Relying solely on Month, Week of Year, and Quarter cannot capture sudden geopolitical shocks, localized operational cycles, or complex seasonal fluctuations.
- **Goal:** A granular demand model to flawlessly align predicted shipments.

## Proposed Solution
1. **Data Processing** — Raw data is cleaned and processed.
2. **Feature Generation** — Extensive feature engineering transforms raw shipment demand data into meaningful predictive inputs.
3. **Feature Selection** — SHAP filter ranks features by average absolute importance to reduce noise.
4. **Prediction** — Selected features are passed to ML models for demand prediction.

## Results
Aggregated metrics show significant improvement over baseline:
- Average RMSE reduced from 1462.25 (no features) to 926.72 (with feature set)
- MAPE of 4.37% with engineered features vs 3.40% baseline

## Team
- **PIs:** Dr. C. Rajendran, Dr. Arshinder Kaur
- **Researchers:** Vettri Velavan J. (PhD), Sriram S., Srinivasan R.
`,
      categoryId: "cat_scm",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_03",
      title: "Deep Clustering-Driven Routing for Large-Scale Last-Mile Delivery",
      shortDesc: "A novel RPS-DCR algorithm combining radial-polar segmentation and deep autoencoder clustering to optimize last-mile routing at 50,000+ node scale.",
      detailedInfoMarkdown: `# Deep Clustering-Driven Routing for Large-Scale Last-Mile Delivery

## Overview
Modern e-commerce demands exact delivery times and simultaneous reverse logistics at unprecedented scale. Traditional algorithms fail or require exponential computational time beyond a few thousand nodes. This project targets 50,000+ node optimization.

## The Challenge
- **Problem:** Traditional algorithms fail at scale with combined time-window and reverse logistics constraints.
- **Goal:** Minimize total travel distance without violating strict time windows or truck capacities at 50,000+ nodes.

## Methodology (RPS-DCR)
1. **Radial-Polar Segmentation** — Divides the massive map into concentric rings and angular slices.
2. **Deep Capacitated Clustering** — Trains a deep autoencoder on spatial, demand, and time-window features to ensure clustered groups never exceed vehicle capacity.
3. **Route & Refine Heuristics** — Applies Greedy TSP-TW algorithm with intra- and inter-cluster swaps to finalize feasible paths.

## Results
Validated on a real-world dataset (Trichy district, TN), scaling from 10k to 50k nodes:
- **9–11% reduction** in total travel distance vs SA-VLSN benchmark
- **35–45% reduction** in computational time

## Team
- **PIs:** Dr. C. Rajendran, Dr. Arshinder Kaur, Dr. Vaidhyanathan T.
- **Researcher:** Vettri Velavan J. (PhD)
`,
      categoryId: "cat_algo",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_04",
      title: "Optimized Infrastructure Placement for Urban Air Taxi Systems",
      shortDesc: "A scalable multi-echelon MILP optimization framework for automated air taxi infrastructure placement ensuring full city coverage across a 4-level hierarchy.",
      detailedInfoMarkdown: `# Optimized Infrastructure Placement for Urban Air Taxi Systems

## Overview
Urban congestion continues to erode productivity and quality of life. While Urban Air Mobility (UAM) offers a promising alternative, most existing approaches focus on aircraft development rather than the critical infrastructure ecosystem.

## The Challenge
- Current research is limited by single-layer facility placement models.
- Over-reliance on basic clustering techniques.
- Absence of multi-echelon coordination across infrastructure levels.
- Weak integration of real-world constraints like connectivity and traffic intensity.
rator that runs them all i
## Solution Approach
**Multi-Echelon Optimization Framework (MILP + Clustering)**
- **Network Design:** 4-Level Hierarchy — Customer → Vertistop → Vertiport → Central Terminal
- **Optimization Model (MILP):** Minimize distance + improve coverage with capacity, connectivity, exclusivity constraints.
- **Scenario Testing:** Applied on Bangalore & Singapore with sensitivity analysis.

## Key Results
- Distance-only model → localized efficiency
- Balanced model → better hub distribution
- Increased flexibility → higher coverage and redundancy

## Team
- **PI:** Dr. C. Rajendran
- **Students:** Rama Anirudh, Rohit Batra, Vettri Velavan
`,
      categoryId: "cat_infra",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_05",
      title: "Multi-Echelon Network Distribution for Drone-Based Parcel Delivery",
      shortDesc: "A hierarchical MILP optimization framework for drone-based last-mile delivery, addressing payload constraints and structured demand allocation across distribution layers.",
      detailedInfoMarkdown: `# Multi-Echelon Network Distribution for Drone-Based Parcel Delivery

## Overview
Last-mile delivery accounts for the highest logistics cost. Existing drone systems are route-focused, not network-focused, and are limited by payload and battery constraints with no structured way to allocate demand across distribution layers.

## The Challenge
- Rising e-commerce demand → faster delivery expectations
- Existing solutions lack a hierarchical multi-echelon network perspective
- Payload and battery constraints must be incorporated into network design

## Solution Approach
**Hierarchical Multi-Echelon Optimization Framework (MILP)**
- Multi-layer network design incorporating drone hub placement
- Demand allocation across distribution tiers
- Payload, battery, and operational constraint integration

## Team
- **PI:** Dr. C. Rajendran
- **Students:** Neythra Jayaprakash, Kovvali Sahithi, Vettri Velavan
`,
      categoryId: "cat_drone",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_06",
      title: "Making India a Global Transshipment Hub",
      shortDesc: "Strategic analysis and optimization framework to position India as a global air cargo transshipment hub by leveraging geographic advantages and logistics infrastructure.",
      detailedInfoMarkdown: `# Making India a Global Transshipment Hub

## Overview
This project studies the feasibility and strategic roadmap for positioning India as a major global air cargo transshipment hub, comparable to Dubai and Singapore.

## Objectives
- Analyze India's geographic and infrastructure advantages for transshipment
- Identify regulatory, operational, and policy gaps
- Develop a data-driven optimization framework for hub network design
- Provide actionable recommendations for FedEx and policymakers

## Team
- **PIs:** Dr. Arshinder Kaur, Dr. Gitakrishnan Ramadurai, Dr. Satya Chakravarthy
- **Researchers:** Adnan Pasha (PhD), Preethi (Masters), Deepthi (Masters), Kelitha (PhD)
`,
      categoryId: "cat_scm",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_07",
      title: "Optimizing Air Cargo Capacity Using ULD Assignment and 3D Parcel Packing",
      shortDesc: "A hybrid MILP and 3D bin-packing model to maximize aircraft cargo space utilization by optimizing Unit Load Device assignment and 3D package placement.",
      detailedInfoMarkdown: `# Optimizing Air Cargo Capacity Using ULD Assignment and 3D Parcel Packing

## Overview
Air cargo operations rely on efficient use of Unit Load Devices (ULDs) and aircraft constraints. Inefficient packing leads to underutilized capacity and increased operational costs. This project optimizes ULD assignment and 3D package placement.

## Objectives
- Maximize aircraft cargo space utilization while reducing the number of ULDs used
- Develop a hybrid model for package-to-ULD assignment and 3D spatial placement
- Ensure compliance with weight, volume, and aircraft-specific loading constraints

## Progress
- Completed MILP formulation for ULD load planning and aircraft assignment
- Implemented end-to-end optimization workflow using Pyomo and CPLEX
- Validated feasibility on B777F test instances including CG compliance checks
- **Achieved optimal solutions within sub-30 second solve times**

## Methodology
- Integrated 3D bin-packing heuristics with aircraft–ULD assignment optimization
- Incorporated compatibility, deck, route, and destination grouping constraints
- Embedded longitudinal and lateral center-of-gravity feasibility validation
- Extended formulation to multi-aircraft and multi-destination loading scenarios

## Next Steps
- Complete validation using FedEx operational instances
- Integrate ULD packing and aircraft load-planning into a unified framework

## Team
- **PIs:** Dr. Arshinder Kaur, Dr. Akash Kale
`,
      categoryId: "cat_algo",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_08",
      title: "Customizable Granularity in Demand & Capacity Planning Models",
      shortDesc: "A scalable forecasting architecture with lane-level granularity for international freight, using ACF-based analysis and classical/ML ensemble methods.",
      detailedInfoMarkdown: `# Customizable Granularity in Demand & Capacity Planning Models

## Overview
Demand forecasting is a critical enabler of precise resource allocation and proactive capacity planning across priority layers in international freight operations. This project builds a scalable forecasting architecture that adapts granularity based on lane-level requirements.

## Objectives
- Build a scalable forecasting architecture that adapts granularity based on lane-level business requirements
- Enhance demand prediction accuracy across O-D lanes
- Enable informed decision-making through interpretable outputs integrated into business workflows

## Progress
- Segmented 20 unique Origin–Destination lanes with detailed statistical profiling
- Performed log transformations and lane-wise analysis to stabilize variance
- Completed visual exploration of seasonality, stability, and volatility patterns
- Implemented ACF-based granularity assessment to determine appropriate aggregation levels

## Next Steps
- Meeting with FedEx Vikas team to present findings
- Integrate forecasting outputs into Power BI for dynamic visualization

## Team
- **PI:** Dr. Arshinder Kaur
- **Researcher:** Omkar Nishad (Masters)
`,
      categoryId: "cat_scm",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_09",
      title: "A Comprehensive Assessment of Emerging Logistics and Supply Chain Startups in India",
      shortDesc: "A structured analytical framework to identify, classify, evaluate, and benchmark 2000+ Indian logistics startups using SBERT embeddings, funding analysis, and competitive intelligence.",
      detailedInfoMarkdown: `# A Comprehensive Assessment of Emerging Logistics and Supply Chain Startups in India

## Overview
This project develops a structured analytical framework to identify, classify, evaluate, and benchmark emerging logistics and supply chain startups in India, combining ecosystem mapping, startup intelligence, funding analysis, and strategic evaluation.

## Objectives
- Define a structured framework for identifying emerging logistics startups in India
- Classify startups across logistics sub-verticals (SaaS, EV, warehousing, cold chain, cross-border)
- Develop a standardized startup database integrating multiple public and private data sources
- Evaluate startups using funding, market potential, scalability, traction, and innovation indicators

## Progress
- Expanded startup database to **2,000+ logistics and supply chain startups** across India
- Finalized nine-segment logistics taxonomy
- Developed automated startup classification using SBERT embedding and cosine-similarity
- Shortlisted **40–60 high-potential startups** using multi-criteria screening framework
- Identified top performers: I-Line.ai, Haulog, Lamrod Telematics, DRRUTA Logistics, Krish Cold Chain
- Completed competitive benchmarking using SWOT and Porter's Five Forces

## Next Steps
- Finalize startup ranking and benchmarking framework
- Refine sector attractiveness and investment analysis

## Team
- **PIs:** Dr. Arshinder Kaur
- **Researcher:** Shubham Gupta (Masters)
`,
      categoryId: "cat_scm",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_10",
      title: "Optimal Shipment Allocation Between Purple Tail and Commercial Services",
      shortDesc: "A reinforcement learning-based system to dynamically rank and allocate shipments between FedEx's own fleet and commercial carriers to maximize profit.",
      detailedInfoMarkdown: `# Optimal Shipment Allocation Between Purple Tail and Commercial Services

## Overview
FedEx faces challenges in maximizing profit due to unpredictable shipment demand and limited logistics capacity. This project develops a data-driven system to intelligently prioritize and allocate shipments between FedEx's own fleet (Purple Tail) and commercial services.

## Objectives
- Develop an RL-based system to dynamically rank shipments by customer value and urgency
- Design an optimal shipment allocation strategy that maximizes profit
- Build a network revenue management framework for stochastic air cargo environments

## Methodology
1. **Data Collection & Preprocessing** — Historical data including shipment size, destination, urgency, and customer profitability
2. **RL Model Development** — Train an RL agent to assign value scores to shipments based on expected profit and urgency
3. **Dynamic Optimization** — RL agent recommends shipment allocation strategies under resource constraints
4. **Continuous Learning** — System improves decisions over time based on historical outcomes

## Team
- **PIs:** Dr. Vipin B., Dr. Arshinder Kaur
- **Researcher:** Anish (BTech)
`,
      categoryId: "cat_algo",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
  ]);

  // ── Tags ─────────────────────────────────────────────────────
  await db.insert(projectTags).values([
    { projectId: "proj_iitm_01", tagId: "tag_nlp" },
    { projectId: "proj_iitm_01", tagId: "tag_ai" },
    { projectId: "proj_iitm_01", tagId: "tag_llm" },
    { projectId: "proj_iitm_02", tagId: "tag_forecasting" },
    { projectId: "proj_iitm_02", tagId: "tag_ml" },
    { projectId: "proj_iitm_02", tagId: "tag_supplychain" },
    { projectId: "proj_iitm_03", tagId: "tag_routing" },
    { projectId: "proj_iitm_03", tagId: "tag_ml" },
    { projectId: "proj_iitm_03", tagId: "tag_lastmile" },
    { projectId: "proj_iitm_04", tagId: "tag_optimization" },
    { projectId: "proj_iitm_04", tagId: "tag_logistics" },
    { projectId: "proj_iitm_05", tagId: "tag_drone" },
    { projectId: "proj_iitm_05", tagId: "tag_lastmile" },
    { projectId: "proj_iitm_06", tagId: "tag_supplychain" },
    { projectId: "proj_iitm_06", tagId: "tag_logistics" },
    { projectId: "proj_iitm_07", tagId: "tag_optimization" },
    { projectId: "proj_iitm_07", tagId: "tag_logistics" },
    { projectId: "proj_iitm_08", tagId: "tag_forecasting" },
    { projectId: "proj_iitm_08", tagId: "tag_supplychain" },
    { projectId: "proj_iitm_09", tagId: "tag_logistics" },
    { projectId: "proj_iitm_09", tagId: "tag_ai" },
    { projectId: "proj_iitm_10", tagId: "tag_rl" },
    { projectId: "proj_iitm_10", tagId: "tag_optimization" },
  ]);

  // ── Contributors ─────────────────────────────────────────────
  await db.insert(projectContributors).values([
    { projectId: "proj_iitm_01", personId: "person_nargis", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_01", personId: "person_alan", associationTypeId: "assoc_btech" },
    { projectId: "proj_iitm_01", personId: "person_aditi", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_01", personId: "person_utsav", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_02", personId: "person_rajendran", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_02", personId: "person_arshinder", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_02", personId: "person_vettri", associationTypeId: "assoc_phd" },
    { projectId: "proj_iitm_03", personId: "person_rajendran", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_03", personId: "person_arshinder", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_03", personId: "person_vettri", associationTypeId: "assoc_phd" },
    { projectId: "proj_iitm_04", personId: "person_rajendran", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_04", personId: "person_aniruddh", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_04", personId: "person_rohit", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_05", personId: "person_rajendran", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_05", personId: "person_neythra", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_05", personId: "person_sahithi", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_06", personId: "person_arshinder", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_06", personId: "person_gitakrishnan", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_06", personId: "person_satya", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_06", personId: "person_adnan", associationTypeId: "assoc_phd" },
    { projectId: "proj_iitm_07", personId: "person_arshinder", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_07", personId: "person_akash", associationTypeId: "assoc_phd" },
    { projectId: "proj_iitm_08", personId: "person_arshinder", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_08", personId: "person_omkar", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_09", personId: "person_arshinder", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_09", personId: "person_shubham", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_10", personId: "person_vipin", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_10", personId: "person_arshinder", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_10", personId: "person_anish_btech", associationTypeId: "assoc_btech" },
  ]);

  console.log("Projects batch 1 seeded.");
}
