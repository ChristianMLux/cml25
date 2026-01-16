import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import OpenAI from 'openai';
import { z } from 'zod';

// Initialize Clients
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Zod Schema for AI Output (structured output)
const PortfolioEntrySchema = z.object({
  title: z.string().describe('Catchy marketing title for the project'),
  description: z
    .string()
    .describe('SEO optimized short description (max 160 chars)'),
  fullDescription: z
    .string()
    .describe('Markdown formatted detailed case study'),
  technologies: z.array(z.string()).describe('List of technologies used'),
  tags: z
    .array(z.string())
    .describe("Relevant tags (e.g. 'Web', 'Mobile', 'Design')"),
});

export async function POST() {
  try {
    if (!process.env.GITHUB_TOKEN || !process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'Missing API Keys in environment' },
        { status: 500 },
      );
    }

    // 1. Fetch Repos from GitHub
    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      direction: 'desc',
      per_page: 10, // Limit increased to 10 as requested
      type: 'owner',
    });

    // 2. Process with AI
    const processedProjects = await Promise.all(
      repos.map(async (repo) => {
        const isPrivate = repo.private;
        const repoUrl = isPrivate ? null : repo.html_url;

        try {
          // Construct Prompt
          const prompt = `
            Analyze this GitHub Repository and create a Portfolio Entry.
            Name: ${repo.name}
            Description: ${repo.description || 'No description provided.'}
            Language: ${repo.language || 'Unknown'}
            Topics: ${repo.topics?.join(', ') || 'None'}
            Readme Snippet: (Simulated for efficiency - normally we fetch this)
          `;

          const completion = await openai.chat.completions.create({
            model: 'google/gemini-3-flash-preview', // Or user preferred model
            messages: [
              {
                role: 'system',
                content:
                  'You are a Tech Writer. Output ONLY valid JSON matching the schema: { title, description, fullDescription, technologies: [], tags: [] }.',
              },
              { role: 'user', content: prompt },
            ],
            // Note: OpenRouter doesn't always support 'response_format: { type: "json_object" }' for all models
            // We'll trust the model or add JSON instruction strongly.
            response_format: { type: 'json_object' },
          });

          const content = completion.choices[0]?.message?.content;
          let aiData = {
            title: repo.name,
            description: repo.description || '',
            fullDescription: '',
            technologies: [repo.language || 'Unknown'],
            tags: [],
          };

          if (content) {
            try {
              const parsed = JSON.parse(content);
              // Validate loosely or strict
              aiData = { ...aiData, ...parsed };
            } catch (jsonErr) {
              console.error('JSON Parse Error for ' + repo.name, jsonErr);
            }
          }

          return {
            id: repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: repo.name,
            githubId: repo.id,
            ...aiData,
            isPrivate,
            githubUrl: repoUrl,
            status: 'new', // Frontend status
          };
        } catch (aiError) {
          console.error(`AI Failure for ${repo.name}`, aiError);
          // Fallback
          return {
            id: repo.name.toLowerCase(),
            name: repo.name,
            title: repo.name,
            description: repo.description || 'Auto-imported',
            technologies: [repo.language || 'Unknown'],
            isPrivate,
            githubUrl: repoUrl,
            status: 'error',
          };
        }
      }),
    );

    return NextResponse.json({ projects: processedProjects });
  } catch (error) {
    console.error('Sync Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error during Sync' },
      { status: 500 },
    );
  }
}
