import { GoogleGenAI } from "@google/genai";
import { getSystemInstruction } from "../constants";
import { IntakeData, Language } from "../types";

export const analyzeContract = async (
  intakeData: IntakeData,
  contractText: string,
  language: Language
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key not found. Please ensure process.env.API_KEY is set.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = getSystemInstruction(language);

  // Constructing the user prompt based on the intake data
  const prompt = `
  I have provided the answers to your pre-analysis questions below. Please proceed with the analysis.
  Output Language: ${language === 'pt' ? 'Portuguese (Brazil)' : 'English (US)'}.

  --- USER INTAKE ANSWERS ---
  1. Purpose: ${intakeData.purpose}
  2. Representing: ${intakeData.representation}
  3. Jurisdiction: ${intakeData.jurisdiction}
  4. Contract Type: ${intakeData.contractType}
  5. Stage: ${intakeData.stage}
  6. Counterparty: ${intakeData.counterparty}
  7. Risk/Priorities: ${intakeData.riskTolerance} - ${intakeData.priorities}
  8. Time/Economic: ${intakeData.timeHorizon}
  9. Background Check Requested: ${intakeData.dueDiligence ? "YES" : "NO"}
  10. Additional Info: ${intakeData.additionalInfo}

  --- CONTRACT TEXT ---
  ${contractText}
  `;

  try {
    // Using gemini-3-pro-preview for complex reasoning tasks (legal analysis)
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.1, // Low temperature for factual/analytical output
      },
    });

    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze the contract. Please try again.");
  }
};