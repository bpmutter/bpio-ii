# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```
This command runs type checking, builds the site, generates search index with Pagefind, and copies the search files to public directory.

**Preview production build:**
```bash
npm run preview
```

**Code quality:**
```bash
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run format:check  # Check formatting without changing files
```

**Type checking:**
```bash
astro check
```

## Architecture Overview

This is a personal blog/website built with **Astro**, using the AstroPaper theme as a foundation. The site is statically generated with server-side rendering capabilities.

### Key Technologies
- **Astro**: Static site generator with island architecture
- **TailwindCSS**: Utility-first CSS framework (v4)
- **TypeScript**: Type-safe JavaScript
- **Pagefind**: Static search functionality
- **Remark plugins**: Markdown processing (TOC, collapsible sections)

### Content Management
- **Blog posts** stored in `src/data/blog/` as Markdown files
- **Content collections** defined in `src/content.config.ts` with strict schema validation
- **Frontmatter schema** includes: title, description, tags, pubDatetime, featured flag, draft status
- **Image handling** via Astro's optimized image component with responsive images enabled

### Site Structure
- **`src/config.ts`**: Site-wide configuration (title, author, URLs, post limits)
- **`src/constants.ts`**: Static content like social links and core competencies
- **`src/layouts/`**: Page templates (Layout.astro for base HTML, PostDetails.astro for blog posts)
- **`src/components/`**: Reusable UI components (Header, Footer, Card, etc.)
- **`src/pages/`**: Route definitions including dynamic blog post routes
- **`src/utils/`**: Helper functions for post sorting, filtering, and OG image generation

### Blog Features
- **Dynamic OG images** generated via Satori
- **RSS feed** auto-generated
- **Search functionality** via Pagefind (built into production build)
- **Tag-based organization** with dedicated tag pages
- **Featured posts** system
- **Edit post links** that redirect to GitHub for contributions

### Build Process
The build process includes:
1. Type checking with `astro check`
2. Static site generation with `astro build`
3. Search index generation with `pagefind --site dist`
4. Search files copied to `public/pagefind/`

### Migration Notes
- **`src/migration/`** contains utilities for content migration (excluded from TypeScript compilation)
- **Contentful exports** stored in `contentful-out/` directory

## Blog Writing Style Guidelines

When assisting with blog content creation, follow Ben's established writing style and approach:

### Voice and Tone
- **Conversational yet technical**: Uses accessible language while diving deep into complex technical topics
- **First-person narrative**: Heavy use of "I" statements and personal experiences/observations
- **Informal but authoritative**: Confident in expertise while maintaining approachable tone
- **Self-deprecating humor**: Occasional jokes about being a "sick flex" or admitting knowledge gaps

### Content Approach
- **AI/ML focus**: Specializes in generative AI, LLMs, chatbots, RAG systems, and technical education
- **Practical over theoretical**: Emphasizes actionable insights and real-world applications
- **Experience-driven**: Uses personal work experiences (MongoDB, documentation, development) as examples
- **Future-oriented**: Discusses emerging trends and makes thoughtful predictions

### Structure Patterns
- **Long-form content**: Substantial posts with detailed exploration of topics
- **Clear section headers**: Well-organized with descriptive H2/H3 headings
- **Bullet points and lists**: Frequent use for clarity and scannability
- **Code examples**: Includes practical code snippets when relevant
- **External links**: References to relevant resources, papers, and tools

### Technical Writing Style
- **Define acronyms**: Always explains technical terms (e.g., "RAG (Retrieval-Augmented Generation)")
- **Contextual examples**: Uses concrete scenarios to illustrate abstract concepts
- **Architecture diagrams**: References visual aids when explaining system designs
- **Balanced coverage**: Discusses both benefits and limitations of technologies

### Content Themes
- **Generative AI applications**: Focus on practical AI implementations in real products
- **Technical education**: How to improve documentation, learning experiences, and knowledge sharing
- **Developer productivity**: Tools and techniques that enhance software development
- **Technology adoption**: Analysis of emerging tech trends and their implications

### Personal Topics
- **Product development**: Experiences building chatbots, frameworks, and developer tools
- **Conference presentations**: Sharing insights from talks and industry events
- **Reading habits**: Academic papers, technical books, and industry analysis
- **Technology opinions**: Thoughtful takes on iPad productivity, development environments, etc.

### Writing Mechanics
- **Parenthetical asides**: Frequent use of parentheses for additional context or humor
- **Italicized emphasis**: Uses italics for emphasis rather than bold
- **Question-driven sections**: Often poses questions to guide reader thinking
- **Conversational transitions**: Natural flow between topics with bridging phrases