import "server-only";
import { geminiResponseSchema, noteSchema, TEMPLATES, type GeneratedNote, type TemplateKey } from "./schema";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type Part = { text: string } | { inline_data: { mime_type: string; data: string } };

function systemPrompt(template: TemplateKey, specialty: string | null, language: string) {
  const t = TEMPLATES[template];
  return [
    "You are a clinical documentation assistant. You draft notes for a clinician to review.",
    "Rules:",
    "- Use ONLY information stated in the encounter. Never invent findings, vitals, doses or history.",
    "- Never assume facts such as new versus established patient. If E/M level depends on a missing fact, state that in the evidence or omit the code.",
    "- If something a note normally contains is absent, leave it out and list it under missing_information.",
    `- Structure the note with exactly these sections, in order: ${t.sections.join(", ")}.`,
    specialty ? `- Specialty context: ${specialty}.` : "",
    "- Suggest ICD-10, CPT and E/M codes only when clearly supported. For each, quote the supporting evidence from the encounter. These are suggestions for a coder or clinician to verify.",
    `- Write patient_instructions in ${language}, plain language at roughly a fifth-grade reading level.`,
    "- Write the note itself in English.",
  ].filter(Boolean).join("\n");
}

export async function generateNote(opts: {
  template: TemplateKey;
  specialty: string | null;
  language: string;
  transcript?: string;
  audio?: { mime: string; base64: string };
}): Promise<GeneratedNote> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("The AI service is temporarily unavailable.");

  const parts: Part[] = [];
  if (opts.audio) parts.push({ inline_data: { mime_type: opts.audio.mime, data: opts.audio.base64 } });
  parts.push({ text: opts.transcript ? `Encounter transcript:\n\n${opts.transcript}` : "The audio above is the clinical encounter. Transcribe it internally and write the note." });

  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: systemPrompt(opts.template, opts.specialty, opts.language) }] },
    contents: [{ role: "user", parts }],
    generationConfig: { temperature: 0.2, responseMimeType: "application/json", responseSchema: geminiResponseSchema },
  });
  let res!: Response;
  for (let attempt = 0; attempt < 2; attempt++) {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: payload,
      signal: AbortSignal.timeout(50_000),
    });
    if (res.status !== 503) break; // retry once on temporary overload only; never on quota (429)
    await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
  }

  if (!res.ok) {
    // Log the status only; response bodies may echo user content.
    console.error("gemini error status", res.status);
    throw new Error(res.status === 429 ? "The AI service has reached its usage limit. Please try again later." : "The AI service could not process this request.");
  }
  const json = await res.json();
  const text: string | undefined = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("The AI service returned an empty response.");
  const parsed = noteSchema.safeParse(JSON.parse(text));
  if (!parsed.success) throw new Error("The AI response did not match the expected format.");
  return parsed.data;
}
