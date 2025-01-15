import { pipeline } from "@huggingface/transformers";

export async function generateResponse(prompt: string) {
  try {
    // Initialize the pipeline with the model
    const generator = await pipeline("text2text-generation", "Xenova/LaMini-Flan-T5-783M");

    // Instructions text
    const instructions = `You are an overseer that blocks websites that are distracting to people wanting to concentrate. 
    Please deem below if the following reasoning is valid, so that you unblock the website for them to use. 
    If it is a valid reason, output a one word response 'valid', otherwise output a one word response 'invalid'. 
    Do not add a full stop, just the one word.`;

    // Generate the response by combining instructions with the prompt
    const result: any = await generator(instructions + '\nReasoning: ' + prompt);

    // Return the generated text
    return result[0].generated_text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}
