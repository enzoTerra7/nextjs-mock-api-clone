import { IBuilderService } from "../builder.service.definition";
import {
  createGoogleGenerativeAI,
  GoogleGenerativeAIProvider,
} from "@ai-sdk/google";
import { CoreMessage, generateText, Message } from "ai";

export class AIBuilderService implements IBuilderService {
  private readonly ai: GoogleGenerativeAIProvider;

  constructor() {
    this.ai = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async construct(stringifiedData: string): Promise<unknown> {
    const parsedConstructorType = stringifiedData;

    const result = await this.generateMockData(parsedConstructorType);

    return result;
  }

  private async generateMockData(codeSnippet: string): Promise<Record<string, string>> {
    const messages: CoreMessage[] | Omit<Message, "id">[][] = [
      {
        role: "user",
        content: `You are an AI that generates mock data. I will provide a TypeScript code snippet that contains a type named 'Response'.
    
    Your task is to return a single TypeScript object that matches the 'Response' type.
    
    Return only the object. Do not add any explanation, formatting, or comments.
    
    Here is the code snippet:
    \`\`\`ts
    ${codeSnippet}
    \`\`\`
    `,
      },
    ];

    const data = await generateText({
      model: this.ai("gemini-1.5-flash"),
      messages,
    });

    const cleanedResult = data.text.replace(/'\s*\+\s*'/g, '')
      .replace(/^'+|'+$/g, '');

    const result = eval(`(${cleanedResult})`) as Record<string, string>;

    return result;
  }
}
