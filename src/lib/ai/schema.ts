import { z } from "zod";

export const TEMPLATES = {
  soap: { label: "SOAP", sections: ["Subjective", "Objective", "Assessment", "Plan"] },
  hpi: { label: "History & Physical", sections: ["Chief complaint", "History of present illness", "Past history", "Medications", "Allergies", "Review of systems", "Physical exam", "Assessment", "Plan"] },
  progress: { label: "Progress note", sections: ["Interval history", "Findings", "Assessment", "Plan"] },
} as const;
export type TemplateKey = keyof typeof TEMPLATES;

export const noteSchema = z.object({
  sections: z.array(z.object({ title: z.string(), body: z.string() })).min(1),
  codes: z
    .array(z.object({ system: z.enum(["ICD-10", "CPT", "E/M"]), code: z.string(), description: z.string(), evidence: z.string() }))
    .default([]),
  patient_instructions: z.string().default(""),
  missing_information: z.array(z.string()).default([]),
});
export type GeneratedNote = z.infer<typeof noteSchema>;

// JSON schema handed to Gemini for structured output.
export const geminiResponseSchema = {
  type: "OBJECT",
  properties: {
    sections: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, body: { type: "STRING" } }, required: ["title", "body"] } },
    codes: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: { system: { type: "STRING", enum: ["ICD-10", "CPT", "E/M"] }, code: { type: "STRING" }, description: { type: "STRING" }, evidence: { type: "STRING" } },
        required: ["system", "code", "description", "evidence"],
      },
    },
    patient_instructions: { type: "STRING" },
    missing_information: { type: "ARRAY", items: { type: "STRING" } },
  },
  required: ["sections", "codes", "patient_instructions", "missing_information"],
};
