import { GoogleGenAI } from "@google/genai";
import type { FunctionalAbilitiesFormData } from '../types';
import { FUNCTIONAL_ABILITIES_FORM_SCHEMA } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not found. Please set it.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const extractFunctionalAbilitiesData = async (
    transcript: string
): Promise<FunctionalAbilitiesFormData> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert medical document processor. Your task is to extract information from the provided transcript and generate a JSON object that strictly adheres to the provided schema. Respond with ONLY the JSON object. Do not include any explanations, markdown formatting, or other text. Here is the transcript:\n\n${transcript}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: FUNCTIONAL_ABILITIES_FORM_SCHEMA,
            },
        });

        const jsonText = response.text;
        if (!jsonText) {
            throw new Error("The AI model returned an empty response. Please check the transcript and try again.");
        }
        
        const data = JSON.parse(jsonText);
        return data as FunctionalAbilitiesFormData;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            // Provide a more user-friendly message for common API errors
            if (error.message.includes('API key not valid')) {
                 throw new Error("The provided API key is not valid. Please check your environment variables.");
            }
            throw new Error(`Failed to extract form data from AI: ${error.message}`);
        }
        throw new Error("An unknown error occurred while processing the transcript with the AI.");
    }
};
