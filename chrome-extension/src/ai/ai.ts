import { pipeline } from "@huggingface/transformers";

export async function generateResponse(prompt: string) {
  const generator = await pipeline("text2text-generation", "TheBloke/orca_mini_3B-GGML");
  let intructions = "You are an overseer that blocks websites that are distracting to people wanting to concentrate. Please deem below if the following reasoning is valid, so that you unblock the website for them to use. If it is a valid reason, output a one word response 'valid', otherwise output a one word response 'invalid': ";
  const result: any = await generator(intructions + prompt); // fix this bad style later
  return result[0].generated_text;
}