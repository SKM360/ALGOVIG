
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzeComplexity(code: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the time and space complexity of the following code snippet. Provide a structured explanation and identify the complexity class (e.g., O(n), O(log n)).\n\nCode:\n${code}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            timeComplexity: { type: Type.STRING },
            spaceComplexity: { type: Type.STRING },
            explanation: { type: Type.STRING },
            bestCase: { type: Type.STRING },
            worstCase: { type: Type.STRING }
          },
          required: ["timeComplexity", "spaceComplexity", "explanation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Complexity analysis failed:", error);
    throw error;
  }
}

export async function explainAlgorithmLogic(algoName: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the fundamental logic of ${algoName} algorithm in simple, educational terms. Highlight why it's used and a real-world example.`,
    });
    return response.text;
  } catch (error) {
    console.error("Logic explanation failed:", error);
    return "Could not fetch explanation at this time.";
  }
}
