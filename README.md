# 💼 Remote Job Alert Generator

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Author](https://img.shields.io/badge/Author-Harshith%20Vaddiparthy-orange.svg)](https://github.com/harshith-eth)

> Transform job listings into beautifully formatted remote job alerts using AI-powered content generation.

🔗 **[Live Demo](https://remote-job-alert-generator.vercel.app)** | [GitHub Repository](https://github.com/harshith-eth/remote-job-alert-generator)

![Project Demo](https://source.unsplash.com/random/1200x630/?remote,work)

## 🎯 About

The Remote Job Alert Generator is an open-source web application that transforms job listings into professionally formatted job alerts using AI. Built with modern web technologies and designed with user experience in mind, this tool helps job boards, recruiters, and hiring managers create engaging job alerts in seconds.

## 🌟 Features

- 🔍 Instant job listing scraping from any URL
- 🤖 AI-powered alert generation using Azure OpenAI
- 📝 Professional formatting with sections:
  - Job title and company
  - Salary information
  - Location and remote status
  - Key responsibilities
  - Required skills
  - Company overview
- 📋 One-click copy to clipboard
- 🎨 Beautiful, responsive UI with modern design
- 🔒 Secure API key management
- 🌐 Deployed and hosted on Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API keys for:
  - Firecrawl (Get it from [Firecrawl](https://firecrawl.co))
  - Azure OpenAI (Get it from [Azure Portal](https://portal.azure.com))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harshith-eth/remote-job-alert-generator.git
   cd remote-job-alert-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   ```env
   VITE_FIRECRAWL_API_KEY=your_firecrawl_api_key_here
   VITE_AZURE_API_KEY=your_azure_api_key_here
   VITE_AZURE_ENDPOINT=your_azure_endpoint_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📖 How to Use

1. Visit the [live demo](https://remote-job-alert-generator.vercel.app)
2. Paste job listing URLs (one per line) into the input field
3. Click "Generate Alert" and wait for the magic to happen
4. Copy the generated alert with one click
5. Use the alert in your job boards, social media, or email campaigns

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **API Integration**:
  - Firecrawl for job listing scraping
  - Azure OpenAI for content generation
- **Development Tools**:
  - ESLint for code linting
  - PostCSS for CSS processing
  - TypeScript for type safety
- **Deployment**: Vercel

## 📁 Project Structure

```
├── src/
│   ├── App.tsx                # Main application component
│   ├── utils/
│   │   ├── firecrawl.ts      # Firecrawl API integration
│   │   └── jobFormatter.ts    # Job formatting with Azure OpenAI
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles and Tailwind imports
│   └── vite-env.d.ts         # TypeScript declarations
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # Project documentation
```

## 🔒 Security

- API keys are stored in environment variables
- `.env` file is excluded from git repository
- Input validation for job listing URLs
- Error handling for API failures
- Secure deployment on Vercel

## 🚀 Deployment

The project is deployed on Vercel. To deploy your own instance:

1. Fork this repository
2. Create a new project on [Vercel](https://vercel.com)
3. Connect your forked repository
4. Add your environment variables in Vercel's project settings
5. Deploy!

For local deployment:
```bash
npm run build
npm run preview
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

### Code Style

The project uses ESLint with TypeScript support. Configuration can be found in `eslint.config.js`.

## 📝 License

This project is open source and available under the [MIT License](LICENSE). You are free to:

- ✅ Use the code commercially
- ✅ Modify the code
- ✅ Distribute the code
- ✅ Use the code privately
- ✅ Sublicense the code

The only requirement is that you include the original copyright and license notice in any copy of the code/project.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Firecrawl](https://firecrawl.co) for their amazing web scraping API
- [Azure OpenAI](https://azure.microsoft.com/services/openai) for AI capabilities
- [Vercel](https://vercel.com) for hosting
- All the amazing open-source libraries used in this project

## 👨‍💻 Author

**Harshith Vaddiparthy**
- GitHub: [@harshith-eth](https://github.com/harshith-eth)
- Twitter: [@harshithio](https://x.com/harshithio)
- LinkedIn: [Harshith Vaddiparthy](https://www.linkedin.com/in/harshith-vaddiparthy/)

## 📧 Contact

For any questions or feedback, feel free to reach out:

- Email: harshithvaddiparthy@gmail.com
- Twitter: [@harshithio](https://x.com/harshithio)

Project Link: [https://github.com/harshith-eth/remote-job-alert-generator](https://github.com/harshith-eth/remote-job-alert-generator)

---

<p align="center">
  Made with ❤️ by Harshith Vaddiparthy<br>
  <small>© 2024 Harshith Vaddiparthy. All rights reserved.</small>
</p> 