import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGardenAdvice = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Du bist der digitale Assistent von Thomas Rott, einem Premium-Dienstleister für Objektbetreuung in Oberbayern. Dein Tonfall ist höchst professionell, höflich, aber herzlich und lösungsorientiert (Du-Ansprache, aber respektvoll). Du verkaufst keine 'Hausmeisterdienste', sondern 'Sorgenfreiheit' und 'Werterhalt'. Antworte präzise auf Fragen zu Immobilienpflege, Winterdienst oder Instandhaltung. Dein Ziel: Den Nutzer davon zu überzeugen, dass hier Qualität vor Quantität geht und ein persönliches Gespräch der nächste logische Schritt ist.",
      }
    });

    return response.text || "Einen Moment bitte, ich verbinde meine Gedanken neu. Am besten klären wir das in einem kurzen Telefonat.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ich bin kurz in einem Funkloch. Bitte versuchen Sie es gleich noch einmal.";
  }
};