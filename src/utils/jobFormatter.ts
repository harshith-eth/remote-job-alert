interface JobPost {
  title: string;
  company: string;
  salary?: string;
  location: string;
  description: string;
  applyUrl: string;
}

async function formatJobsWithAI(jobs: JobPost[]): Promise<string> {
  const endpoint = import.meta.env.VITE_AZURE_ENDPOINT;
  const apiKey = import.meta.env.VITE_AZURE_API_KEY;

  const prompt = `Format these job posts into a clean, professional alert message. Each job should include an emoji for the role type:
  - 💻 for engineering/development roles
  - 🎨 for design roles
  - 📊 for data/analytics roles
  - 🤖 for AI/ML roles
  - 👥 for management roles
  - 🔧 for other technical roles

Jobs: ${JSON.stringify(jobs, null, 2)}

Format with:
- Clear section breaks between jobs
- Salary in a standardized format
- Location/remote status highlighted
- Brief, impactful description
- Clean markdown formatting
- No double asterisks for bold text, use clean markdown
- Use emojis sparingly and professionally`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are a professional job post formatter. Format content cleanly and professionally.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    const formattedText = data.choices[0].message.content;

    // Add signature
    return `${formattedText.trim()}

—
⚡ Powered by Firecrawl | 🛠️ Built by Harshith Vaddiparthy`;
  } catch (error) {
    console.error('Error formatting jobs with AI:', error);
    throw error;
  }
}

export { formatJobsWithAI, type JobPost }; 