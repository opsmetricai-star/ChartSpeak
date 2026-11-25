// Central site content. Metrics and testimonials marked `sample` are PLACEHOLDERS
// and must be replaced with real, verified data before launch.

export const nav = [
  { label: "Solutions", href: "/solutions" },
  { label: "For Clinicians", href: "/clinicians" },
  { label: "For Partners", href: "/partners" },
  {
    label: "Integrations",
    href: "/ehr-integrations",
    children: [
      { label: "EHR Integrations", href: "/ehr-integrations", desc: "Two-way connections to major EHRs" },
      { label: "Partner Toolkit", href: "/partners", desc: "APIs and SDKs for healthtech teams" },
      { label: "Download Apps", href: "/download", desc: "Web, Chrome, iOS and Android" },
    ],
  },
  {
    label: "Resources",
    href: "/resource-hub",
    children: [
      { label: "Resource Hub", href: "/resource-hub", desc: "Guides, case studies and reports" },
      { label: "Blog", href: "/blog", desc: "Ideas on clinical workflow and AI" },
      { label: "Events", href: "/events", desc: "Webinars and conferences" },
      { label: "Press & Media", href: "/press-media", desc: "News and brand assets" },
    ],
  },
  { label: "About ChartSpeak", href: "/about" },
];

export const footerCols = [
  {
    title: "Product",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "For Clinicians", href: "/clinicians" },
      { label: "For Partners", href: "/partners" },
      { label: "EHR Integrations", href: "/ehr-integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About ChartSpeak", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press-media" },
      { label: "Contact us", href: "/contact-us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource Hub", href: "/resource-hub" },
      { label: "Blog", href: "/blog" },
      { label: "Events", href: "/events" },
      { label: "Help Center", href: "/contact-us#support" },
    ],
  },
  {
    title: "Legal & Trust",
    links: [
      { label: "Trust Center", href: "/trust" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export const heroSlides = [
  {
    title: "Healthcare’s next chapter starts here",
    body: "Meet the ambient operating layer that links your clinical workflows, takes action on your behalf and keeps every encounter moving, so your to-dos become done.",
    cta: { label: "Explore ChartSpeak", href: "/solutions" },
    a: "#c2b872",
    b: "#6f6a38",
  },
  {
    title: "Less typing. More looking up at your patient",
    body: "Notes, orders and patient instructions are drafted while you talk, then waiting for your review the moment the visit ends.",
    cta: { label: "See the clinician workflow", href: "/clinicians" },
    a: "#9fb59a",
    b: "#4c6350",
  },
  {
    title: "Build ambient AI into your own product",
    body: "Our APIs and SDKs give EHRs, telehealth and care-management platforms a faster path to documentation intelligence.",
    cta: { label: "Talk to our partner team", href: "/partners" },
    a: "#b9a0a0",
    b: "#6a4848",
  },
];

export const capabilityTabs = [
  {
    key: "documentation",
    label: "Ambient Documentation",
    body: "ChartSpeak does more than transcribe. It follows the whole patient conversation and produces a complete note, patient instructions and proposed orders. Voice-enabled editing and problem-based charting let the note take the shape each clinician prefers.",
    points: [
      "Gives time back and lightens the mental load of charting",
      "Lets you stay present without losing productivity",
      "Produces clear clinical notes ready to review and export",
    ],
  },
  {
    key: "revenue",
    label: "Assisted Revenue Cycle",
    body: "Documentation captured at the point of care becomes structured, billable information. Suggested ICD-10, CPT and E/M codes come with the evidence from the encounter, so coding is faster and more defensible.",
    points: [
      "Suggests specific diagnosis codes while the visit happens",
      "Links every suggestion to the sentence that supports it",
      "Reduces amended encounters and back-and-forth with coders",
    ],
  },
  {
    key: "reasoning",
    label: "Clinical Reasoning",
    body: "Ask questions and get patient summaries without leaving the workflow. ChartSpeak assembles history before the visit and answers follow-up questions in the context of the chart you are working on.",
    points: [
      "Concise pre-visit patient summaries",
      "Context-aware answers to clinical questions",
      "Always labelled as decision support, never a substitute for judgment",
    ],
  },
];

export const builtDifferent = [
  { t: "AI native from day one", d: "Designed around language models rather than retrofitted, so improvements reach clinicians quickly and the product stays ready for what comes next." },
  { t: "Beyond the note", d: "Documentation, coding suggestions, patient instructions and Q&A live in a single assistant that keeps gaining capabilities." },
  { t: "Built to embed", d: "A structured data layer and open APIs let ChartSpeak work beside the EHR you already use instead of replacing it." },
  { t: "Quality you can inspect", d: "Every generated statement can be traced to the transcript, and every note passes through your review before it goes anywhere." },
  { t: "Security by design", d: "Row-level data isolation, encrypted storage and audit-friendly access controls are part of the foundation. See our Trust Center for current status." },
];

// SAMPLE metrics: replace with measured results.
export const stats = [
  { n: 40, suffix: "%", label: "target reduction", sub: "in time spent on notes" },
  { n: 3, suffix: "x", label: "target faster", sub: "chart completion" },
  { n: 50, suffix: "%", label: "target reduction", sub: "in after-hours charting" },
  { n: 30, suffix: "%", label: "target reduction", sub: "in amended encounters" },
  { n: 100, suffix: "+", label: "specialty templates", sub: "planned at launch" },
];

// SAMPLE testimonials: placeholders, not real clinician quotes.
export const testimonials = [
  { name: "Sample clinician", role: "Family Medicine", quote: "I stopped carrying my charts home. The note is waiting for me when the patient leaves the room." },
  { name: "Sample clinician", role: "Pediatrics", quote: "Parents notice that I look at their child now, not at a screen. That changed the visit." },
  { name: "Sample clinician", role: "Internal Medicine", quote: "Editing by voice is the part I did not expect to love. It takes seconds." },
];

export const specialties = [
  "Allergy and Immunology","Anesthesiology","Cardiology","Critical Care","Dermatology","Emergency Medicine","Endocrinology","Family Medicine","Gastroenterology","Hematology","Infectious Diseases","Internal Medicine","Oncology","Neurosurgery","Obstetrics and Gynecology","Ophthalmology","Orthopedic Surgery","Otolaryngology","Palliative Medicine","Pediatrics","Plastic Surgery","Psychiatry","Pulmonology","Radiology","Rheumatology","Urgent Care","Urology",
];

export const careSettings = ["Ambulatory", "Inpatient", "Emergency Department", "Urgent Care", "Telehealth", "Home Health"];

export const languages = ["Spanish","Russian","Korean","Polish","Mandarin Chinese","Farsi","Hindi","Telugu","Arabic","French","Portuguese","German","Vietnamese","Tagalog","Swahili","Yoruba"];

export const faqs = [
  { q: "What makes ChartSpeak different from other ambient tools?", a: "Most ambient tools stop at the note. ChartSpeak turns the conversation into structured data that also powers coding suggestions, patient instructions, orders and clinical Q&A, so one recording supports many downstream tasks." },
  { q: "Which EHRs does ChartSpeak work with?", a: "Today notes can be copied or exported as structured text and PDF. Direct two-way EHR connections are on the roadmap and are delivered through our partner program. See the EHR Integrations page for current status." },
  { q: "Can ChartSpeak handle multiple languages?", a: "Yes. Conversations in many languages can be summarised into an English clinical note, and patient instructions can be generated in the patient’s language at a plain reading level." },
  { q: "Does ChartSpeak support multiple specialties?", a: "Note templates are specialty-aware and can be personalised. Pick a template per visit or build your own." },
  { q: "How secure is ChartSpeak?", a: "Data is stored in an access-controlled database with row-level security, and files are kept in private storage. Visit the Trust Center for our current security and compliance posture." },
  { q: "How much does ChartSpeak cost?", a: "Plans start with a free trial and scale by usage. See the Pricing page for details." },
];

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 47,
    blurb: "For an individual clinician getting started with ambient notes.",
    credits: 50,
    features: ["50 note generations per month", "Core note templates", "Voice and text editing", "PDF and text export", "Email support"],
    url: "https://selar.com/47plan?currency=USD",
  },
  {
    id: "professional",
    name: "Professional",
    price: 57,
    blurb: "For busy clinicians who want coding help and patient instructions.",
    credits: 150,
    popular: true,
    features: ["150 note generations per month", "All specialty templates", "ICD-10, CPT and E/M suggestions", "Multilingual patient instructions", "Patient summaries", "Priority support"],
    url: "https://selar.com/57plan?currency=USD",
  },
  {
    id: "practice",
    name: "Practice",
    price: 97,
    blurb: "For high-volume clinicians and small practices.",
    credits: 500,
    features: ["500 note generations per month", "Everything in Professional", "Order staging drafts", "Clinical Q&A assistant", "Custom note personalisation", "Onboarding call"],
    url: "https://selar.com/97plan?currency=USD",
  },
];
