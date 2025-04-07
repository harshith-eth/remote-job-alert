import React, { useState } from 'react';
import { Loader2, Clipboard, Zap, Check, Terminal, Search, Link } from 'lucide-react';
import { scrapeWebpage } from './utils/firecrawl';
import { formatJobsWithAI, type JobPost } from './utils/jobFormatter';

function App() {
  const [links, setLinks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Validating links...', 'Scraping job details...', 'Extracting data...', 'Formatting alert...'];

  const extractJobDetails = (scrapedData: any): JobPost => {
    const extractedData = scrapedData.metadata?.extractedData || {};
    const markdown = scrapedData.markdown || '';
    
    // Try to extract salary from markdown if not in extractedData
    const salaryMatch = markdown.match(/\$[\d,]+(k|K)?(\s*-\s*\$[\d,]+(k|K)?)?/);
    const locationMatch = markdown.match(/remote|Remote|REMOTE|on-site|hybrid/i);
    
    return {
      title: extractedData.title || scrapedData.metadata?.title || 'Job Position',
      company: extractedData.company || scrapedData.metadata?.ogSiteName || 'Company',
      location: extractedData.location || (locationMatch ? locationMatch[0] : 'Remote'),
      description: extractedData.description || scrapedData.metadata?.description || 'No description available',
      applyUrl: scrapedData.metadata?.sourceURL || '',
      salary: extractedData.salary || (salaryMatch ? salaryMatch[0] : 'Competitive')
    };
  };

  const generateAlert = async () => {
    try {
      setIsLoading(true);
      setCurrentStep(0);
      
      // Split and validate links
      const jobUrls = links.split('\n').map(url => url.trim()).filter(url => url);
      if (jobUrls.length === 0) {
        throw new Error('Please enter at least one valid job URL');
      }

      setCurrentStep(1);
      // Scrape each job URL
      const jobDetails: JobPost[] = [];
      for (const url of jobUrls) {
        const scrapedData = await scrapeWebpage(url);
        const jobData = extractJobDetails(scrapedData);
        jobDetails.push(jobData);
      }

      setCurrentStep(2);
      // Format the jobs using Azure OpenAI
      const formattedAlert = await formatJobsWithAI(jobDetails);
      
      setCurrentStep(3);
      setAlertText(formattedAlert);
    } catch (error) {
      console.error('Error generating alert:', error);
      setAlertText(`Error: ${error instanceof Error ? error.message : 'Failed to generate alert'}`);
    } finally {
      setIsLoading(false);
      setCurrentStep(-1);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(alertText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStepIcon = (index: number) => {
    if (currentStep === index) {
      return <Loader2 className="animate-spin h-5 w-5" />;
    }
    switch (index) {
      case 0:
        return <Link className="h-5 w-5" />;
      case 1:
        return <Search className="h-5 w-5" />;
      case 2:
        return <Terminal className="h-5 w-5" />;
      case 3:
        return <Zap className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Remote Job Alert Generator</h1>
          <p className="text-gray-600">Paste job board links to generate clean, formatted alerts</p>
          <p className="text-sm text-gray-500 mt-2">Built by Harshith Vaddiparthy</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Job Board Links (one per line)
          </label>
          <textarea
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            disabled={isLoading}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="https://remoteok.com/jobs/123...&#13;&#10;https://weworkremotely.com/jobs/456...&#13;&#10;https://remotive.com/jobs/789..."
          />
          
          <button
            onClick={generateAlert}
            disabled={isLoading || !links.trim()}
            className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="-ml-1 mr-2 h-5 w-5" />
                Generate Alert
              </>
            )}
          </button>

          {isLoading && (
            <div className="mt-6 space-y-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-200 ${
                    currentStep === index
                      ? 'bg-blue-50 text-blue-700'
                      : currentStep > index
                      ? 'text-gray-400'
                      : 'text-gray-500'
                  }`}
                >
                  <div className="w-5">
                    {currentStep > index ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      getStepIcon(index)
                    )}
                  </div>
                  <span className="text-sm font-medium">{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {alertText && (
          <div className="bg-white rounded-lg shadow-md transform transition-all duration-300 ease-in-out">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-medium text-gray-900">Generated Alert</h2>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-md">
                {alertText}
              </pre>
              <button
                onClick={copyToClipboard}
                className="mt-4 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md font-medium flex items-center justify-center hover:bg-gray-200 transform transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="-ml-1 mr-2 h-5 w-5 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Clipboard className="-ml-1 mr-2 h-5 w-5" />
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      <footer className="text-center mt-8 text-sm text-gray-500">
        Powered by 🔥 Firecrawl
      </footer>
    </div>
  );
}

export default App;