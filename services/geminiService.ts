
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a creative greeting for the given name using the Gemini API.
 * @param name The name of the person to greet.
 * @returns A promise that resolves to the generated greeting string.
 */
export const generateGreeting = async (name: string): Promise<string> => {
  const model = 'gemini-2.5-flash';
  
  try {
    const prompt = `Generate a short, creative, and friendly greeting for a person named "${name}". Make it sound welcoming and slightly whimsical. Do not use markdown or special formatting. Just a single sentence.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
        throw new Error("The API returned an empty response.");
    }
    
    return text.trim();

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while calling the Gemini API.");
  }
};
