import { db } from "./index";
import { projects, projectContributors, projectTags } from "./schema";

export async function seedProjectsBatch2() {
  console.log("Seeding projects batch 2 (Worker Wellness & AI Intelligence)...");

  await db.insert(projects).values([
    {
      id: "proj_iitm_11",
      title: "Employee Wellness – Holistic Worker Monitoring Framework",
      shortDesc: "A multi-modal system monitoring warehouse worker wellness through ergonomic risk assessment, fatigue detection, and wearable sensors.",
      detailedInfoMarkdown: `# Employee Wellness – Holistic Worker Monitoring Framework

## Overview
This project develops a holistic employee wellness monitoring framework for FedEx warehouse and logistics workers, combining wearable sensors, computer vision, and ergonomic analysis.

## Objectives
- Monitor physical and cognitive health of logistics workers in real time
- Detect fatigue, ergonomic risks, and signs of overexertion
- Provide proactive wellness interventions to reduce injury rates

## Progress
- Designed multi-modal monitoring architecture combining wearables and CV
- Identified key physiological and behavioral wellness indicators
- Developed dashboard for real-time worker health insights

## Team
- **PIs:** Dr. Usha Mohan, Dr. Vaibhav, Dr. Arshinder Kaur
- **Researchers:** Deepthi Ramesh (Masters), Abinav (Masters)
`,
      categoryId: "cat_wellness",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_12",
      title: "Social Life Cycle Assessment of the Logistics Industry",
      shortDesc: "A comprehensive social LCA framework to evaluate the social sustainability impacts of FedEx's logistics operations across the value chain.",
      detailedInfoMarkdown: `# Social Life Cycle Assessment of the Logistics Industry

## Overview
This project conducts a Social Life Cycle Assessment (S-LCA) of FedEx's logistics industry, evaluating social sustainability impacts across the entire value chain from workers to communities.

## Objectives
- Develop a comprehensive S-LCA framework for logistics
- Identify key social impact categories: worker rights, community health, fair wages
- Benchmark FedEx against industry standards and SDG targets
- Provide actionable recommendations for social sustainability improvement

## Team
- **PIs:** Dr. Usha Mohan, Dr. Arshinder Kaur
- **Researcher:** Smriti Mishra (PhD)
`,
      categoryId: "cat_scm",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_13",
      title: "AI-Driven Risk Management and Decision Support for Sustainable Supply Chains",
      shortDesc: "An AI-powered risk management framework for sustainable supply chains using electric vehicle routing with location-based optimization.",
      detailedInfoMarkdown: `# AI-Driven Risk Management and Decision Support for Sustainable Supply Chains

## Overview
This project develops an AI-driven risk management and decision support system for FedEx's supply chain, integrating electric location routing problem (E-LRP) optimization for sustainable operations.

## Objectives
- Develop AI-based risk identification and mitigation strategies for supply chains
- Integrate sustainability metrics into operational decision-making
- Optimize EV routing with location decisions for greener logistics

## Team
- **PI:** Dr. Neelesh Upadhye
- **Students:** Punith (BS), Devanshu (Masters), Sajjid (Masters)
`,
      categoryId: "cat_ev",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_14",
      title: "Sarathi AI – Driver Monitoring System",
      shortDesc: "A real-time AI-powered driver monitoring system detecting fatigue, drowsiness, and distraction using facial cues, with edge deployment and fleet dashboard.",
      detailedInfoMarkdown: `# Sarathi AI – Driver Monitoring System

## Overview
Truck drivers often face fatigue and distraction during long hours on the road, leading to increased accident risks. Current safety measures lack real-time monitoring and predictive capabilities. Sarathi AI addresses this gap through an AI-powered driver monitoring system.

## Objectives
- Develop a real-time AI system to detect fatigue, drowsiness, and distraction using facial cues
- Enable instant alerts to drivers and fleet supervisors for timely intervention
- Track behavioral metrics and generate dashboards for audit and training
- Design a hardware-agnostic, modular system adaptable to diverse vehicles
- Use historical data to predict risk patterns and enable proactive route/rest planning

## Progress & Results
- Developed and validated real-time driver monitoring system with behavioral metrics and edge deployment capability
- Built mobile-first dashboard integrating driver behavior and vehicle telemetry
- Enabled vehicle data acquisition (OBD/telemetry) and cloud-based analytics
- Extended driver monitoring approach to forklift and industrial equipment use cases

## Methodology
- Deployed behavioral monitoring using EAR, MAR, PERCLOS, blink frequency, and head pose analytics
- Integrated vehicle telemetry for context-aware alerts and operator feedback
- Cross-platform mobile app with secure communication and embedded database
- Cloud backend with REST APIs, analytics, and centralized fleet-level insights

## Next Steps
- End-to-end system validation with real-time driver and vehicle data
- Pilot deployment planned at Delhi ACLC2 facility (May 2026)

## Team
- **PIs:** Dr. Rajagopalan Srinivasan, Dr. Babji Srinivasan
- **Researchers:** Thasnimol (PhD), Wilfred (Post-Doctoral)
`,
      categoryId: "cat_wellness",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_15",
      title: "Media Presence Tracking – Automated Media Intelligence Platform",
      shortDesc: "An automated media intelligence platform for monitoring FedEx and competitor news using NLP clustering, semantic search, and newsletter generation.",
      detailedInfoMarkdown: `# Media Presence Tracking – Automated Media Intelligence Platform

## Overview
This project automates monitoring and analysing news media for FedEx and logistics industry entries, developing a Proof-of-Concept for an Automated Media Intelligence platform.

## Objectives
- Enable time-based media filtering and sentiment insights
- Redesign UI with FedEx branding and modular scalability
- Improve keyword tracking and metrics accuracy
- Set up backend for newsletter automation and secure user access
- Integrate semantic search and real-time monitoring

## Results
- Extended ingestion architecture to support digital and print media sources
- Implemented OCR-driven segmentation and article stitching for English news clippings
- Developed clustering workflows for news-story grouping and topic-level intelligence
- Integrated semantic retrieval, persistent chat, and automated newsletter generation
- Grouped multi-outlet reports into unified event clusters to extract a neutral "consensus pulse"
- Engineered an AI interface with session persistence and agentic reasoning
- Developed automated summarization engine for mobile-optimized snapshots
- Implemented real-time topic modeling and PDF quarterly report generation

## Team
- **PIs:** Dr. Babji Srinivasan, Dr. Kelitha Cherian
- **Students:** Abulaman (BS), Manish (BS)
- **FedEx SME:** Tasneem
`,
      categoryId: "cat_ai",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_16",
      title: "Tech Simplification Using Agentic AI",
      shortDesc: "An Agentic AI framework to unify FedEx's fragmented digital ecosystem, automate data product generation, and standardize reusable assets using LLM-driven workflows.",
      detailedInfoMarkdown: `# Tech Simplification Using Agentic AI

## Overview
FedEx's digital ecosystem is fragmented with siloed applications and inconsistent data products. This project unifies platforms, standardizes reusable assets, and applies AI-driven automation with strong governance.

## Objectives
- Develop a POC of an Agentic AI workflow for data product automation
- Design and develop an Agentic AI workflow for large-scale data product generation
- Design an Agentic AI framework for data readiness — clean, validated, production-ready data

## Progress
- Developed Data Product Generation Framework and Data Readiness Framework using modular agent-based architecture
- Implemented pattern recognition, preprocessing, and template-based generation agents to automate YAML & SQL generation
- Introduced LLM-driven agentic workflows
- Analyzed ~30 challenges, narrowed down to 8 core problems
- Submitted research paper: *Autonomous Agentic Workflows for Reliable Data Product Generation*

## Next Steps
- Build intelligent agent for automatic feature selection from Data Garden
- Advance Agentic AI framework for end-to-end automated enrichment
- Conduct working sessions with FedEx DataWorks team (Velachery)

## Team
- **PIs:** Dr. Babji Srinivasan, Dr. Anish, Pranesh
- **FedEx SMEs:** Aslam, Ayush, Stephen, Anantha
`,
      categoryId: "cat_ai",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_17",
      title: "Unified Demand-Supply Intelligence Platform",
      shortDesc: "A platform integrating Agent-Based Modelling, Unbalanced Optimal Transport, and LLMs to simulate supply chain disruptions and plan resilient recovery strategies.",
      detailedInfoMarkdown: `# Unified Demand-Supply Intelligence Platform

## Overview
This project develops a Unified Demand-Supply Platform leveraging Agent-Based Modelling (ABM) to simulate disruptions and plan recovery strategies, with LLMs supporting scenario generation and interpretation.

## Objectives
- Develop a Unified Demand-Supply Intelligence Platform by integrating ABM, Unbalanced Optimal Transport (UOT), and LLMs
- Enable resilient, cost-efficient, and fairness-driven logistics planning under disruption scenarios

## Methodology
- Models key disruption scenarios: warehouse outages, fleet shortages, and demand surges
- **LP solver:** Cost minimization
- **UOT solver:** Fairness-aware partial fulfilment
- Comprehensive cost model accounting for distance, travel time, fuel, emissions, delays, and zone-specific charges

## Progress
- Simulated logistics disruptions with varying agents and cost parameters
- ABM + UOT framework tested under flash sales, truck failures, and warehouse delays scenarios
- UOT achieves fairer allocations; LP aggressively minimizes cost
- **Presented at IN4PL 6th IFAC International Conference on Innovative Intelligent Industrial Production and Logistics, Spain**

## Team
- **PI:** Dr. Babji Srinivasan
- **Researchers:** Anish (Post-Doctoral), Pranesh Kannan (BTech)
`,
      categoryId: "cat_scm",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
    {
      id: "proj_iitm_18",
      title: "Mental Health Assessment of White Collar Employees Using Eye Tracking Technology",
      shortDesc: "A non-invasive eye-tracking framework for objective real-time stress and fatigue assessment of white-collar employees, achieving 94.59% classification accuracy.",
      detailedInfoMarkdown: `# Mental Health Assessment of White Collar Employees Using Eye Tracking Technology

## Overview
Existing evaluation methods rely on self-reports, which limit objective measurement and real-time diagnosis. Eye-tracking technology provides a non-invasive method for recording visual and eye movement patterns associated with different mental conditions.

## Objectives
- Identify robust ocular biomarkers for stress and fatigue assessment
- Develop synchronized experimentation workflows using custom GUI and eye tracking
- Build machine learning models for objective stress-state classification
- Establish scalable workplace mental health monitoring framework

## Progress
- Designed controlled experimental tasks (smooth pursuit, Stroop, visual search)
- Extracted fixation, saccade, scanpath, gaze entropy, and pupil-based features
- Used GSR-derived pseudo-labeling and clustering for robust stress-state generation
- Developed random forest classifier for multimodal mental stress assessment
- **Achieved 94.59% classification accuracy for calm, moderate, and stressed states**

## Next Steps
- Expand participant sample size for workplace validation
- Extend framework toward mental fatigue and workload assessment
- Progress manuscript drafting for publication

## Team
- **PI:** Dr. Babji Srinivasan
- **Researcher:** Deepak (Post-Doctoral)
`,
      categoryId: "cat_wellness",
      progressId: "status_inprogress",
      labOrigin: "iit_madras_fedex_smart_center",
      isPublished: true,
    },
  ]);

  await db.insert(projectTags).values([
    { projectId: "proj_iitm_11", tagId: "tag_wellbeing" },
    { projectId: "proj_iitm_11", tagId: "tag_computer_vision" },
    { projectId: "proj_iitm_11", tagId: "tag_warehouse" },
    { projectId: "proj_iitm_12", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_12", tagId: "tag_supplychain" },
    { projectId: "proj_iitm_13", tagId: "tag_ev" },
    { projectId: "proj_iitm_13", tagId: "tag_optimization" },
    { projectId: "proj_iitm_13", tagId: "tag_sustainability" },
    { projectId: "proj_iitm_14", tagId: "tag_safety" },
    { projectId: "proj_iitm_14", tagId: "tag_computer_vision" },
    { projectId: "proj_iitm_14", tagId: "tag_ai" },
    { projectId: "proj_iitm_15", tagId: "tag_nlp" },
    { projectId: "proj_iitm_15", tagId: "tag_ai" },
    { projectId: "proj_iitm_15", tagId: "tag_llm" },
    { projectId: "proj_iitm_16", tagId: "tag_llm" },
    { projectId: "proj_iitm_16", tagId: "tag_ai" },
    { projectId: "proj_iitm_17", tagId: "tag_supplychain" },
    { projectId: "proj_iitm_17", tagId: "tag_ai" },
    { projectId: "proj_iitm_17", tagId: "tag_optimization" },
    { projectId: "proj_iitm_18", tagId: "tag_wellbeing" },
    { projectId: "proj_iitm_18", tagId: "tag_ml" },
    { projectId: "proj_iitm_18", tagId: "tag_safety" },
  ]);

  await db.insert(projectContributors).values([
    { projectId: "proj_iitm_11", personId: "person_usha", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_11", personId: "person_vaibhav", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_11", personId: "person_arshinder", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_11", personId: "person_deepthi", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_11", personId: "person_abinav", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_12", personId: "person_usha", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_12", personId: "person_arshinder", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_12", personId: "person_smriti", associationTypeId: "assoc_phd" },
    { projectId: "proj_iitm_13", personId: "person_neelesh", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_13", personId: "person_punith", associationTypeId: "assoc_btech" },
    { projectId: "proj_iitm_13", personId: "person_devanshu", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_13", personId: "person_sajjid", associationTypeId: "assoc_mtech" },
    { projectId: "proj_iitm_14", personId: "person_rajagopalan", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_14", personId: "person_babji", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_14", personId: "person_thasnimol", associationTypeId: "assoc_phd" },
    { projectId: "proj_iitm_14", personId: "person_wilfred", associationTypeId: "assoc_postdoc" },
    { projectId: "proj_iitm_15", personId: "person_babji", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_15", personId: "person_kelitha", associationTypeId: "assoc_copi" },
    { projectId: "proj_iitm_15", personId: "person_abulaman", associationTypeId: "assoc_btech" },
    { projectId: "proj_iitm_15", personId: "person_manish", associationTypeId: "assoc_btech" },
    { projectId: "proj_iitm_16", personId: "person_babji", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_16", personId: "person_anish", associationTypeId: "assoc_postdoc" },
    { projectId: "proj_iitm_16", personId: "person_pranesh", associationTypeId: "assoc_btech" },
    { projectId: "proj_iitm_17", personId: "person_babji", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_17", personId: "person_anish", associationTypeId: "assoc_postdoc" },
    { projectId: "proj_iitm_17", personId: "person_pranesh", associationTypeId: "assoc_btech" },
    { projectId: "proj_iitm_18", personId: "person_babji", associationTypeId: "assoc_lead" },
    { projectId: "proj_iitm_18", personId: "person_deepak", associationTypeId: "assoc_postdoc" },
  ]);

  console.log("Projects batch 2 seeded.");
}
