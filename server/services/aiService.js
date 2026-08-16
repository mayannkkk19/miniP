const { GoogleGenAI, Type } = require ("@google/genai");
const dotenv = require('dotenv');  

dotenv.config();

// Gemini Output Schema Definition (OpenAPI standard format)
function getAnalysisSchema() {
  return {
    type: Type.OBJECT,
    properties: {
      problemType: { 
        type: Type.STRING,
        description: "Primary algorithmic or data-structure category (e.g., Array, Graph, DP, Bit Manipulation, String, Math, Geometry, Heap, Trie, etc.)"
      },
      coreConcept: { 
        type: Type.STRING,
        description: "One line direct summary of the objective. Be mathematically precise (e.g. distinguish between elements vs indices)."
      },
      interpretedConstraints: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            variable: { type: Type.STRING },
            description: { type: Type.STRING },
            min: { type: Type.STRING, description: "Lower bound as written or inferred string" },
            max: { type: Type.STRING, description: "Upper bound as written or inferred string" }
          },
          required: ["variable", "description"]
        }
      },
      expectedComplexity: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.STRING },
          space: { type: Type.STRING }
        },
        required: ["time", "space"]
      },
      importantEdgeCases: {
        type: Type.ARRAY,
        description: "What structural boundary states matter (e.g., N=2, all negative values)",
        items: { type: Type.STRING }
      },
      inputCharacteristics: {
        type: Type.ARRAY,
        description: "General properties of inputs (e.g., allow negative integers, duplicate values allowed)",
        items: { type: Type.STRING }
      },
      testGenerationStrategy: {
        type: Type.ARRAY,
        description: "Actionable execution steps for downstream test case generator",
        items: { type: Type.STRING }
      },
      guarantees: {
        type: Type.ARRAY,
        description: "CRITICAL: ONLY explicitly stated promises from the problem text. If not verbatim in text, LEAVE EMPTY []. NEVER infer.",
        items: { type: Type.STRING }
      },
      solutionAssumptions: {
        type: Type.ARRAY,
        description: "Inferences or semantic assumptions made by the AI model that were NOT explicitly promised in text",
        items: { type: Type.STRING }
      },
      ambiguities: {
        type: Type.ARRAY,
        description: "Gaps, missing specs, or underspecified rules in the original text",
        items: { type: Type.STRING }
      }
    },
    required: [
      "problemType",
      "coreConcept",
      "interpretedConstraints",
      "expectedComplexity",
      "importantEdgeCases",
      "inputCharacteristics",
      "testGenerationStrategy",
      "guarantees",
      "solutionAssumptions",
      "ambiguities"
    ]
  };
}

class AiService {

  //function built using ai
  async analyzeProblem(problemObject) {

    const ai = new GoogleGenAI({}); 

    // Extract raw string context—never pass raw Mongoose/Express objects to Gemini
      const problemContext = `
      Title: ${problemObject.title}
      Statement: ${problemObject.description || problemObject.statement}
      Input Format: ${problemObject.inputFormat}
      Output Format: ${problemObject.outputFormat}
      Constraints: ${problemObject.constraints}
      Samples: ${JSON.stringify(problemObject.samples || [])}
          `.trim();

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        config: {
          systemInstruction: "You are a strict data extraction assistant, double check every response. Only respond in json. Do not include introductory text.",
          responseMimeType: "application/json",
          responseSchema: getAnalysisSchema()
        },
        contents: problemContext
      });

      console.log("Gemini Response:", response.text);
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      throw error;
    }
  }
};

module.exports = AiService;
