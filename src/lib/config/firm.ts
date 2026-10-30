/**
 * Centralized Firm Configuration & Source of Truth
 * Guardian Legal Solutions
 *
 * NOTE: As required by professional standards and firm guidelines:
 * - Facts requiring external registration/verification are explicitly flagged with `isVerified`.
 * - Unverified claims (e.g. awards, arbitrary success metrics, fictional numbers) are strictly excluded.
 * - Placeholders are clearly identified to allow client onboarding without code changes.
 */

export interface PracticeAreaConfig {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  isVerifiedService: boolean;
  mattersCovered: string[];
  howWeAssist: string[];
  stages: { step: number; title: string; description: string }[];
  requiredDocuments: string[];
  faqs: { question: string; answer: string }[];
  featured: boolean;
  jurisdictionNote?: string;
}

export interface LawyerProfileConfig {
  slug: string;
  name: string;
  designation: string;
  photoUrl: string;
  isVerified: boolean;
  qualifications: string[];
  barRegistrations: string[];
  practiceAreas: string[];
  languages: string[];
  bio: string;
  featured: boolean;
  email?: string;
}

export interface FirmConfig {
  legalName: string;
  shortName: string;
  tagline: string;
  subheadline: string;
  domain: string;
  contact: {
    phone: string;
    phoneFormatted: string;
    email: string;
    emergencyEmail?: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      isVerifiedOfficeLocation: boolean;
    };
    hours: {
      days: string;
      time: string;
      timezone: string;
    };
  };
  jurisdiction: {
    primary: string;
    coverageAreas: string[];
    disclaimer: string;
  };
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
  consultation: {
    title: string;
    steps: { number: string; title: string; description: string }[];
    standardNotice: string;
  };
  practiceAreas: PracticeAreaConfig[];
  lawyers: LawyerProfileConfig[];
}

export const FIRM_CONFIG: FirmConfig = {
  legalName: "Guardian Legal Solutions",
  shortName: "Guardian Legal",
  tagline: "Clarity in Law. Confidence in Every Decision.",
  subheadline:
    "Thoughtful legal guidance, strategic representation, and dedicated advocacy to help individuals and businesses resolve complex legal matters with precision and integrity.",
  domain: process.env.NEXT_PUBLIC_APP_URL || "https://guardianlegalsolutions.com",
  contact: {
    phone: "+91 93153 12406",
    phoneFormatted: "+91 93153 12406",
    email: "contact@guardianlegalsolutions.com",
    address: {
      line1: "Sector 49",
      city: "Gurugram",
      state: "Haryana",
      postalCode: "122018",
      country: "India",
      isVerifiedOfficeLocation: true,
    },
    hours: {
      days: "Monday – Saturday",
      time: "9:30 AM – 6:30 PM",
      timezone: "IST (UTC+05:30)",
    },
  },
  jurisdiction: {
    primary: "High Courts, District Courts & Tribunals (Gurugram, Delhi NCR & National Practice)",
    coverageAreas: ["Gurugram", "Delhi NCR", "High Courts of India", "NCLT", "Consumer Forums", "Arbitral Tribunals"],
    disclaimer:
      "As per the rules of the Bar Council of India, law firms are not permitted to solicit work or advertise. The contents of this website are intended solely for educational, informational, and general guidance purposes and must not be construed as legal advice or solicitation.",
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/guardian-legal-solutions",
  },
  consultation: {
    title: "Our Consultation Procedure",
    steps: [
      {
        number: "01",
        title: "Confidential Enquiry Submission",
        description:
          "Submit your basic enquiry and practice area requirements via our secure intake form. No advocate-client privilege is established solely by submitting an initial query.",
      },
      {
        number: "02",
        title: "Conflict Check & Preliminary Assessment",
        description:
          "Our intake team verifies availability, conducts mandatory conflict-of-interest checks, and aligns your enquiry with the appropriate legal counsel.",
      },
      {
        number: "03",
        title: "Document Review & Structured Consultation",
        description:
          "During the scheduled conference (in-person or secure video conference), counsel evaluates relevant documents, assesses risks, and outlines viable legal pathways.",
      },
      {
        number: "04",
        title: "Formal Engagement & Strategic Action",
        description:
          "Upon mutual agreement, formal engagement terms are executed, and structured legal representation, advisory, or drafting commences immediately.",
      },
    ],
    standardNotice:
      "Submitting an enquiry or booking request does not constitute an advocate-client relationship. All enquiries are handled in strict professional confidence under our data privacy standards.",
  },
  practiceAreas: [
    {
      slug: "civil-and-commercial-litigation",
      name: "Civil & Commercial Litigation",
      shortDescription:
        "Strategic dispute resolution, commercial recovery, injunctions, and representation before High Courts, Commercial Courts, and District Benches.",
      fullDescription:
        "Commercial and civil disputes demand thorough evidentiary preparation, swift procedural interventions, and realistic risk mitigation. Guardian Legal Solutions represents corporate entities, partnerships, and private individuals in complex breach of contract disputes, property litigations, recovery proceedings, and equitable remedies.",
      isVerifiedService: true,
      featured: true,
      mattersCovered: [
        "Breach of contract and damages claims",
        "Commercial recovery and summary suits (Order XXXVII)",
        "Interim reliefs, injunctions, and stay orders",
        "Shareholder disputes and corporate oppression/mismanagement",
        "Property partition, declaration, and title disputes",
        "Enforcement of domestic decrees and foreign judgments",
      ],
      howWeAssist: [
        "Detailed legal assessment of contractual exposure and documentary evidence",
        "Pre-litigation legal notice dispatch and tactical negotiation",
        "Drafting comprehensive plaints, written statements, and urgent stay applications",
        "Experienced court advocacy across Civil, Commercial, and Appellate jurisdictions",
      ],
      stages: [
        { step: 1, title: "Initial Evidence Audit", description: "Reviewing contracts, notices, email trails, and commercial ledgers." },
        { step: 2, title: "Pre-Litigation Action", description: "Issuing formal statutory notices and exploring settlement windows." },
        { step: 3, title: "Pleadings & Urgent Relief", description: "Filing plaints with ex-parte interim injunction applications if urgent." },
        { step: 4, title: "Trial & Final Arguments", description: "Leading evidence, cross-examination, and final judicial submissions." },
      ],
      requiredDocuments: [
        "Primary agreement/contract and subsequent addenda",
        "Invoices, delivery receipts, and statement of accounts",
        "Chronological correspondence (emails, letters, formal notices)",
        "Proof of cause of action and territorial jurisdiction documents",
      ],
      faqs: [
        {
          question: "How long does a commercial civil suit typically take?",
          answer:
            "Under the Commercial Courts Act, timelines are structured with strict deadlines for filing written statements (120 days maximum) and case management conferences, significantly expediting matters compared to ordinary civil suits.",
        },
        {
          question: "Can we obtain urgent interim relief before the defendant appears?",
          answer:
            "Yes, where irreparable harm or asset dissipation is imminent, courts have jurisdiction to grant urgent ex-parte ad-interim injunctions upon prima facie merit.",
        },
      ],
    },
    {
      slug: "corporate-and-business-law",
      name: "Corporate & Business Advisory",
      shortDescription:
        "End-to-end legal support for enterprise structuring, regulatory compliance, corporate governance, commercial transactions, and secretarial diligence.",
      fullDescription:
        "We guide enterprises through dynamic regulatory landscapes. From company formation, shareholders' agreements, and board governance to cross-border joint ventures and commercial leases, our counsel balances commercial agility with strict statutory compliance.",
      isVerifiedService: true,
      featured: true,
      mattersCovered: [
        "Entity incorporation, founders' agreements, and joint ventures",
        "Corporate governance, ROC filings, and statutory compliance audits",
        "Directors' duties, liabilities, and resolution drafting",
        "Mergers, acquisitions, and business asset transfers",
        "Vendor contracts, Master Service Agreements (MSAs), and NDAs",
        "FDI regulations, FEMA compliance, and RBI reporting",
      ],
      howWeAssist: [
        "Structuring tax-compliant and investor-ready commercial agreements",
        "Reviewing and drafting corporate resolutions, charter documents, and bylaws",
        "Conducting vendor and corporate legal due diligence",
        "Representing corporate boards in regulatory investigations and inquiries",
      ],
      stages: [
        { step: 1, title: "Needs Assessment", description: "Aligning corporate objectives with applicable statutory frameworks." },
        { step: 2, title: "Due Diligence & Structuring", description: "Reviewing regulatory risk, shareholding patterns, and liability caps." },
        { step: 3, title: "Documentation Drafting", description: "Crafting bespoke bylaws, agreements, and compliance checklists." },
        { step: 4, title: "Execution & Filing", description: "Facilitating board approvals and mandatory statutory filings." },
      ],
      requiredDocuments: [
        "Certificate of Incorporation, MOA, and AOA",
        "Recent board resolutions and list of current directors/shareholders",
        "Draft agreements, term sheets, or commercial proposals",
        "Latest financial statements and statutory audit reports",
      ],
      faqs: [
        {
          question: "What is the importance of a well-drafted Shareholders' Agreement (SHA)?",
          answer:
            "An SHA clearly governs voting rights, board composition, pre-emptive rights, tag-along/drag-along mechanisms, and dispute resolution, preventing costly deadlocks between stakeholders.",
        },
      ],
    },
    {
      slug: "contract-drafting-and-review",
      name: "Contract Drafting & Vetting",
      shortDescription:
        "Precision drafting, loophole analysis, and risk mitigation across commercial agreements, vendor contracts, employment pacts, and SLAs.",
      fullDescription:
        "Clear contractual language is the first and strongest line of defense against legal disputes. Guardian Legal Solutions drafts, reviews, and negotiates agreements tailored to protect your financial interests, minimize exposure to liabilities, and enforce definitive remedies in default situations.",
      isVerifiedService: true,
      featured: true,
      mattersCovered: [
        "Master Service Agreements (MSAs) and Statements of Work (SOWs)",
        "Non-Disclosure Agreements (NDAs) and Non-Compete Covenants",
        "Commercial Leases, License Deeds, and Real Estate Contracts",
        "Software Licensing, SaaS Terms, and Data Processing Agreements",
        "Distribution, Franchise, and Agency Agreements",
        "Employment Agreements and Executive Severance Packages",
      ],
      howWeAssist: [
        "Redlining third-party contracts to neutralize one-sided indemnities and unlimited liabilities",
        "Drafting robust dispute resolution, arbitration, and governing law clauses",
        "Formulating enforceable non-solicitation, confidentiality, and IP assignment terms",
        "Providing quick-turnaround risk matrices for executive decision-makers",
      ],
      stages: [
        { step: 1, title: "Intake & Objectives", description: "Analyzing the commercial rationale and critical risk tolerances." },
        { step: 2, title: "Drafting / Redlining", description: "Preparing comprehensive drafts or redlining counterparty terms." },
        { step: 3, title: "Clause-by-Clause Review", description: "Guiding client leadership through indemnity, liability, and termination clauses." },
        { step: 4, title: "Execution Readiness", description: "Finalizing execution copies, stamp duty guidance, and attestation protocols." },
      ],
      requiredDocuments: [
        "Draft agreement or standard template under review",
        "Commercial term sheet or agreed email points",
        "Supporting specifications or exhibits",
      ],
      faqs: [
        {
          question: "Why should standard boilerplate clauses not be overlooked?",
          answer:
            "Boilerplate clauses dictate crucial aspects such as jurisdiction, force majeure, dispute mechanisms, and limitation of liability, which frequently determine the outcome if a conflict arises.",
        },
      ],
    },
    {
      slug: "arbitration-and-dispute-resolution",
      name: "Arbitration & Alternative Dispute Resolution",
      shortDescription:
        "Effective representation in domestic and international arbitration, mediation, and conciliation proceedings to achieve swift, confidential resolution.",
      fullDescription:
        "Arbitration offers confidential, specialized, and enforceable dispute resolution without prolonged court delays. Guardian Legal Solutions assists clients throughout the arbitral lifecycle—from drafting arbitration agreements and invoking arbitral clauses to representation before sole arbitrators and multi-member tribunals.",
      isVerifiedService: true,
      featured: true,
      mattersCovered: [
        "Domestic arbitrations under the Arbitration & Conciliation Act, 1996",
        "Institutional arbitration proceedings (DIAC, MCIA, SIAC, ICC)",
        "Section 9 applications for interim measures before or during arbitration",
        "Section 11 applications for court appointment of arbitrators",
        "Section 34 petitions challenging arbitral awards",
        "Execution and enforcement of arbitral awards",
      ],
      howWeAssist: [
        "Formulating comprehensive Statement of Claim or Defense and Counterclaims",
        "Strategic representation in interim protection petitions",
        "Conducting witness examinations and expert testimony management",
        "Negotiating structured settlement agreements during mediation",
      ],
      stages: [
        { step: 1, title: "Notice of Arbitration", description: "Drafting and serving the statutory invocation notice nominating an arbitrator." },
        { step: 2, title: "Tribunal Constitution", description: "Consenting to an arbitrator or filing Section 11 before the competent High Court." },
        { step: 3, title: "Pleadings & Oral Hearings", description: "Filing claims, documentary evidence, and presenting oral arguments." },
        { step: 4, title: "Award Enforcement", description: "Securing compliance or initiating execution proceedings for decree recovery." },
      ],
      requiredDocuments: [
        "Contract containing the arbitration clause",
        "Statutory invocation notice and counterparty reply",
        "Full record of claims, correspondence, and itemized quantum of losses",
      ],
      faqs: [
        {
          question: "Can an arbitral award be appealed like a regular court decree?",
          answer:
            "An arbitral award cannot be appealed on factual merits. It can only be set aside under narrow statutory grounds (Section 34), such as patent illegality, violation of public policy, or procedural injustice.",
        },
      ],
    },
    {
      slug: "banking-and-financial-disputes",
      name: "Banking & Financial Disputes",
      shortDescription:
        "Legal advisory and defense in financial disputes, negotiable instruments (Section 138), DRT proceedings, SARFAESI matters, and settlement negotiations.",
      fullDescription:
        "Financial conflicts require a thorough command of regulatory guidelines, banking jurisprudence, and commercial realities. We assist corporate borrowers, MSMEs, and commercial entities in addressing complex recovery notices, loan restructuring disputes, and statutory proceedings with structured legal representation.",
      isVerifiedService: true,
      featured: false,
      mattersCovered: [
        "Negotiable Instruments Act (Section 138 cheque dishonour proceedings)",
        "Debt Recovery Tribunal (DRT) and DRAT representation",
        "SARFAESI Act notices and Section 17 appeal petitions",
        "One-Time Settlement (OTS) structuring and formal documentation",
        "Insolvency and Bankruptcy Code (IBC) Section 7 and 9 matters before NCLT",
      ],
      howWeAssist: [
        "Scrutinizing statutory demand notices for legal flaws and procedural irregularities",
        "Drafting robust replies to 13(2) and 13(4) SARFAESI notices",
        "Formulating structured OTS proposals compliant with RBI regulations",
        "Protecting mortgaged commercial assets from wrongful possession",
      ],
      stages: [
        { step: 1, title: "Notice Analysis", description: "Reviewing statutory timelines, classification criteria, and account statements." },
        { step: 2, title: "Formal Reply / Defense", description: "Issuing point-by-point statutory objections within prescribed limitation periods." },
        { step: 3, title: "Tribunal / Court Challenge", description: "Approaching DRT or High Court for stay against arbitrary action." },
        { step: 4, title: "Negotiated Resolution", description: "Structuring legally binding settlement deeds or pursuing trial." },
      ],
      requiredDocuments: [
        "Loan sanction letters, hypothecation/mortgage deeds",
        "Statutory demand notices received (Section 138 / Section 13(2))",
        "Complete certified statement of accounts showing credits/debits",
      ],
      faqs: [
        {
          question: "What is the time limit to respond to a Section 13(2) SARFAESI notice?",
          answer:
            "A borrower or guarantor has 60 days from receipt of the notice to submit formal written representations/objections under Section 13(3A) of the SARFAESI Act.",
        },
      ],
    },
    {
      slug: "property-and-real-estate-law",
      name: "Property & Real Estate Law",
      shortDescription:
        "Comprehensive real estate diligence, title verification, builder-buyer disputes (RERA), commercial leasing, and property documentation.",
      fullDescription:
        "Real estate transactions involve high capital stakes and complex state-specific property laws. Guardian Legal Solutions conducts rigorous 30-year chain-of-title verifications, drafts watertight conveyance deeds, and represents aggrieved buyers and property owners before RERA, consumer courts, and civil registries.",
      isVerifiedService: true,
      featured: false,
      mattersCovered: [
        "30-year chain of title investigation and title search reports",
        "Sale Deeds, Agreement to Sell, Gift Deeds, and Relinquishment Deeds",
        "Real Estate Regulatory Authority (RERA) complaints for delayed possession",
        "Commercial lease deeds, builder-buyer agreements, and joint development pacts",
        "Mutation, revenue record corrections, and encumbrance certificates",
      ],
      howWeAssist: [
        "Verifying municipal approvals, layout plans, and non-encumbrance status",
        "Protecting allottee rights against arbitrary builder delays and escalations",
        "Drafting customized property agreements that avoid ambiguous transfer clauses",
        "Assisting with registrar office registration, stamp duty, and attestation",
      ],
      stages: [
        { step: 1, title: "Title Investigation", description: "Inspecting Sub-Registrar records, revenue registers, and link deeds." },
        { step: 2, title: "Drafting & Vetting", description: "Formulating conveyance deeds with protective warranty covenants." },
        { step: 3, title: "Stamp Duty & Registration", description: "Calculating exact stamp duty and coordinating formal registration." },
        { step: 4, title: "Mutation & Transfer", description: "Ensuring revenue records and municipal tax IDs reflect updated ownership." },
      ],
      requiredDocuments: [
        "Mother deeds and complete chain of prior title deeds (last 30 years)",
        "Sanctioned building plan and occupancy certificate (OC)",
        "Latest tax receipts, mutation extracts, and Encumbrance Certificate (EC)",
      ],
      faqs: [
        {
          question: "What remedies exist if a developer delays project possession?",
          answer:
            "Under RERA, allottees can claim refund of the entire principal with prescribed monthly interest or seek monthly interest for every month of continued delay until physical possession is delivered.",
        },
      ],
    },
  ],
  lawyers: [],
};
