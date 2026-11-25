// Single source of truth for marketing copy and plans.
// Every capability described here exists in the product today.

export const nav = [
  { label: "Platform", href: "/platform" },
  { label: "Teams", href: "/teams" },
  { label: "Pricing", href: "/pricing" },
  { label: "Trust", href: "/trust" },
  { label: "About", href: "/about" },
];

export const footerCols = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Teams", href: "/teams" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Trust", href: "/trust" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/signup" },
    ],
  },
];

export const heroSlides = [
  {
    title: "The AI engine behind every clinical encounter",
    body: "ChartSpeak analyzes the conversation, drafts the note, assigns evidence-linked codes and writes the patient instructions. Care organizations close charts faster and stop leaking revenue to missed specificity.",
    a: "#c2b872",
    b: "#6f6a38",
  },
  {
    title: "Documentation that decides what happens next",
    body: "Every encounter becomes structured data: diagnoses, procedures, level of service and follow-up. One AI pass feeds coding, quality review and patient communication.",
    a: "#9fb59a",
    b: "#4c6350",
  },
  {
    title: "Operational control for care organizations",
    body: "Row-level data isolation, metered AI usage and mandatory clinician review give operators the governance that production AI requires.",
    a: "#b9a0a0",
    b: "#6a4848",
  },
];

export const capabilityTabs = [
  {
    key: "documentation",
    label: "Ambient Documentation",
    body: "The model reads the full encounter, from an uploaded recording or a transcript, and drafts a complete note in the structure each service line requires. It identifies what the encounter did not establish and flags the gap instead of inventing it.",
    points: [
      "Cuts after-hours charting by drafting the note before the next visit begins",
      "Flags missing history, dosage and exam detail so gaps surface before signature",
      "Produces SOAP, history and physical, and progress note structures on demand",
    ],
  },
  {
    key: "revenue",
    label: "Revenue Integrity",
    body: "The AI proposes ICD-10, CPT and E/M codes only where the encounter supports them, and quotes the exact passage that justifies each one. Coders verify evidence in seconds instead of rereading the chart.",
    points: [
      "Raises diagnosis specificity with evidence attached to every suggestion",
      "Reduces denials and amended encounters caused by unsupported codes",
      "Gives revenue cycle teams an auditable trail from code to source sentence",
    ],
  },
  {
    key: "communication",
    label: "Patient Communication",
    body: "Discharge and follow-up instructions are generated from the same encounter, at a plain reading level, in the language the patient speaks. The note stays in English for the record.",
    points: [
      "Removes manual instruction writing from the end of every visit",
      "Delivers instructions in more than a dozen languages from one encounter",
      "Keeps instructions consistent with the clinical plan, because both come from one source",
    ],
  },
];

export const pipeline = [
  { t: "Capture", d: "Audio upload or transcript enters a private, access-controlled workspace." },
  { t: "Analyze", d: "The model extracts findings, problems, medications and plan, and records what is missing." },
  { t: "Decide", d: "Codes and levels of service are proposed with the supporting quote for each." },
  { t: "Deliver", d: "A clinician reviews, edits and exports the note and the patient instructions." },
];

export const outcomes = [
  { k: "Revenue", t: "Capture the specificity you currently miss", d: "Evidence-linked ICD-10, CPT and E/M suggestions raise coding precision on every encounter." },
  { k: "Cost", t: "Take documentation labor out of the clinical day", d: "One AI pass replaces note drafting, instruction writing and first-pass coding review." },
  { k: "Speed", t: "Close the chart while the encounter is fresh", d: "Drafts are ready minutes after the visit, not hours into the evening." },
  { k: "Risk", t: "Keep every AI output under clinical control", d: "Nothing is exported without review, and every code traces to its source sentence." },
];

export const builtDifferent = [
  { t: "AI is the engine, not an add-on", d: "The product is built around the model. Capture, analysis, coding and communication are one pipeline rather than separate tools stitched together." },
  { t: "Structured output, validated every time", d: "Model responses are constrained to a strict schema and validated before they reach a screen. Malformed output fails safely and the credit is returned." },
  { t: "Evidence on every decision", d: "Each suggested code carries the passage from the encounter that supports it, so verification is a read, not a hunt." },
  { t: "Governed by design", d: "Row-level security isolates every account, audio sits in private storage, and model credentials never reach the browser." },
  { t: "Metered for operators", d: "Plans carry explicit monthly volume. Usage is enforced on the server and recorded per account." },
];

export const specialties = [
  "Allergy and Immunology","Anesthesiology","Cardiology","Critical Care","Dermatology","Emergency Medicine","Endocrinology","Family Medicine","Gastroenterology","Hematology","Infectious Diseases","Internal Medicine","Oncology","Neurosurgery","Obstetrics and Gynecology","Ophthalmology","Orthopedic Surgery","Otolaryngology","Palliative Medicine","Pediatrics","Plastic Surgery","Psychiatry","Pulmonology","Radiology","Rheumatology","Urgent Care","Urology",
];

export const careSettings = ["Ambulatory", "Inpatient", "Emergency Department", "Urgent Care", "Telehealth", "Home Health"];

export const languages = ["Spanish","Russian","Korean","Polish","Mandarin Chinese","Farsi","Hindi","Telugu","Arabic","French","Portuguese","German","Vietnamese","Tagalog","Swahili","Yoruba"];

export const faqs = [
  { q: "How is ChartSpeak different from transcription tools?", a: "Transcription stops at text. ChartSpeak analyzes the encounter and produces decisions: a structured note, evidence-linked codes and patient instructions, from a single pass." },
  { q: "What inputs does the platform accept?", a: "Audio recordings up to 18 MB and pasted transcripts up to 60,000 characters. Each encounter becomes one reviewable note." },
  { q: "How are coding suggestions kept defensible?", a: "The model proposes a code only when the encounter supports it and must quote the supporting passage. Coders and clinicians verify against that quote." },
  { q: "Which languages are supported?", a: "Patient instructions can be generated in more than a dozen languages. The clinical note itself is written in English." },
  { q: "How is access controlled?", a: "Every record is isolated per account in the database, audio is stored privately, and AI requests run only on the server. The Trust page describes the full control set." },
  { q: "How does billing work?", a: "Three monthly plans set the number of note generations. Usage is metered on the server and failed generations do not consume volume." },
];

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 47,
    blurb: "Single-clinician deployments validating AI documentation.",
    credits: 50,
    features: ["50 AI note generations per month", "SOAP, history and physical, and progress templates", "Evidence-linked ICD-10, CPT and E/M suggestions", "Patient instructions in 16 languages", "Audio upload and transcript input"],
    url: "https://selar.com/47plan?currency=USD",
  },
  {
    id: "professional",
    name: "Professional",
    price: 57,
    blurb: "Active clinicians running documentation at production volume.",
    credits: 150,
    popular: true,
    features: ["150 AI note generations per month", "SOAP, history and physical, and progress templates", "Evidence-linked ICD-10, CPT and E/M suggestions", "Patient instructions in 16 languages", "Audio upload and transcript input"],
    url: "https://selar.com/57plan?currency=USD",
  },
  {
    id: "practice",
    name: "Practice",
    price: 97,
    blurb: "High-volume clinicians and practices with sustained encounter load.",
    credits: 500,
    features: ["500 AI note generations per month", "SOAP, history and physical, and progress templates", "Evidence-linked ICD-10, CPT and E/M suggestions", "Patient instructions in 16 languages", "Audio upload and transcript input"],
    url: "https://selar.com/97plan?currency=USD",
  },
];
