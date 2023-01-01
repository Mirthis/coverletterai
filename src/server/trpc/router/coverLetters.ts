import type { GenereLatterInputs } from "../../../hooks/forms/useGenerateLetterForm";
import { generateLetterSchema } from "../../../hooks/forms/useGenerateLetterForm";

import { router, publicProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env/server.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generatePrompt = ({
  jobDescription,
  companyName,
  fullName,
}: GenereLatterInputs) => {
  return `Generate a cover letter based on the following data:
  Job description: ${jobDescription}
  ${companyName ? `Employer: ${companyName}` : ""}
  ${fullName ? `Applicant Name: ${fullName}` : ""}
  `;
};

export const coverLettersRouter = router({
  generate: publicProcedure
    .input(generateLetterSchema)
    .mutation(async ({ input }) => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(input),
        temperature: 0, // Higher values means the model will take more risks.
        max_tokens: 400, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
      });
      return response.data.choices[0]?.text;
      // const response = "Dummy response";
      // return response;
    }),
});
