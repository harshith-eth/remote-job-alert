import FirecrawlApp, { ScrapeResponse, CrawlResponse } from '@mendable/firecrawl-js';

const firecrawlClient = new FirecrawlApp({
  apiKey: import.meta.env.VITE_FIRECRAWL_API_KEY
});

export interface WebsiteContent {
  markdown: string;
  metadata: {
    title?: string;
    description?: string;
    language?: string;
    sourceURL?: string;
    [key: string]: any;
  };
}

export async function scrapeWebpage(url: string): Promise<WebsiteContent> {
  try {
    // Basic scrape with markdown format
    const scrapeResult = await firecrawlClient.scrapeUrl(url, {
      formats: ['markdown']
    });

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }

    // Parse the markdown content to extract job details
    const markdown = scrapeResult.markdown || '';
    const metadata = scrapeResult.metadata || {};

    // Try to extract job-specific information from the markdown content
    const titleMatch = markdown.match(/# ([^\n]+)/);
    const companyMatch = markdown.match(/Company: ([^\n]+)/i);
    const salaryMatch = markdown.match(/\$[\d,]+(k|K)?(\s*-\s*\$[\d,]+(k|K)?)?/);
    const locationMatch = markdown.match(/Location: ([^\n]+)/i) || markdown.match(/remote|Remote|REMOTE|on-site|hybrid/i);

    return {
      markdown,
      metadata: {
        ...metadata,
        title: titleMatch?.[1] || metadata.title,
        company: companyMatch?.[1] || metadata.ogSiteName,
        salary: salaryMatch?.[0],
        location: locationMatch?.[1] || locationMatch?.[0] || 'Remote',
      }
    };
  } catch (error) {
    console.error('Error scraping webpage:', error);
    throw error;
  }
}

export async function crawlWebsite(url: string, limit: number = 100): Promise<WebsiteContent[]> {
  try {
    const crawlResponse = await firecrawlClient.crawlUrl(url, {
      limit
    });

    if (!crawlResponse.success) {
      throw new Error(`Failed to crawl: ${crawlResponse.error}`);
    }

    // Extract job ID from the response URL
    const jobId = (crawlResponse as any).id || '';
    const statusResponse = await firecrawlClient.checkCrawlStatus(jobId);
    
    if (!statusResponse.success) {
      throw new Error(`Failed to check crawl status: ${statusResponse.error}`);
    }

    return statusResponse.data.map(item => ({
      markdown: item.markdown || '',
      metadata: item.metadata || {}
    }));
  } catch (error) {
    console.error('Error crawling website:', error);
    throw error;
  }
}

export default {
  crawlWebsite,
  scrapeWebpage
}; 